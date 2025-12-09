<<<<<<< HEAD
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


=======
// const {
//   createTicketPurpous,
//   getTicketPurpous,
//   getTicketListView,
//   createTicket,
//   updateTicketPurpous,
//   getTicketTable,
//   getrequestType,
//   createrequestType,
//   getAccessManagementMember,
//   createAccessManagementtable,
// } = require("../controllers/softwareHelpDeskController");

// const softwareHelpDeskRouter = require("express").Router();

// softwareHelpDeskRouter.post("/", createTicketPurpous);
// softwareHelpDeskRouter.get("/", getTicketPurpous);
// softwareHelpDeskRouter.get("/ticketlistview", getTicketListView);
// softwareHelpDeskRouter.post("/createTicket", createTicket);
// softwareHelpDeskRouter.put(
//   "/updateTicketPurpous/:ticket_purpose_Id",
//   updateTicketPurpous
// );
// softwareHelpDeskRouter.get("/getTicketTable", getTicketTable);
// softwareHelpDeskRouter.post("/typeofrequest", createrequestType);
// softwareHelpDeskRouter.get("/typeofrequest", getrequestType);
// softwareHelpDeskRouter.get("/accessmanagement", getAccessManagementMember);
// softwareHelpDeskRouter.post(
//   "/socityaccessmanagementcreate",
//   createAccessManagementtable
// );

// module.exports = softwareHelpDeskRouter;
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f



const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const softwarehelpdeskController = require("../controllers/softwareHelpDeskController");



// 1. Ticket Status
router.post("/refticketstatus", softwarehelpdeskController.createSoftwareRefTicketStatus);
router.get("/refticketstatus", softwarehelpdeskController.getSoftwareRefTicketStatus);


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
=======
const helpDeskController = require("../controllers/softwareHelpDeskController");
const statusController = require("../controllers/refTicketStatusController");
// 1. Ticket Purpose
router.post("/ticket-purpose", helpDeskController.createTicketPurpose);
router.get("/ticket-purpose", helpDeskController.getTicketPurpose);
router.put("/ticket-purpose/:ticket_purpose_Id", helpDeskController.updateTicketPurpose);
router.get("/ticket-purpose/view", helpDeskController.getTicketListView);

// 2. Ticket (Summary + Details)
router.post("/ticket", helpDeskController.createTicket);
router.get("/ticket-table", helpDeskController.getTicketTable);

// 3. Request Type (Categorisation)
router.post("/request-type", helpDeskController.createRequestType);
router.get("/request-type", helpDeskController.getRequestType);

// 4. Access Management
router.get("/access-management", helpDeskController.getAccessManagementMember);
router.post("/access-management", helpDeskController.createAccessManagementTable);

// 5.Ticket Status Ref Table
router.post("/ticket-status", statusController.createRefTicketStatus);
router.get("/ticket-status", statusController.getRefTicketStatus);

>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
module.exports = router;
