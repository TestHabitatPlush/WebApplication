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
const helpdeskController = require("../controllers/softwareHelpDeskController");

// 1. Ticket Purpose
router.post("/ticket-purpose/:societyId/:userId", helpdeskController.createTicketPurpose);
router.get("/ticket-purpose/:societyId", helpdeskController.getTicketPurpose);
router.put("/ticket-purpose/:ticket_purpose_Id", helpdeskController.updateTicketPurpose);
router.get("/ticket-purpose/dropdown/:societyId", helpdeskController.getTicketListView);

// 2. Ticket Summary + Details
router.post("/ticket", helpdeskController.createTicket);
router.get("/ticket/:societyId", helpdeskController.getTicketTable);

// 3. Request Type (Categorisation)
router.post("/request-type/:societyId/:userId", helpdeskController.createRequestType);
router.get("/request-type/:societyId", helpdeskController.getRequestType);


// router.post("/request-type", helpdeskController.createRequestType);
// router.get("/request-type", helpdeskController.getRequestType);


// 4. Access Management
router.get("/access-management/members/:societyId", helpdeskController.getAccessManagementMember);
router.post("/access-management/:societyId/:userId", helpdeskController.createAccessManagementTable);
router.put("/access-management/:accessId", helpdeskController.updateAccessManagementTable);

module.exports = router;
