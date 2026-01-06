const express = require("express");
const {
  parkingBooked,
  getParkingSlot,
  updateParking,
  getParkingDataById,
  // createVehicleByUserId,
  // createVehicleBySocietyId,
  // getVehicleBySocietyId,
  // getVehicleByUserId,
  // getVehicleDataByIdForview,
  // updateVehicleBySocietyId,
  // updateVehicleByVehicleId
} = require("../controllers/parkingController.js");

const parkingRoutes = express.Router();

parkingRoutes.post("/parking/:societyId", parkingBooked);
parkingRoutes.get("/parking/:societyId", getParkingSlot);
parkingRoutes.put("/parking/:societyId/:parkingId", updateParking);
// parkingRoutes.put("/society/:societyId/vehicle/:vehicleId",updateVehicleBySocietyId);
// parkingRoutes.put("/vehicle/:vehicleId",updateVehicleByVehicleId


parkingRoutes.get("/:parkingId",getParkingDataById);

// parkingRoutes.post("/vehicle", createVehicleBySocietyAndUser);
// parkingRoutes.post("/vehicle/:societyId", createVehicleBySocietyId);
// parkingRoutes.post("/vehicle/user/:userId",createVehicleByUserId);

// parkingRoutes.get("/society/:societyId/vehicles", getVehicleBySocietyId);
// parkingRoutes.get("/user/:userId/vehicles", getVehicleByUserId);
// parkingRoutes.get("/vehicleData/:vehicleId", getVehicleDataByIdForview);

module.exports = parkingRoutes;
