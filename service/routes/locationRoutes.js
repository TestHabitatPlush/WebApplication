const express = require("express");
const locationRouter = express.Router();
const locationController = require("../controllers/locationController");

locationRouter.get("/countries", locationController.getAllCountries);
locationRouter.get("/states/:countryCode", locationController.getStatesByCountry);
locationRouter.get("/cities/:countryCode/:stateCode", locationController.getCitiesByState);

module.exports = locationRouter;
