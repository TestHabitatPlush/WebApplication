const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const controller = require("../controllers/softwareHelpDeskController");

/* ========= Request Type ========= */
router.post("/refticketstatus", controller.createrequestType);
router.get("/refticketstatus", controller.getrequestType);

/* ========= Ticket Purpose ========= */
router.post("/ticket-purpose", controller.createTicketPurpous);
router.get("/ticket-purpose", controller.getTicketPurpous);
router.put("/ticket-purpose/:ticket_purpose_Id", controller.updateTicketPurpous);
router.get("/ticket-purpose/dropdown/:societyId", controller.getTicketListView);

/* ========= Ticket ========= */
router.post("/ticket/create", controller.createTicket);
router.get("/ticket/list", controller.getTicketTable);

/* ========= Access Management ========= */
router.get("/accessmanagement", controller.getAccessManagementMember);
router.post("/socityaccessmanagementcreate", controller.createAccessManagementtable);

=======
const softwareHelpdeskController = require("../controllers/softwareHelpDeskController");

// 1. Ticket Status
router.post(
  "/softwarerefticketstatus",
  softwareHelpdeskController.createRefTicketStatus
);
router.get(
  "/softwarerefticketstatus",
  softwareHelpdeskController.getRefTicketStatus
);

// 2. Ticket Purpose
router.post(
  "/software-ticket-purpose/:societyId/:userId",
  softwareHelpdeskController.createTicketPurpose
);
router.get(
  "/software-ticket-purpose/:societyId",
  softwareHelpdeskController.getTicketPurpose
);
router.put(
  "/software-ticket-purpose/:ticket_purpose_Id",
  softwareHelpdeskController.updateTicketPurpose
);
router.get(
  "/software-ticket-purpose/dropdown/:societyId",
  softwareHelpdeskController.getTicketListView
);

router.post(
  "/software-ticket/create/:userId/:societyId",
  softwareHelpdeskController.createTicket
);
router.get(
  "/software-ticket/:userId/:societyId",
  softwareHelpdeskController.getTicketTable
);
router.put(
  "/software-ticket/:ticket_Id",
  softwareHelpdeskController.updateTicketStatusAndRemarks
);
router.get(
  "/software-accessmanagement/:societyId",
  softwareHelpdeskController.getAccessManagementMember
);
// router.get("/access-management",  softwareHelpdeskController.getAccessManagementMember);
router.post(
  "/softwareaccessmanagementcreate/:societyId/:userId",
  softwareHelpdeskController.createAccessManagementtable
);
>>>>>>> priyanka
module.exports = router;
