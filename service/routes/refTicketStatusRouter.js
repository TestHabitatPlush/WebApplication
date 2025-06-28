const express = require("express");
const {
  createRefTicketStatus,
  getRefTicketStatus,
} = require("../controllers/refTicketStatusController");

const refTicketStatusRouter = express.Router();

refTicketStatusRouter.post("/refticketstatus", createRefTicketStatus);
refTicketStatusRouter.get("/refticketstatus", getRefTicketStatus);

module.exports = refTicketStatusRouter;
