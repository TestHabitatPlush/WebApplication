const express = require("express");
const router = express.Router();
const {
  addUserUnit,
  getUserUnits,
  removeUserUnit,
  updateUserUnit,
} = require("../controllers/userUnitController");

router.post("/", addUserUnit);
router.get("/:userId", getUserUnits);
router.put("/:userUnitId", updateUserUnit);
router.delete("/:userId/:unitId", removeUserUnit);

module.exports = router;
