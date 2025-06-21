

// const express = require("express");
// const router = express.Router();
// const {
//   createEmergencyContactByUserId,
//   createEmergencyContactBySocietyId,
//   getEmergencyContactsByUserId,
//   updateEmergencyContact,
//   deleteEmergencyContact,
//   // getEmergencyContactsBySocietyId,
//   getEmergencyContactsBySocietyAdmin,
//   getEmergencyContactsForOtherUsers
// } = require("../controllers/emergency_Contact_Controller");

// router.post("/:userId", createEmergencyContactByUserId);
// router.post("/:societyId/:userId", createEmergencyContactBySocietyId);
// router.get("/:userId", getEmergencyContactsByUserId);
// // router.get("/super-admin/:userId", getEmergencyContactsByUserId);
// router.get("/society/:userId", getEmergencyContactsBySocietyAdmin);
// router.get("/others/:userId", getEmergencyContactsForOtherUsers);

// router.put("/:userId/:contactId", updateEmergencyContact);
// router.delete("/:userId/:contactId", deleteEmergencyContact);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const emergencyContactController = require("../controllers/emergency_Contact_Controller");

// router.post("/create/:userId", emergencyContactController.createEmergencyContactByUserId);
// router.get("/:userId", emergencyContactController.getEmergencyContactsByUserId);
// router.post("/society/:societyId/:userId", emergencyContactController.createEmergencyContactBySocietyId);
// router.get("/society/:societyId/:userId", emergencyContactController.getEmergencyContactsBySocietyId);
// router.put("/:contactId/user/:userId", emergencyContactController.updateEmergencyContact);
// router.delete("/:contactId/user/:userId", emergencyContactController.deleteEmergencyContact);

// module.exports = router;

const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergency_Contact_Controller");

// SUPER ADMIN ROUTES (userId based)
router.post("/:userId", emergencyContactController.createEmergencyContactByUserId);
router.get("/:userId", emergencyContactController.getEmergencyContactsByUserId);

// SOCIETY ADMIN ROUTES (societyId and roleId based)
router.post("/society/:societyId/:userId", emergencyContactController.createEmergencyContactBySocietyId);
router.get("/society/:societyId/:userId", emergencyContactController.getEmergencyContactsBySocietyId);

// Resident creates emergency contact
router.post("/resident/:userId", emergencyContactController.createEmergencyContactByResident);
router.get("/resident/:userId", emergencyContactController.getEmergencyContactsByResident);

// COMMON ROUTES
router.put("/:contactId", emergencyContactController.updateEmergencyContacts);
router.delete("/:contactId", emergencyContactController.deleteEmergencyContacts);

module.exports = router;
