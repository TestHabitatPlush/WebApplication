const { Emergency_Contact, User, Role } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

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
      viewStatus = "pending", 
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
    const {  userId, societyId } = req.params;
    const { name, econtactNo1, econtactNo2, emergencyContactType, address, state, city, pin } = req.body;

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

const getEmergencyContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    let contacts;

    if (role.roleCategory === "super_admin") {
      contacts = await Emergency_Contact.findAll();
    } else if (user.societyId) {
      contacts = await Emergency_Contact.findAll({
        where: { societyId: user.societyId },
      });
    } else {
      return sendErrorResponse(res, "User has no associated society", 403);
    }

    return sendSuccessResponse(res, "Emergency contacts retrieved", contacts);
  } catch (error) {
    console.error("Get contacts error:", error);
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
  updateEmergencyContact,
  deleteEmergencyContact,
};