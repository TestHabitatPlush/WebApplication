
const express = require("express");
const gateRouter = express.Router();
const { createGate, getGates, getGatesBySocietyId } = require("../controllers/gateController");

gateRouter.post("/create", createGate);
gateRouter.get("/gates", getGates);
gateRouter.get("/gate/:societyId", getGatesBySocietyId);

module.exports = gateRouter;

