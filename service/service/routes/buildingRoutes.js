const express = require("express");
const {
  createBuilding,
  getBuildings,
  getBuildingsBySocietyId,deleteBuilding,updateBuilding
} = require("../controllers/buildingController");

const buildingRouter = express.Router();

buildingRouter
  .get("/:societyId", getBuildingsBySocietyId) // Specific route first
  .get("/", getBuildings) // General route second
  .post("/", createBuilding);

  // DELETE Building
buildingRouter.delete("/:buildingId", deleteBuilding);
buildingRouter.put("/:buildingId", updateBuilding);

module.exports = buildingRouter;
