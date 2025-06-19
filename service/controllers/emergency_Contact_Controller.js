// const { Emergency_Contact, User, Role } = require("../models");
// const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
// const createEmergencyContactByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const {
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin,
//       viewStatus
//     } = req.body;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//      if (user.societyId !== null) {
//       return sendErrorResponse(res, "User is not a Super Admin", 403);
//     }

//     if (["super_admin", "super_admin_it"].includes(role.roleCategory)) {
//         if (user.societyId !== null) {
//       return sendErrorResponse(res, "User is not a Super Admin", 403);
//     }
//     } else {
//       return sendErrorResponse(res, "Permission denied", 403);
//     }

//     const contact = await Emergency_Contact.create({
//       userId: user.userId,
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin,
//       viewStatus,
//     });

//     return sendSuccessResponse(res, "Emergency Contact created successfully", contact, 201);
//   } catch (error) {
//     console.error("Error creating emergency contact:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// const createEmergencyContactBySocietyId = async (req, res) => {
//   try {
//     const { userId,societyId } = req.params;
//     const {
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin
//     } = req.body;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     const allowedRoles = ["society_moderator", "management_committee"];
//     if (!allowedRoles.includes(role.roleCategory)) {
//       return sendErrorResponse(res, "Only Admin can add emergency contacts", 403);
//     }

//     if (user.societyId?.toString() !== societyId?.toString()) {
//       return sendErrorResponse(res, "Unauthorized society access", 403);
//     }

//     const contact = await Emergency_Contact.create({
//       userId,
//       societyId,
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin,
//     });

//     return sendSuccessResponse(res, "Emergency Contact created", contact, 201);
//   } catch (error) {
//     console.error("Create contact (admin) error:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// const updateEmergencyContact = async (req, res) => {
//   try {
//     const { userId, contactId } = req.params;
//     const updateData = req.body;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     const contact = await Emergency_Contact.findByPk(contactId);
//     if (!contact) return sendErrorResponse(res, "Contact not found", 404);

//     const isSuperAdmin = role.roleCategory === "super_admin";
//     const isSameSocietyAdmin =
//       ["society_moderator", "management_committee"].includes(role.roleCategory) &&
//       contact.societyId == user.societyId;

//     if (isSuperAdmin || isSameSocietyAdmin) {
//       await contact.update(updateData);
//       return sendSuccessResponse(res, "Emergency Contact updated", contact);
//     }

//     return sendErrorResponse(res, "Permission denied", 403);
//   } catch (error) {
//     console.error("Update contact error:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// const getEmergencyContactsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//      if (user.societyId !== null) {
//       return sendErrorResponse(res, "User is not a Super Admin", 403);
//     }
//     const contacts = await Emergency_Contact.findAll({
//       where: {
//         userId: userId,
//        }
//     });
//     return sendSuccessResponse(res, "Super Admin emergency contacts retrieved", contacts);
//   } catch (error) {
//     console.error("Error fetching super admin contacts:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// const getEmergencyContactsBySocietyId = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     const contacts = await Emergency_Contact.findAll({
//       where: { societyId }
//     });

//     return sendSuccessResponse(res, "Admin emergency contacts retrieved", contacts);
//   } catch (error) {
//     console.error("Error fetching admin contacts:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// const deleteEmergencyContact = async (req, res) => {
//   try {
//     const { contactId,userId } = req.params;

//     const user = await User.findByPk(userId);
//     if (!user) return sendErrorResponse(res, "User not found", 404);

//     const role = await Role.findByPk(user.roleId);
//     if (!role) return sendErrorResponse(res, "Role not found", 404);

//     const contact = await Emergency_Contact.findByPk(contactId);
//     if (!contact) return sendErrorResponse(res, "Contact not found", 404);

//     const isSuperAdmin = role.roleCategory === "super_admin";
//     const isSameSocietyAdmin =
//       ["society_moderator", "management_committee"].includes(role.roleCategory) &&
//       contact.societyId == user.societyId;

//     if (isSuperAdmin || isSameSocietyAdmin) {
//       await contact.destroy();
//       return sendSuccessResponse(res, "Emergency Contact deleted");
//     }

//     return sendErrorResponse(res, "Permission denied", 403);
//   } catch (error) {
//     console.error("Delete contact error:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };

// module.exports = {
//   createEmergencyContactByUserId,
//   createEmergencyContactBySocietyId,
//   getEmergencyContactsByUserId,
//   getEmergencyContactsBySocietyId,
//   updateEmergencyContact,
//   deleteEmergencyContact,
// };





const { Emergency_Contact, User, Role } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

