
const Emergency_Contact = require("../models/Emergency_Contact");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

// Create Emergency Contact (Society Admin Only)
const createEmergencyContact = async (req, res) => {
  try {
    const { societyId } = req.params;
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

    if (!societyId) return sendErrorResponse(res, 'Society ID is required');

    const newContact = await Emergency_Contact.create({
      societyId,
      name,
      econtactNo1,
      econtactNo2,
      emergencyContactType,
      address,
      state,
      city,
      pin
    });

    return sendSuccessResponse(res, 'Emergency Contact created successfully', newContact);
  } catch (error) {
    console.error('Error creating Emergency Contact:', error);
    return sendErrorResponse(res, 'Error creating Emergency Contact', 500, error);
  }
};

// Update Emergency Contact (Society Admin Only)
const updateEmergencyContact = async (req, res) => {
  try {
 
    const { societyId, contactId } = req.params;
    const {
      emergencyContactType, 
      name,
      econtactNo1,
      econtactNo2,
      address,
      state,
      city,
      pin
    } = req.body;

   if (!societyId || !contactId) {
      return sendErrorResponse(res, "Society ID and contact ID are required", 400);
    }

    const emerencyContact = await Emergency_Contact.findOne({ where: { contactId, societyId } });
    if (!emerencyContact) return sendErrorResponse(res, "emerencyContact not found", 404);

    if (!societyId || !emergencyContactType) {
      return sendErrorResponse(res, 'societyId and emergencyContactType are required to update', 400);
    }

    const contact = await Emergency_Contact.findOne({
      where: { societyId, emergencyContactType }
    });

    if (!emerencyContact) {
      return sendErrorResponse(res, 'Emergency Contact not found for the given society and type', 404);
    }

    await emerencyContact.update({
      name,
      econtactNo1,
      econtactNo2,
      address,
      state,
      city,
      pin
    });

    return sendSuccessResponse(res, 'Emergency Contact updated successfully', contact);
  } catch (error) {
    console.error('Error updating Emergency Contact:', error);
    return sendErrorResponse(res, 'Error updating Emergency Contact', 500, error.message);
  }
};


// Delete Emergency Contact (Society Admin Only)
const deleteEmergencyContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await Emergency_Contact.findByPk(contactId);
    if (!contact) return sendErrorResponse(res, 'Emergency Contact not found', 404);

    await contact.destroy();
    return sendSuccessResponse(res, 'Emergency Contact deleted successfully');
  } catch (error) {
    console.error('Error deleting Emergency Contact:', error);
    return sendErrorResponse(res, 'Error deleting Emergency Contact', 500, error);
  }
};

// Get Emergency Contacts by Society ID
const getEmergencyContacts = async (req, res) => {
  try {
    const { societyId } = req.params;

    const contacts = await Emergency_Contact.findAll({ where: { societyId } });

    if (!contacts.length) {
      return sendErrorResponse(res, 'No emergency contacts found', 404);
    }

    return sendSuccessResponse(res, 'Emergency contacts retrieved successfully', contacts);
  } catch (error) {
    console.error('Error fetching Emergency Contacts:', error);
    return sendErrorResponse(res, 'Error fetching Emergency Contacts', 500, error);
  }
};

module.exports = {
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContacts
};
