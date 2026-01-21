//##### UNitRoute#######

const express = require("express");
const router = express.Router();
const { createUnit, getUnit, getAllUnits, updateUnit, deleteUnit,GetUserByUnitId } = require("../controllers/unitController");

router.post("/", createUnit);
router.get("/", getAllUnits); 
router.get("/:societyId", getUnit); 
router.get("/users/:unitId",GetUserByUnitId);
router.put("/units/:unitId",updateUnit);
router.delete("/units/:unitId",deleteUnit)

module.exports = router;
