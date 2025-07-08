const express = require("express");
<<<<<<< HEAD
const {createFacilityManagement,getFacilityRecord,updateFacilityRecord,deleteFacilityRecord,getFacilityDataById} = require("../controllers/FacilityManagement_Controller.js")
=======
const {createFacilityManagement,getFacilityRecord,updateFacilityRecord,deleteFacilityRecord} = require("../controllers/FacilityManagement_Controller.js")
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384

const facilityRoutes= express.Router();

facilityRoutes.post("/facility/:societyId", createFacilityManagement);
facilityRoutes.get("/facility/:societyId",getFacilityRecord);
facilityRoutes.put("/:societyId/:facilityId",updateFacilityRecord);
facilityRoutes.delete("/facility_management/:facilityId",deleteFacilityRecord);
<<<<<<< HEAD
facilityRoutes.get("/:facilityId",getFacilityDataById);

=======
>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384

module.exports=facilityRoutes;