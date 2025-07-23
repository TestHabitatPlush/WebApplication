const express = require("express");
const {createFacilityManagement,getFacilityRecord,updateFacilityRecord,deleteFacilityRecord,getFacilityDataById} = require("../controllers/FacilityManagement_Controller.js")

const facilityRoutes= express.Router();

facilityRoutes.post("/facility/:societyId", createFacilityManagement);
facilityRoutes.get("/facility/:societyId",getFacilityRecord);
facilityRoutes.put("/:societyId/:facilityId",updateFacilityRecord);
facilityRoutes.delete("/facility_management/:facilityId",deleteFacilityRecord);
facilityRoutes.get("/:facilityId",getFacilityDataById);


module.exports=facilityRoutes;