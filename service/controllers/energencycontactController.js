
// const Emergency_Contact = require("../models/Emergency_Contact");
// const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// // Create Emergency Contact (Society Admin Only)
// const createEmergencyContact = async (req, res) => {
//   try {
//     const { societyId } = req.params;
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

//     if (!societyId) return sendErrorResponse(res, 'Society ID is required');

//     const newContact = await Emergency_Contact.create({
//       societyId,
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin
//     });

//     return sendSuccessResponse(res, 'Emergency Contact created successfully', newContact);
//   } catch (error) {
//     console.error('Error creating Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error creating Emergency Contact', 500, error);
//   }
// };

// // Update Emergency Contact (Society Admin Only)
// const updateEmergencyContact = async (req, res) => {
//   try {
 
//     const { societyId, contactId } = req.params;
//     const {
//       emergencyContactType, 
//       name,
//       econtactNo1,
//       econtactNo2,
//       address,
//       state,
//       city,
//       pin
//     } = req.body;

//    if (!societyId || !contactId) {
//       return sendErrorResponse(res, "Society ID and contact ID are required", 400);
//     }

//     const emerencyContact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
//     if (!emerencyContact) return sendErrorResponse(res, "emerencyContact not found", 404);

//     if (!societyId || !emergencyContactType) {
//       return sendErrorResponse(res, 'societyId and emergencyContactType are required to update', 400);
//     }

//     const contact = await Emergency_Contact.findOne({
//       where: { societyId, emergencyContactType }
//     });

//     if (!emerencyContact) {
//       return sendErrorResponse(res, 'Emergency Contact not found for the given society and type', 404);
//     }

//     await emerencyContact.update({
//       name,
//       econtactNo1,
//       econtactNo2,
//       address,
//       state,
//       city,
//       pin
//     });

//     return sendSuccessResponse(res, 'Emergency Contact updated successfully', contact);
//   } catch (error) {
//     console.error('Error updating Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error updating Emergency Contact', 500, error.message);
//   }
// };


// // Delete Emergency Contact (Society Admin Only)
// const deleteEmergencyContact = async (req, res) => {
//   try {
//     const { contactId } = req.params;

//     const contact = await Emergency_Contact.findByPk(contactId);
//     if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

//     await contact.destroy();
//     return sendSuccessResponse(res, 'Emergency Contact deleted successfully');
//   } catch (error) {
//     console.error('Error deleting Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error deleting Emergency Contact', 500, error);
//   }
// };

// // Get Emergency Contacts by Society ID
// const getEmergencyContacts = async (req, res) => {
//   try {
//     const { societyId } = req.params;

//     const contacts = await Emergency_Contact.findAll({ where: { societyId } });

//     if (!contacts.length) {
//       return sendErrorResponse(res, 'No emergency contacts found', 404);
//     }

//     return sendSuccessResponse(res, 'Emergency contacts retrieved successfully', contacts);
//   } catch (error) {
//     console.error('Error fetching Emergency Contacts:', error);
//     return sendErrorResponse(res, 'Error fetching Emergency Contacts', 500, error);
//   }
// };


// const getEmergencyContactsById = async (req, res) => {
//   try {
//     const { contactId } = req.params;

//     const contacts = await Emergency_Contact.findAll({ where: { contactId } });

//     if (!contacts.length) {
//       return sendErrorResponse(res, 'No emergency contacts found', 404);
//     }

//     return sendSuccessResponse(res, 'Emergency contacts retrieved successfully', contacts);
//   } catch (error) {
//     console.error('Error fetching Emergency Contacts:', error);
//     return sendErrorResponse(res, 'Error fetching Emergency Contacts', 500, error);
//   }
// };

// module.exports = {
//   createEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   getEmergencyContacts,
//   getEmergencyContactsById
// };


//2//


// const Emergency_Contact = require("../models/Emergency_Contact");
// const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

// const ACCESS_ROLE_IDS = [1, 3, 4]; 


// const extractUserInfo = (user) => {
//   const roleId = user?.roleId || user?.role?.roleId || null;
//   const societyId = user?.societyId || null;
//   return { roleId, societyId };
// };

// // Create Emergency Contact
// const createEmergencyContact = async (req, res) => {
//   try {
//     const { roleId, societyId } = extractUserInfo(req.user);
//     if (!ACCESS_ROLE_IDS.includes(roleId)) {
//       return sendErrorResponse(res, "You do not have permission to create emergency contacts", 403);
//     }

