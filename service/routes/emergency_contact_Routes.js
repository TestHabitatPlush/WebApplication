

const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergency_contact_controller");

// SUPER ADMIN ROUTES (userId based)
router.post("/:userId", emergencyContactController.createEmergencyContactByUserId);
router.get("/:userId", emergencyContactController.getEmergencyContactsByUserId);

// SOCIETY ADMIN ROUTES (societyId and roleId based)
router.post("/society/:societyId/:userId", emergencyContactController.createEmergencyContactBySocietyId);
router.get("/society/:societyId/:userId", emergencyContactController.getEmergencyContactsBySocietyId);

// Resident creates emergency contact
// router.post("/resident/:userId", emergencyContactController.createEmergencyContactByResident);
// router.get("/resident/:userId", emergencyContactController.getEmergencyContactsByResident);

// COMMON ROUTES
router.put("/:contactId", emergencyContactController.updateEmergencyContacts);
router.delete("/:contactId", emergencyContactController.deleteEmergencyContacts);



module.exports = router;