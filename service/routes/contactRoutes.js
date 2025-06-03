// const express = require("express");
// const contactRouter = express.Router();

// const contactController = require("../controllers/energencycontactController");

// contactRouter.post('/emergency-contacts/:societyId',contactController.createEmergencyContact);
// contactRouter.put('/emergency-contacts/:contactId',contactController.updateEmergencyContact);
// contactRouter.delete('/emergency-contacts/:contactId',contactController.deleteEmergencyContact);
// contactRouter.get('/emergency-contacts/:contactId?', contactController.getEmergencyContacts);


// module.exports = contactRouter;

const express = require("express");
const contactRouter = express.Router();

const contactController = require("../controllers/energencycontactController");

contactRouter.post('/emergency-contacts/:societyId',contactController.createEmergencyContact);
contactRouter.put('/emergency-contacts/:societyId/:contactId',contactController.updateEmergencyContact);
contactRouter.delete('/emergency-contacts/:contactId',contactController.deleteEmergencyContact);
contactRouter.get('/emergency-contacts/:societyId', contactController.getEmergencyContacts);

module.exports = contactRouter;