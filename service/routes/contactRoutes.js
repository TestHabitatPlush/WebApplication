

// const express = require("express");
// const contactRouter = express.Router();

// const contactController = require("../controllers/energencycontactController");

// contactRouter.post('/emergency-contacts/:societyId',contactController.createEmergencyContact);
// contactRouter.put('/emergency-contacts/:societyId/:contactId',contactController.updateEmergencyContact);
// contactRouter.delete('/emergency-contacts/:contactId',contactController.deleteEmergencyContact);
// contactRouter.get('/emergency-contacts/:societyId', contactController.getEmergencyContacts);
// contactRouter.get('/emergency-contacts/:contactId', contactController.getEmergencyContacts);


// module.exports = contactRouter;


//2//
// const express = require("express");
// const {
//   createEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   getEmergencyContacts,
//   getEmergencyContactsById,
// } = require("../controllers/energencycontactController");
// const { checkAuth } = require("../middleware/authMiddleware");

// const contactRouter = express.Router();

// contactRouter.post("/create", checkAuth, createEmergencyContact);
// contactRouter.put("/:contactId", checkAuth, updateEmergencyContact);
// contactRouter.delete("/:contactId", checkAuth, deleteEmergencyContact);
// contactRouter.get("/society/:societyId", checkAuth, getEmergencyContacts); 
// contactRouter.get("/:contactId", checkAuth, getEmergencyContactsById);    

// module.exports = contactRouter;

// routes/emergencyContactRoutes.js


// const express = require("express");
// const {
//   createEmergencyContact,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   getEmergencyContacts,
//   getEmergencyContactsById,
// } = require("../controllers/energencycontactController");

// const contactRouter = express.Router();


// contactRouter.post('/emergency-contact/:role/:societyId', createEmergencyContact);
// contactRouter.put('/emergency-contact/:role/:societyId/:contactId', updateEmergencyContact);
// contactRouter.delete('/emergency-contact/:role/:contactId', deleteEmergencyContact);
// contactRouter.get('/emergency-contact/:role/:societyId', getEmergencyContacts);
// contactRouter.get('/emergency-contact/:role/contact/:contactId', getEmergencyContactsById);

//  module.exports = contactRouter;

const express = require("express");
const router = express.Router();
const emergencyController = require("../controllers/energencycontactController");

router.post("/emergency/:userId/:societyId", emergencyController.createEmergencyContact);
router.put("/emergency/:userId/:societyId/:contactId", emergencyController.updateEmergencyContact);
router.delete("/emergency/:userId/:contactId", emergencyController.deleteEmergencyContact);
router.get('/emergency/:userId/:societyId', emergencyController.getEmergencyContacts);
router.get('/emergency/:userId/contact/:contactId', emergencyController.getEmergencyContactsById);

module.exports = router;
