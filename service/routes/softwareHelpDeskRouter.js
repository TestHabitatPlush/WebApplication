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



const express = require("express");
const router = express.Router();
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

module.exports = router;
