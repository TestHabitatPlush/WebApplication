const express = require("express");
const { getFloors, createFloor, getFloorsBySocietyId } = require("../controllers/floorController");


const floorRouter = express.Router();


floorRouter
  .get("/", getFloors) 
  .post("/", createFloor)
  .get("/:societyId", getFloorsBySocietyId); 

module.exports = floorRouter;
