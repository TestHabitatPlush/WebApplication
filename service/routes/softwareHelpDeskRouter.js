const express = require("express");
const router = express.Router();
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

module.exports = router;
