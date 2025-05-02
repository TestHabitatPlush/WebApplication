const express = require('express');

const { parkingBooked,getParkingSlot} = require ("../controllers/parkingController.js")

const parkingRoutes = express.Router();

parkingRoutes.post("/parking/:societyId",parkingBooked);
parkingRoutes.get("/parking/:societyId",getParkingSlot);

module.exports = parkingRoutes;