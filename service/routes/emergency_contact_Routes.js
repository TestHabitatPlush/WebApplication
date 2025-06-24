

// const express = require("express");
// const router = express.Router();
// const emergencyContactController = require("../controllers/emergencyContactController");


// router.post("/super/create/:userId", emergencyContactController.createEmergencyContactByUserId);
// router.get("/super/:userId", emergencyContactController.getEmergencyContactsByUserId);
// router.post("/society/:societyId/:userId", emergencyContactController.createEmergencyContactBySocietyId);
// router.get("/society/:societyId/:userId", emergencyContactController.getEmergencyContactsBySocietyId);
// router.put("/:contactId/user/:userId", emergencyContactController.updateEmergencyContact);
// router.delete("/:contactId/user/:userId", emergencyContactController.deleteEmergencyContact);


const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergencyContactController");

// SUPER ADMIN ROUTES (userId based)
router.post("/:userId", emergencyContactController.createEmergencyContactByUserId);
router.get("/:userId", emergencyContactController.getEmergencyContactsByUserId);

// SOCIETY ADMIN ROUTES (societyId and roleId based)
router.post("/:societyId/:userId", emergencyContactController.createEmergencyContactBySocietyId);
router.get("/:societyId/:userId", emergencyContactController.getEmergencyContactsBySocietyId);

// COMMON ROUTES
router.put("/:contactId", emergencyContactController.updateEmergencyContacts);
router.delete("/:contactId", emergencyContactController.deleteEmergencyContacts);

module.exports = router;

