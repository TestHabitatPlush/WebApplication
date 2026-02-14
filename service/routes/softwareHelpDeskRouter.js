const express = require("express");
const router = express.Router();
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
module.exports = router;
