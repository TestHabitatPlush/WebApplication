const { User, Role, Address } = require("../models");
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

module.exports = {
  createMemberBySocietyId,
  getMembersByOwner,
  updateMember,
  deleteMember
};
