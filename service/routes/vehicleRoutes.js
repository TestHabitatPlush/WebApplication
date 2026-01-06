// routes/vehicle.routes.js
const express = require("express");
const router = express.Router();

const {
  createVehicleBySocietyId,
  createVehicleByUserId,
  updateVehicleBySocietyId,
  getVehicleBySocietyId,
  getVehicleByUserId,
  getVehicleDataByIdForview,
} = require("../controllers/vehicleController");

// ADMIN
router.post("/society/:societyId", createVehicleBySocietyId);
router.put("/society/:societyId/:vehicleId", updateVehicleBySocietyId);
router.get("/society/:societyId", getVehicleBySocietyId);

// RESIDENT
router.post("/user/:userId/unit/:unitId", createVehicleByUserId);
router.get("/user/:userId", getVehicleByUserId);

// COMMON
router.get("/:vehicleId", getVehicleDataByIdForview);

module.exports = router;