//     if (!societyId) {
//       return sendErrorResponse(res, "Society ID is missing from user profile", 400);
//     }

//     const {
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin,
//     } = req.body;

//     const newContact = await Emergency_Contact.create({
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

//     return sendSuccessResponse(res, "Emergency Contact created successfully", newContact);
//   } catch (error) {
//     return sendErrorResponse(res, "Error creating Emergency Contact", 500, error);
//   }
// };

// // Update Emergency Contact
// const updateEmergencyContact = async (req, res) => {
//   try {
//     const { roleId, societyId } = extractUserInfo(req.user);
//     if (!ACCESS_ROLE_IDS.includes(roleId)) {
//       return sendErrorResponse(res, "You do not have permission to update emergency contacts", 403);
//     }

//     if (!societyId) {
//       return sendErrorResponse(res, "Society ID is missing from user profile", 400);
//     }

//     const { contactId } = req.params;
//     const contact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
//     if (!contact) {
//       return sendErrorResponse(res, "Emergency contact not found", 404);
//     }

//     await contact.update(req.body);
//     return sendSuccessResponse(res, "Emergency Contact updated successfully", contact);
//   } catch (error) {
//     return sendErrorResponse(res, "Error updating Emergency Contact", 500, error);
//   }
// };

// // Delete Emergency Contact
// const deleteEmergencyContact = async (req, res) => {
//   try {
//     const { roleId, societyId } = extractUserInfo(req.user);
//     if (!ACCESS_ROLE_IDS.includes(roleId)) {
//       return sendErrorResponse(res, "You do not have permission to delete emergency contacts", 403);
//     }

//     if (!societyId) {
//       return sendErrorResponse(res, "Society ID is missing from user profile", 400);
//     }

//     const { contactId } = req.params;
//     const contact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
//     if (!contact) {
//       return sendErrorResponse(res, "Emergency contact not found", 404);
//     }

//     await contact.destroy();
//     return sendSuccessResponse(res, "Emergency Contact deleted successfully");
//   } catch (error) {
//     return sendErrorResponse(res, "Error deleting Emergency Contact", 500, error);
//   }
// };

// // View All Emergency Contacts by Society ID
// const getEmergencyContacts = async (req, res) => {
//   try {
//     const { societyId } = req.params;
//     const contacts = await Emergency_Contact.findAll({ where: { societyId } });

//     if (!contacts.length) {
//       return sendErrorResponse(res, "No emergency contacts found", 404);
//     }

//     return sendSuccessResponse(res, "Emergency contacts retrieved successfully", contacts);
//   } catch (error) {
//     return sendErrorResponse(res, "Error fetching Emergency Contacts", 500, error);
//   }
// };

// // View Emergency Contact by Contact ID
// const getEmergencyContactsById = async (req, res) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await Emergency_Contact.findByPk(contactId);
//     if (!contact) {
//       return sendErrorResponse(res, "Emergency contact not found", 404);
//     }

//     return sendSuccessResponse(res, "Emergency contact retrieved successfully", contact);
//   } catch (error) {
//     return sendErrorResponse(res, "Error fetching Emergency Contact", 500, error);
//   }
// };

// module.exports = {
//   createEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   getEmergencyContacts,
//   getEmergencyContactsById,
// };


// const Emergency_Contact = require("../models/Emergency_Contact");
// const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// // Helper: Check if role is authorized (Super Admin or Admin)
// function isAuthorizedRole(role) {
//   return role === "Super Admin" || role === "Admin";
// }

// // Create Emergency Contact (Super Admin & Admin Only)
// const createEmergencyContact = async (req, res) => {
//   try {
//     const { societyId, role } = req.params; 
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

//     if (!isAuthorizedRole(role)) {
//       return sendErrorResponse(res, "Unauthorized: Only Super Admin or Admin can create emergency contacts", 403);
//     }

//     if (!societyId) return sendErrorResponse(res, 'Society ID is required', 400);
//     if (!name || !econtactNo1 || !econtactNo2) {
//       return sendErrorResponse(res, 'Name and at least two emergency contact numbers are required', 400);
//     }

//     const newContact = await Emergency_Contact.create({
//       societyId,
//       name,
//       econtactNo1,
//       econtactNo2,
//       emergencyContactType,
//       address,
//       state,
//       city,
//       pin
//     });

