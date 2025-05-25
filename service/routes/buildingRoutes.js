const express = require("express");
const {
  createBuilding,
  getBuildings,
  getBuildingsBySocietyId,
  updateBuilding,
  deleteBuilding,
} = require("../controllers/buildingController");

const buildingRouter = express.Router();

buildingRouter
  .get("/:societyId", getBuildingsBySocietyId) 
  .get("/", getBuildings) 
  .post("/", createBuilding)
  .put("/:buildingId",updateBuilding)
  .delete("/:buildingId",deleteBuilding);

module.exports = buildingRouter;
