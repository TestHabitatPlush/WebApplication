const express = require("express");
const {
  parkingBooked,
  getParkingSlot,
  updateParking,
  // createVehicleBySocietyAndUser,
  createVehicleByUserId,
  createVehicleBySocietyId,
  getVehicleBySocietyId,
  getVehicleByUserId,
} = require("../controllers/parkingController.js");

const parkingRoutes = express.Router();

parkingRoutes.post("/parking/:societyId", parkingBooked);
parkingRoutes.get("/parking/:societyId", getParkingSlot);
parkingRoutes.put("/parking/:societyId/:parkingId", updateParking);

// parkingRoutes.post("/vehicle", createVehicleBySocietyAndUser);
parkingRoutes.post("/vehicle/:societyId", createVehicleBySocietyId);
parkingRoutes.post("/vehicle/user/:userId",createVehicleByUserId);

parkingRoutes.get("/society/:societyId/vehicles", getVehicleBySocietyId);
parkingRoutes.get("/user/:userId/vehicles", getVehicleByUserId);

module.exports = parkingRoutes;
