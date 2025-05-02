const {
  createTicketPurpous,
  getTicketPurpous,
  getTicketListView,
  createTicket,
  updateTicketPurpous,
  getTicketTable,
  getrequestType,
  createrequestType,
  getAccessManagementMember,
  createAccessManagementtable,
} = require("../controllers/softwareHelpDeskController");

const softwareHelpDeskRouter = require("express").Router();

softwareHelpDeskRouter.post("/", createTicketPurpous);
softwareHelpDeskRouter.get("/", getTicketPurpous);
softwareHelpDeskRouter.get("/ticketlistview", getTicketListView);
softwareHelpDeskRouter.post("/createTicket", createTicket);
softwareHelpDeskRouter.put(
  "/updateTicketPurpous/:ticket_purpose_Id",
  updateTicketPurpous
);
softwareHelpDeskRouter.get("/getTicketTable", getTicketTable);
softwareHelpDeskRouter.post("/typeofrequest", createrequestType);
softwareHelpDeskRouter.get("/typeofrequest", getrequestType);
softwareHelpDeskRouter.get("/accessmanagement", getAccessManagementMember);
softwareHelpDeskRouter.post(
  "/socityaccessmanagementcreate",
  createAccessManagementtable
);

module.exports = softwareHelpDeskRouter;
