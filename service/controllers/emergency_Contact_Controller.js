

const { Emergency_Contact, User, Role } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { Op } = require("sequelize");
const createEmergencyContactByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name,
      econtactNo1,
      econtactNo2,
      emergencyContactType,
      address,
      state,
      city,
      pin,
      societyId: inputSocietyId,
      viewStatus 
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    let societyIdToUse = null;

    if (["super_admin", "super_admin_it"].includes(role.roleCategory)) {
      
      societyIdToUse = inputSocietyId || null;
    } else if (["society_moderator", "management_committee"].includes(role.roleCategory)) {
      if (inputSocietyId && inputSocietyId.toString() !== user.societyId?.toString()) {
        return sendErrorResponse(res, "You can only add contacts to your own society", 403);
      }
      societyIdToUse = user.societyId;
    } else {
      return sendErrorResponse(res, "Permission denied", 403);
    }

    const contact = await Emergency_Contact.create({
      societyId: societyIdToUse,
      userId: user.userId,
      name,
      econtactNo1,
      econtactNo2,
      emergencyContactType,
      address,
      state,
      city,
      pin,
      viewStatus,
    });

    return sendSuccessResponse(res, "Emergency Contact created successfully", contact, 201);
  } catch (error) {
    console.error("Error creating emergency contact:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

const createEmergencyContactBySocietyId = async (req, res) => {
  try {
    const { userId,societyId } = req.params;
    const {
      name,
      econtactNo1,
      econtactNo2,
      emergencyContactType,
      address,
      state,
      city,
      pin
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const allowedRoles = ["society_moderator", "management_committee"];
    if (!allowedRoles.includes(role.roleCategory)) {
      return sendErrorResponse(res, "Only Admin can add emergency contacts", 403);
    }

    if (user.societyId?.toString() !== societyId?.toString()) {
      return sendErrorResponse(res, "Unauthorized society access", 403);
    }

    const contact = await Emergency_Contact.create({
      userId, 
      societyId,
      name,
      econtactNo1,
      econtactNo2,
      emergencyContactType,
      address,
      state,
      city,
      pin,
    });

    return sendSuccessResponse(res, "Emergency Contact created", contact, 201);
  } catch (error) {
    console.error("Create contact (admin) error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};


const updateEmergencyContact = async (req, res) => {
  try {
    const { userId, contactId } = req.params;
    const updateData = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const contact = await Emergency_Contact.findByPk(contactId);
    if (!contact) return sendErrorResponse(res, "Contact not found", 404);

    const isSuperAdmin = role.roleCategory === "super_admin";
    const isSameSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      contact.societyId == user.societyId;

    if (isSuperAdmin || isSameSocietyAdmin) {
      await contact.update(updateData);
      return sendSuccessResponse(res, "Emergency Contact updated", contact);
    }

    return sendErrorResponse(res, "Permission denied", 403);
  } catch (error) {
    console.error("Update contact error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

// const getEmergencyContactsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     let contacts;

//     if (["super_admin", "super_admin_it"].includes(role.roleCategory)) {
//       // Super Admins can see all active contacts
//       contacts = await Emergency_Contact.findAll();
    
//     } else {
//       return sendErrorResponse(res, "Unauthorized to view contacts", 403);
//     }

//     return sendSuccessResponse(res, "Emergency contacts retrieved", contacts);
//   } catch (error) {
//     console.error("Get contacts error:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

const getEmergencyContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role || !["super_admin", "super_admin_it"].includes(role.roleCategory)) {
      return sendErrorResponse(res, "Access denied: Not a super admin", 403);
    }

    const superAdminRoles = await Role.findAll({
      where: { roleCategory: ["super_admin", "super_admin_it"] },
      attributes: ["roleId"]
    });

    const roleIds = superAdminRoles.map(r => r.roleId);

    const superAdminUsers = await User.findAll({
      where: { roleId: { [Op.in]: roleIds } },
      attributes: ["userId"]
    });

    const userIds = superAdminUsers.map(u => u.userId);

    const contacts = await Emergency_Contact.findAll({
      where: { userId: { [Op.in]: userIds } }
    });

    return sendSuccessResponse(res, "Super Admin emergency contacts retrieved", contacts);
  } catch (error) {
    console.error("Error fetching super admin contacts:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};


const getEmergencyContactsBySocietyId = async (req, res) => {
  try {
    const { userId, societyId } = req.params;

    const user = await User.findByPk(userId);
    if (!user || !user.societyId) {
      return sendErrorResponse(res, "User not found or not linked to a society", 404);
    }

    const role = await Role.findByPk(user.roleId);
    if (!role || !["society_moderator", "management_committee"].includes(role.roleCategory)) {
      return sendErrorResponse(res, "Access denied: Not an Admin", 403);
    }

    if (user.societyId.toString() !== societyId.toString()) {
      return sendErrorResponse(res, "Unauthorized access to this society's data", 403);
    }

    const adminRoles = await Role.findAll({
      where: {
        roleCategory: {
          [Op.in]: ["society_moderator", "management_committee"],
        },
      },
      attributes: ["roleId"],
    });

    const adminRoleIds = adminRoles.map((r) => r.roleId);

    const adminUsers = await User.findAll({
      where: {
        roleId: { [Op.in]: adminRoleIds },
        societyId: societyId,
      },
      attributes: ["userId"],
    });

    const adminUserIds = adminUsers.map((u) => u.userId);

    const contacts = await Emergency_Contact.findAll({
      where: {
        userId: { [Op.in]: adminUserIds },
      },
    });

    return sendSuccessResponse(res, "Admin emergency contacts retrieved", contacts);
  } catch (error) {
    console.error("Error fetching admin contacts:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};



const deleteEmergencyContact = async (req, res) => {
  try {
    const { contactId,userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const contact = await Emergency_Contact.findByPk(contactId);
    if (!contact) return sendErrorResponse(res, "Contact not found", 404);

    const isSuperAdmin = role.roleCategory === "super_admin";
    const isSameSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      contact.societyId == user.societyId;

    if (isSuperAdmin || isSameSocietyAdmin) {
      await contact.destroy();
      return sendSuccessResponse(res, "Emergency Contact deleted");
    }

    return sendErrorResponse(res, "Permission denied", 403);
  } catch (error) {
    console.error("Delete contact error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

module.exports = {
  createEmergencyContactByUserId,
  createEmergencyContactBySocietyId,
  getEmergencyContactsByUserId,
  getEmergencyContactsBySocietyId,
  updateEmergencyContact,
  deleteEmergencyContact,
};