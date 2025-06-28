const express = require("express");
const { getFloors, createFloor, getFloorsBySocietyId, updateFloor, deleteFloor } = require("../controllers/floorController");


const floorRouter = express.Router();


floorRouter
  .get("/", getFloors) 
  .post("/", createFloor)
  .get("/:societyId", getFloorsBySocietyId)
  .put("/:floorId",updateFloor)
  .delete("/:floorId",deleteFloor);

module.exports = floorRouter;
