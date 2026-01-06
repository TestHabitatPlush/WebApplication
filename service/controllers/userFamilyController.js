const { User, Role, Address,UserUnit,Unit } = require("../models");
const addressService = require("../services/addressService");


const createMemberBySocietyId = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const { address, salutation, firstName, lastName, email, mobileNumber, alternateNumber, roleCategory } = req.body;

    const ownerUser = await User.findOne({ where: { userId: loggedInUserId } });
    if (!ownerUser) {
      return res.status(403).json({ message: "Only society owner can add members" });
    }

    const parentRole = await Role.findByPk(ownerUser.roleId);
    if (parentRole.roleCategory !== "society_owner") {
      return res.status(403).json({ message: "Only society owner can add members" });
    }

    
    const allowedCategories = ["society_owner_family", "society_tenant", "society_tenant_family"];
    if (!allowedCategories.includes(roleCategory)) {
      return res.status(400).json({ message: "Invalid role category for creation" });
    }

    const role = await Role.findOne({ where: { roleCategory } });
    if (!role) {
      return res.status(500).json({ message: "Role not configured" });
    }

    const addressData = await addressService.createAddress(address);

    const newUser = await User.create({
      salutation,
      firstName,
      lastName,
      email,
      password: "Himansu@123", 
      countryCode: address.countryCode || 91,
      mobileNumber,
      alternateNumber,
      roleId: role.roleId,
      unitId: ownerUser.unitId,
      societyId: ownerUser.societyId,
      addressId: addressData.addressId,
      livesHere: true,
      primaryContact: false, 
      isManagementCommittee: false,
      managementDesignation: role.roleName,
      status: "active"
    });

    res.status(201).json({ message: "Member created successfully", result: newUser });

  } catch (error) {
    console.error("Create member error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getMembersByOwner = async (req, res) => {
  try {
    const userId = req.user.userId;
    const ownerUser = await User.findByPk(userId);
    const ownerRole = await Role.findByPk(ownerUser.roleId);

    if (ownerRole.roleCategory !== "society_owner") {
      return res.status(403).json({ message: "Only society owner can view members" });
    }

    const allowedCategories = ["society_owner_family", "society_tenant", "society_tenant_family"];
    const roles = await Role.findAll({ where: { roleCategory: allowedCategories } });
    const roleIds = roles.map(r => r.roleId);

    const members = await User.findAll({
      where: {
        societyId: ownerUser.societyId,
        unitId: ownerUser.unitId,
        roleId: roleIds
      },
      include: [
        { model: Role, as: "role" },
        { model: Address }
      ]
    });

    res.status(200).json({ members });

  } catch (error) {
    console.error("Get members error:", error);
    res.status(500).json({ error: error.message });
  }
};


const updateMember = async (req, res) => {
  try {
    const userId = req.user.userId;
    const memberId = req.params.memberId;
    const updateData = req.body;

    const ownerUser = await User.findByPk(userId);
    const member = await User.findByPk(memberId);
    const ownerRole = await Role.findByPk(ownerUser.roleId);

    if (
      ownerRole.roleCategory !== "society_owner" ||
      !member ||
      member.unitId !== ownerUser.unitId ||
      member.societyId !== ownerUser.societyId
    ) {
      return res.status(403).json({ message: "Unauthorized or invalid member" });
    }

    if (updateData.address) {
      await addressService.updateAddress(member.addressId, updateData.address);
    }

    await member.update({ ...updateData, addressId: member.addressId });

    res.status(200).json({ message: "Member updated", result: member });

  } catch (error) {
    console.error("Update member error:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const userId = req.user.userId;
    const memberId = req.params.memberId;

    const ownerUser = await User.findByPk(userId);
    const ownerRole = await Role.findByPk(ownerUser.roleId);
    const member = await User.findByPk(memberId);

    if (
      ownerRole.roleCategory !== "society_owner" ||
      !member ||
      member.unitId !== ownerUser.unitId ||
      member.societyId !== ownerUser.societyId
    ) {
      return res.status(403).json({ message: "Unauthorized or invalid member" });
    }

    await member.destroy();
    res.status(200).json({ message: "Member deleted successfully" });

  } catch (error) {
    console.error("Delete member error:", error);
    res.status(500).json({ error: error.message });
  }
};
const getMyUnitMembers = async (req, res) => {
  try {
    //  Owner check
    const owner = await User.findByPk(req.user.userId, {
      include: [{ model: Role, as: "userRole" }],
    });

    if (!owner || owner.userRole.roleCategory !== "society_owner") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Owner → Units (SOURCE: user_unit)
    const ownerUnits = await UserUnit.findAll({
      where: { userId: owner.userId },
      attributes: ["unitId"],
    });

    if (!ownerUnits.length) {
      return res.json({ success: true, data: [] });
    }

    const unitIds = ownerUnits.map(u => u.unitId);

    //  Users → unit → unitOwner
    const members = await User.findAll({
      where: {
        unitId: unitIds,
        isDeleted: 0,
      },
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "email",
        "mobileNumber",
        "unitId",
      ],
      include: [
        {
          model: Role,
          as: "userRole",
          attributes: ["roleName", "roleCategory"],
        },
        {
          model: Unit,
          attributes: ["unitId", "unitName", "unitNumber"],
        },
        {
          model: UserUnit,
          include: [
            {
              model: User,
              as: "unitOwner", //  MUST MATCH ASSOCIATION
              attributes: ["userId", "firstName", "lastName"],
              include: [
                {
                  model: Role,
                  as: "userRole",
                  attributes: ["roleName"],
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error("Get unit members error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// const getMyUnitMembersGrouped = async (req, res) => {
//   try {
//     //  Role guard
//     if (req.user.role !== "society_owner") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     //  Get unitIds of logged-in owner (SOURCE: user_units)
//     const ownerUserUnits = await UserUnit.findAll({
//       where: { userId: req.user.userId },
//       attributes: ["unitId"],
//     });

//     if (!ownerUserUnits.length) {
//       return res.json({
//         success: true,
//         data: [],
//       });
//     }

//     const unitIds = ownerUserUnits.map(u => u.unitId);

//     //  Fetch ALL users mapped to those unitIds
//     const rows = await UserUnit.findAll({
//       where: { unitId: unitIds },
//       include: [
//         {
//           model: Unit,
//           as: "unit",                // FIXED ALIAS
//           required: true,
//           attributes: ["unitId", "unitName", "unitNumber"],
//         },
//         {
//           model: User,
//           required: true,
//           attributes: [
//             "userId",
//             "firstName",
//             "lastName",
//             "mobileNumber",
//             "email",
//           ],
//           include: [
//             {
//               model: Role,
//               as: "role",
//               attributes: ["roleName"],
//             },
//           ],
//         },
//       ],
//     });

//     //  Group by unit & split by role
//     const grouped = {};

//     rows.forEach(row => {
//       const unit = row.unit;   //  SAFE ACCESS
//       const user = row.User;

//       if (!unit || !user) return;

//       const role = user.role?.roleName;

//       if (!grouped[unit.unitId]) {
//         grouped[unit.unitId] = {
//           unitId: unit.unitId,
//           unitName: unit.unitName,
//           unitNumber: unit.unitNumber,
//           owners: [],
//           tenants: [],
//           others: [],
//         };
//       }

//       if (["society_owner", "society_owner_family"].includes(role)) {
//         grouped[unit.unitId].owners.push(user);
//       } else if (
//         ["society_tenant", "society_tenant_family"].includes(role)
//       ) {
//         grouped[unit.unitId].tenants.push(user);
//       } else {
//         grouped[unit.unitId].others.push(user);
//       }
//     });

//     return res.json({
//       success: true,
//       data: Object.values(grouped),
//     });
//   } catch (error) {
//     console.error("Grouped unit members error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



module.exports = {
  createMemberBySocietyId,
  getMembersByOwner, // for Same Unit Member
  updateMember,
  deleteMember,
  getMyUnitMembers, // single unit memmber
  //  getMyUnitMembersGrouped,
};
