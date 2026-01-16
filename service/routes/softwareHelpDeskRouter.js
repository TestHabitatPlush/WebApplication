const express = require("express");
const router = express.Router();
const softwarehelpdeskController = require("../controllers/softwareHelpDeskController");

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

module.exports = router;
