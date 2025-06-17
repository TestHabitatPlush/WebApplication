

const express = require("express");
const router = express.Router();
const {
  createEmergencyContactByUserId,
  createEmergencyContactBySocietyId,
  getEmergencyContactsByUserId,
  updateEmergencyContact,
  deleteEmergencyContact,
  getEmergencyContactsBySocietyId,
} = require("../controllers/emergency_Contact_Controller");

router.post("/:userId", createEmergencyContactByUserId);
router.post("/:societyId/:userId", createEmergencyContactBySocietyId);
router.get("/:userId", getEmergencyContactsByUserId);
router.get("/society/:societyId", getEmergencyContactsBySocietyId);
router.put("/:userId/:contactId", updateEmergencyContact);
router.delete("/:userId/:contactId", deleteEmergencyContact);

module.exports = router;

