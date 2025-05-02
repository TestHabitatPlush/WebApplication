const express = require("express");
const {
  createBuilding,
  getBuildings,
  getBuildingsBySocietyId,
} = require("../controllers/buildingController");

const buildingRouter = express.Router();

buildingRouter
  .get("/:societyId", getBuildingsBySocietyId) // Specific route first
  .get("/", getBuildings) // General route second
  .post("/", createBuilding);

module.exports = buildingRouter;