//     return sendSuccessResponse(res, 'Emergency Contact created successfully', newContact);
//   } catch (error) {
//     console.error('Error creating Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error creating Emergency Contact', 500, error.message);
//   }
// };

// // Update Emergency Contact (Super Admin & Admin Only)
// const updateEmergencyContact = async (req, res) => {
//   try {
//     const { societyId, contactId, role } = req.params;
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

//     if (!isAuthorizedRole(role)) {
//       return sendErrorResponse(res, "Unauthorized: Only Super Admin or Admin can update emergency contacts", 403);
//     }

//     if (!societyId || !contactId) {
//       return sendErrorResponse(res, "Society ID and Contact ID are required", 400);
//     }

//     const emergencyContact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
//     if (!emergencyContact) return sendErrorResponse(res, "Emergency Contact not found", 404);

//     // Update fields if provided
//     await emergencyContact.update({
//       name: name ?? emergencyContact.name,
//       econtactNo1: econtactNo1 ?? emergencyContact.econtactNo1,
//       econtactNo2: econtactNo2 ?? emergencyContact.econtactNo2,
//       emergencyContactType: emergencyContactType ?? emergencyContact.emergencyContactType,
//       address: address ?? emergencyContact.address,
//       state: state ?? emergencyContact.state,
//       city: city ?? emergencyContact.city,
//       pin: pin ?? emergencyContact.pin,
//     });

//     return sendSuccessResponse(res, 'Emergency Contact updated successfully', emergencyContact);
//   } catch (error) {
//     console.error('Error updating Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error updating Emergency Contact', 500, error.message);
//   }
// };

// // Delete Emergency Contact (Super Admin & Admin Only)
// const deleteEmergencyContact = async (req, res) => {
//   try {
//     const { contactId, role } = req.params;

//     if (!isAuthorizedRole(role)) {
//       return sendErrorResponse(res, "Unauthorized: Only Super Admin or Admin can delete emergency contacts", 403);
//     }

//     if (!contactId) return sendErrorResponse(res, 'Contact ID is required', 400);

//     const contact = await Emergency_Contact.findByPk(contactId);
//     if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

//     await contact.destroy();
//     return sendSuccessResponse(res, 'Emergency Contact deleted successfully');
//   } catch (error) {
//     console.error('Error deleting Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error deleting Emergency Contact', 500, error.message);
//   }
// };

// // Get Emergency Contacts by Society ID (Super Admin & Admin Only)
// const getEmergencyContacts = async (req, res) => {
//   try {
//     const { societyId, role } = req.params;

//     if (!isAuthorizedRole(role)) {
//       return sendErrorResponse(res, "Unauthorized: Only Super Admin or Admin can view emergency contacts", 403);
//     }

//     if (!societyId) return sendErrorResponse(res, 'Society ID is required', 400);

//     const contacts = await Emergency_Contact.findAll({ where: { societyId } });

//     if (!contacts.length) {
//       return sendErrorResponse(res, 'No emergency contacts found', 404);
//     }

//     return sendSuccessResponse(res, 'Emergency contacts retrieved successfully', contacts);
//   } catch (error) {
//     console.error('Error fetching Emergency Contacts:', error);
//     return sendErrorResponse(res, 'Error fetching Emergency Contacts', 500, error.message);
//   }
// };

// // Get Emergency Contact by Contact ID (Super Admin & Admin Only)
// const getEmergencyContactsById = async (req, res) => {
//   try {
//     const { contactId, role } = req.params;

//     if (!isAuthorizedRole(role)) {
//       return sendErrorResponse(res, "Unauthorized: Only Super Admin or Admin can view emergency contacts", 403);
//     }

//     if (!contactId) return sendErrorResponse(res, 'Contact ID is required', 400);

//     const contact = await Emergency_Contact.findByPk(contactId);

//     if (!contact) {
//       return sendErrorResponse(res, 'Emergency contact not found', 404);
//     }

//     return sendSuccessResponse(res, 'Emergency contact retrieved successfully', contact);
//   } catch (error) {
//     console.error('Error fetching Emergency Contact:', error);
//     return sendErrorResponse(res, 'Error fetching Emergency Contact', 500, error.message);
//   }
// };

// module.exports = {
//   createEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   getEmergencyContacts,
//   getEmergencyContactsById
// };

const Emergency_Contact = require("../models/Emergency_Contact");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const { getUserRoleCategory, isFullAccessRole, isViewOnlyRole } = require("../utils/permission");

