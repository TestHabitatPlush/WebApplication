
const express = require("express");
const gateRouter = express.Router();
const { createGate, getGates, getGatesBySocietyId,updateGate,deleteGate } = require("../controllers/gateController");

gateRouter.post("/create", createGate);
gateRouter.get("/gates", getGates);
gateRouter.get("/gate/:societyId", getGatesBySocietyId);
gateRouter.put("/gate/:gateId",updateGate);
gateRouter.delete("/gate/:gateId",deleteGate);

module.exports = gateRouter;

