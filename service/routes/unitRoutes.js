//##### UNitRoute#######

const express = require("express");
const router = express.Router();
const { createUnit, getUnit, getAllUnits } = require("../controllers/unitController");

router.post("/", createUnit);
router.get("/", getAllUnits); 
router.get("/:societyId", getUnit); 

module.exports = router;
