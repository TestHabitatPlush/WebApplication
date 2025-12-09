

const express = require("express");
const router = express.Router();
const helpdeskController = require("../controllers/societyHelpDeskController");



// 1. Ticket Status
router.post("/refticketstatus", helpdeskController.createRefTicketStatus);
router.get("/refticketstatus", helpdeskController.getRefTicketStatus);


// 2. Ticket Purpose
router.post("/ticket-purpose/:societyId/:userId", helpdeskController.createTicketPurpose);
router.get("/ticket-purpose/:societyId", helpdeskController.getTicketPurpose);
router.put("/ticket-purpose/:ticket_purpose_Id", helpdeskController.updateTicketPurpose);
router.get("/ticket-purpose/dropdown/:societyId", helpdeskController.getTicketListView);

router.post("/ticket/create/:userId/:societyId", helpdeskController.createTicket);
router.get("/ticket/:userId/:societyId", helpdeskController.getTicketTable);
router.put("/ticket/:ticket_Id", helpdeskController.updateTicketStatusAndRemarks);
router.get("/accessmanagement/:societyId", helpdeskController.getAccessManagementMember);
// router.get("/access-management", helpdeskController.getAccessManagementMember);
router.post("/socityaccessmanagementcreate/:societyId/:userId", helpdeskController.createAccessManagementtable);
module.exports = router;



//1.status

// 2. Ticket Categorisation
// router.post("/categorisation", helpdeskController.createRefTicketCategorisation);
// router.get("/categorisation", helpdeskController.getAllRefTicketCategorisations);