const createEmergencyContact = async (req, res) => {
  try {
    const { userId, societyId } = req.params;
    const {
      name, econtactNo1, econtactNo2, emergencyContactType, address, state, city, pin
    } = req.body;

    if (!userId || !societyId) return sendErrorResponse(res, 'User ID and Society ID are required');

    const roleCategory = await getUserRoleCategory(userId);
    if (!isFullAccessRole(roleCategory)) {
      return sendErrorResponse(res, 'Permission denied. Not authorized to create.', 403);
    }

    const newContact = await Emergency_Contact.create({
      societyId, name, econtactNo1, econtactNo2,
      emergencyContactType, address, state, city, pin
    });

    return sendSuccessResponse(res, 'Emergency Contact created successfully', newContact);
  } catch (error) {
    console.error('Error creating Emergency Contact:', error);
    return sendErrorResponse(res, 'Error creating Emergency Contact', 500, error);
  }
};

const updateEmergencyContact = async (req, res) => {
  try {
    const { userId, societyId, contactId } = req.params;
    const {
      name, econtactNo1, econtactNo2, emergencyContactType, address, state, city, pin
    } = req.body;

    if (!userId || !societyId || !contactId) {
      return sendErrorResponse(res, "User ID, Society ID, and Contact ID are required", 400);
    }

    const roleCategory = await getUserRoleCategory(userId);
    if (!isFullAccessRole(roleCategory)) {
      return sendErrorResponse(res, 'Permission denied. Not authorized to update.', 403);
    }

    const contact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
    if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

    await contact.update({
      name, econtactNo1, econtactNo2, emergencyContactType, address, state, city, pin
    });

    return sendSuccessResponse(res, 'Emergency Contact updated successfully', contact);
  } catch (error) {
    console.error('Error updating Emergency Contact:', error);
    return sendErrorResponse(res, 'Error updating Emergency Contact', 500, error);
  }
};

const deleteEmergencyContact = async (req, res) => {
  try {
    const { userId, contactId } = req.params;

    if (!userId || !contactId) return sendErrorResponse(res, 'User ID and Contact ID are required');

    const roleCategory = await getUserRoleCategory(userId);
    if (!isFullAccessRole(roleCategory)) {
      return sendErrorResponse(res, 'Permission denied. Not authorized to delete.', 403);
    }

    const contact = await Emergency_Contact.findByPk(contactId);
    if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

    await contact.destroy();
    return sendSuccessResponse(res, 'Emergency Contact deleted successfully');
  } catch (error) {
    console.error('Error deleting Emergency Contact:', error);
    return sendErrorResponse(res, 'Error deleting Emergency Contact', 500, error);
  }
};

const getEmergencyContacts = async (req, res) => {
  try {
    const { userId, societyId } = req.params;

    if (!userId || !societyId) return sendErrorResponse(res, 'User ID and Society ID are required');

    const roleCategory = await getUserRoleCategory(userId);
    if (!isFullAccessRole(roleCategory) && !isViewOnlyRole(roleCategory)) {
      return sendErrorResponse(res, 'Permission denied. Not authorized to view.', 403);
    }

    const contacts = await Emergency_Contact.findAll({ where: { societyId } });
    return sendSuccessResponse(res, 'Emergency contacts retrieved successfully', contacts);
  } catch (error) {
    console.error('Error fetching Emergency Contacts:', error);
    return sendErrorResponse(res, 'Error fetching Emergency Contacts', 500, error);
  }
};

const getEmergencyContactsById = async (req, res) => {
  try {
    const { userId, contactId } = req.params;

    if (!userId || !contactId) return sendErrorResponse(res, 'User ID and Contact ID are required');

    const roleCategory = await getUserRoleCategory(userId);
    if (!isFullAccessRole(roleCategory) && !isViewOnlyRole(roleCategory)) {
      return sendErrorResponse(res, 'Permission denied. Not authorized to view.', 403);
    }

    const contact = await Emergency_Contact.findOne({ where: { contactId } });
    if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

    return sendSuccessResponse(res, 'Emergency contact retrieved successfully', contact);
  } catch (error) {
    console.error('Error fetching Emergency Contact:', error);
    return sendErrorResponse(res, 'Error fetching Emergency Contact', 500, error);
  }
};

module.exports = {
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContacts,
  getEmergencyContactsById
};
