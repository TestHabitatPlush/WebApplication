const { getUnitType, createUnitType,getUnitTypeBySocityId, updateUnitType, deleteUnitType } = require('../controllers/unitTypeController');

const unitTypeRouter = require('express').Router();

unitTypeRouter
  .get("/", getUnitType)     
  .post("/", createUnitType)
  .get("/:societyId", getUnitTypeBySocityId)
  .put("/:unitTypeId",updateUnitType) 
  .delete("/:unitTypeId",deleteUnitType)


module.exports = unitTypeRouter;