

const express = require("express");
const router = express.Router();
const {
  createEmergencyContactByUserId,
  createEmergencyContactBySocietyId,
  getEmergencyContactsByUserId,
  updateEmergencyContact,
  deleteEmergencyContact,
} = require("../controllers/energencycontactController");

router.post("/:userId", createEmergencyContactByUserId);
router.post("/:societyId/:userId", createEmergencyContactBySocietyId);
router.get("/:userId", getEmergencyContactsByUserId);
router.put("/:userId/:contactId", updateEmergencyContact);
router.delete("/:userId/:contactId", deleteEmergencyContact);

module.exports = router;

