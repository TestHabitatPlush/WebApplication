const { getUnitType, createUnitType,getUnitTypeBySocityId } = require('../controllers/unitTypeController');

const unitTypeRouter = require('express').Router();

unitTypeRouter
  .get("/", getUnitType)     
  .post("/", createUnitType)
  .get("/:societyId", getUnitTypeBySocityId); 


module.exports = unitTypeRouter;