const express = require("express");
const {
  parkingBooked,
  getParkingSlot,
  updateParking,
<<<<<<< HEAD
  getParkingDataById,
=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384
  // createVehicleBySocietyAndUser,
  createVehicleByUserId,
  createVehicleBySocietyId,
  getVehicleBySocietyId,
  getVehicleByUserId,
<<<<<<< HEAD
  getVehicleDataByIdForview
=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384
} = require("../controllers/parkingController.js");

const parkingRoutes = express.Router();

parkingRoutes.post("/parking/:societyId", parkingBooked);
parkingRoutes.get("/parking/:societyId", getParkingSlot);
parkingRoutes.put("/parking/:societyId/:parkingId", updateParking);
<<<<<<< HEAD
parkingRoutes.get("/:parkingId",getParkingDataById);
=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384

// parkingRoutes.post("/vehicle", createVehicleBySocietyAndUser);
parkingRoutes.post("/vehicle/:societyId", createVehicleBySocietyId);
parkingRoutes.post("/vehicle/user/:userId",createVehicleByUserId);

parkingRoutes.get("/society/:societyId/vehicles", getVehicleBySocietyId);
parkingRoutes.get("/user/:userId/vehicles", getVehicleByUserId);
<<<<<<< HEAD
parkingRoutes.get("/vehicleData/:vehicleId", getVehicleDataByIdForview);
=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384

module.exports = parkingRoutes;
