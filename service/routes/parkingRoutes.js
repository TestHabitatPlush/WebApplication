const express = require("express");
const {
  parkingBooked,
  getParkingSlot,
  updateParking,
  getParkingDataById,
  createVehicleByUserId,
  createVehicleBySocietyId,
  getVehicleBySocietyId,
  getVehicleByUserId,
  getVehicleDataByIdForview
} = require("../controllers/parkingController.js");

const parkingRoutes = express.Router();

parkingRoutes.post("/parking/:societyId", parkingBooked);
parkingRoutes.get("/parking/:societyId", getParkingSlot);
parkingRoutes.put("/parking/:societyId/:parkingId", updateParking);
parkingRoutes.get("/:parkingId",getParkingDataById);

// parkingRoutes.post("/vehicle", createVehicleBySocietyAndUser);
parkingRoutes.post("/vehicle/:societyId", createVehicleBySocietyId);
parkingRoutes.post("/vehicle/user/:userId",createVehicleByUserId);

<<<<<<< HEAD
parkingRoutes.get("/society/:societyId", getVehicleBySocietyId);
parkingRoutes.get("/user/:userId", getVehicleByUserId);
=======
parkingRoutes.get("/society/:societyId/vehicles", getVehicleBySocietyId);
parkingRoutes.get("/user/:userId/vehicles", getVehicleByUserId);
parkingRoutes.get("/vehicleData/:vehicleId", getVehicleDataByIdForview);
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f

module.exports = parkingRoutes;