//  Super Admin - Create contact
const createEmergencyContactByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name, econtactNo1, econtactNo2, emergencyContactType,
      address, state, city, pin, viewStatus,
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);
    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (!["super_admin", "super_admin_it"].includes(role.roleCategory)) {
      return sendErrorResponse(res, "Only Super Admin can create contacts this way", 403);
    }

    const contact = await Emergency_Contact.create({
      userId: user.userId,
      roleId: user.roleId,
      roleCategories: [role.roleCategory],
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

//  Super Admin - Get own contacts
const getEmergencyContactsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);

    if (user.societyId !== null) {
      return sendErrorResponse(res, "User is not a Super Admin", 403);
    }

    const contacts = await Emergency_Contact.findAll({
      where: { userId }
    });

    return sendSuccessResponse(res, "Super Admin emergency contacts retrieved", contacts);
  } catch (error) {
    console.error("Error fetching super admin contacts:", error);
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

//     if (!["super_admin", "super_admin_it"].includes(role.roleCategory)) {
//       return sendErrorResponse(res, "Only Super Admin data is viewable via this endpoint", 403);
//     }

//     const contacts = await Emergency_Contact.findAll({
//       where: { userId }
//     });

//     return sendSuccessResponse(res, "Super Admin emergency contacts retrieved", contacts);
//   } catch (error) {
//     console.error("Error fetching super admin contacts:", error);
//     return sendErrorResponse(res, "Internal Server Error", 500, error.message);
//   }
// };


// Society Admin - Create contact
const createEmergencyContactBySocietyId = async (req, res) => {
  try {
    const { userId, societyId } = req.params;
    const {
      name, econtactNo1, econtactNo2, emergencyContactType,
      address, state, city, pin
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);
    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    if (!["society_moderator", "management_committee"].includes(role.roleCategory)) {
      return sendErrorResponse(res, "Only Society Admin can create contacts this way", 403);
    }

    if (user.societyId?.toString() !== societyId?.toString()) {
      return sendErrorResponse(res, "Unauthorized society access", 403);
    }

    const contact = await Emergency_Contact.create({
      userId,
      roleId: user.roleId,
      roleCategories: [role.roleCategory],
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



const getEmergencyContactsBySocietyId = async (req, res) => {
  try {
    const { societyId, userId } = req.params;

    if (!societyId) return res.status(400).json({ message: "societyId is required" });
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findByPk(user.roleId);
    if (!role) return res.status(404).json({ message: "User role not found" });

    if (user.societyId?.toString() !== societyId.toString()) {
      return res.status(403).json({ message: "You can only view contacts from your own society" });
    }

    const allowedRoles = [
      "society_moderator", "management_committee",
      "owner", "owner_family",
      "tenant", "tenant_family",
      "security_guard", "security_supervisor", "security_manager"
    ];

    if (!allowedRoles.includes(role.roleCategory)) {
      return res.status(403).json({ message: "Permission denied to view emergency contacts" });
    }

    const contacts = await Emergency_Contact.findAll({
      where: { societyId }
    });

    return sendSuccessResponse(res, "Society emergency contacts retrieved", contacts);
  } catch (error) {
    console.error("Error fetching society contacts:", error);
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

    const isSuperAdmin =
      ["super_admin", "super_admin_it"].includes(role.roleCategory) &&
      contact.roleCategories.includes("super_admin") &&
      contact.userId === user.userId;

    const isSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      contact.roleCategories.includes(role.roleCategory) &&
      contact.societyId === user.societyId;

    if (!(isSuperAdmin || isSocietyAdmin)) {
      return sendErrorResponse(res, "Permission denied to edit", 403);
    }

    await contact.update(updateData);
    return sendSuccessResponse(res, "Emergency Contact updated", contact);
  } catch (error) {
    console.error("Update contact error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

const deleteEmergencyContact = async (req, res) => {
  try {
    const { contactId, userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return sendErrorResponse(res, "User not found", 404);
    const role = await Role.findByPk(user.roleId);
    if (!role) return sendErrorResponse(res, "Role not found", 404);

    const contact = await Emergency_Contact.findByPk(contactId);
    if (!contact) return sendErrorResponse(res, "Contact not found", 404);

    const isSuperAdmin =
      ["super_admin", "super_admin_it"].includes(role.roleCategory) &&
      contact.roleCategories.includes("super_admin") &&
      contact.userId === user.userId;

    const isSocietyAdmin =
      ["society_moderator", "management_committee"].includes(role.roleCategory) &&
      contact.roleCategories.includes(role.roleCategory) &&
      contact.societyId === user.societyId;

    if (!(isSuperAdmin || isSocietyAdmin)) {
      return sendErrorResponse(res, "Permission denied to delete", 403);
    }

    await contact.destroy();
    return sendSuccessResponse(res, "Emergency Contact deleted");
  } catch (error) {
    console.error("Delete contact error:", error);
    return sendErrorResponse(res, "Internal Server Error", 500, error.message);
  }
};

module.exports = {
  createEmergencyContactByUserId,
  getEmergencyContactsByUserId,
  createEmergencyContactBySocietyId,
  getEmergencyContactsBySocietyId,
  updateEmergencyContact,
  deleteEmergencyContact,
};
