<<<<<<< HEAD
=======
// // routes/softwareHelpDeskRoutes.js
// const express = require("express");
// const router = express.Router();
// const SoftwareHelpDeskController = require("../controllers/softwareHelpDeskController");

// router.post("/status", SoftwareHelpDeskController.createSoftwareRefTicketStatus);
// router.get("/status", SoftwareHelpDeskController.getSoftwareRefTicketStatus);

// router.post("/:societyId/:userId/purpose", SoftwareHelpDeskController.createSoftwareTicketPurpose);
// router.get("/:societyId/purpose", SoftwareHelpDeskController.getSoftwareTicketPurpose);

// router.post("/:societyId/:userId/ticket", SoftwareHelpDeskController.createSoftwareTicket);
// router.get("/:societyId/:userId/tickets", SoftwareHelpDeskController.getSoftwareTicketTable);

// router.put("/tickets/:ticket_Id/status", SoftwareHelpDeskController.updateSoftwareTicketStatusAndRemarks);

// router.post("/access", SoftwareHelpDeskController.createSoftwareAccessManagement);

// module.exports = router;





>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
const express = require("express");
const router = express.Router();
const softwarehelpdeskController = require("../controllers/softwareHelpDeskController");

<<<<<<< HEAD
// 1. Ticket Status
router.post("/refticketstatus", softwarehelpdeskController.createrequestType);
router.get("/refticketstatus", softwarehelpdeskController.getrequestType);

// 2. Ticket Purpose
router.post("/ticket-purpose", softwarehelpdeskController.createTicketPurpous);
router.get("/ticket-purpose", softwarehelpdeskController.getTicketPurpous);
router.put("/ticket-purpose/:ticket_purpose_Id", softwarehelpdeskController.updateTicketPurpous);
router.get("/ticket-purpose/dropdown/:societyId", softwarehelpdeskController.getTicketListView);

// 3. Ticket
router.post("/ticket/create", softwarehelpdeskController.createTicket);
router.get("/ticket/list", softwarehelpdeskController.getTicketTable);

// 4. Access Management
router.get("/accessmanagement", softwarehelpdeskController.getAccessManagementMember);
router.post("/socityaccessmanagementcreate", softwarehelpdeskController.createAccessManagementtable);
=======


// 1. Ticket Status
router.post("/refticketstatus", softwarehelpdeskController.createSoftwareRefTicketStatus);
router.get("/refticketstatus", softwarehelpdeskController.getSoftwareRefTicketStatus);

>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

// 2. Ticket Purpose
router.post("/ticket-purpose/:societyId/:userId", softwarehelpdeskController.createSoftwareTicketPurpose);
router.get("/ticket-purpose/:societyId", softwarehelpdeskController.getSoftwareTicketPurpose);
router.put("/ticket-purpose/:ticket_purpose_Id", softwarehelpdeskController.updateSoftwareTicketPurpose);
router.get("/ticket-purpose/dropdown/:societyId", softwarehelpdeskController.getSoftwareTicketListView);

router.post("/ticket/create/:userId/:societyId", softwarehelpdeskController.createSoftwareTicket);
router.get("/ticket/:userId/:societyId", softwarehelpdeskController.getSoftwareTicketTable);
router.put("/ticket/:ticket_Id", softwarehelpdeskController.updateSoftwareTicketStatusAndRemarks);
router.get("/accessmanagement/:societyId", softwarehelpdeskController.getAccessManagementMember);
// router.get("/access-management", softwarehelpdeskController.getAccessManagementMember);
router.post("/socityaccessmanagementcreate/:societyId/:userId", softwarehelpdeskController.createSoftwareAccessManagement);
module.exports = router;

