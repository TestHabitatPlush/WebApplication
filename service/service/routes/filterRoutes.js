const express = require("express");

const UserUnitListTable = express.Router();
const { UserUnitListTable: unitListTableController, newVisitorListTable: visitorListTableController } = require("../controllers/filterController.js");

// Visitor Table Routes
UserUnitListTable.get("/visitor-list", visitorListTableController);
UserUnitListTable.get("/", unitListTableController);

module.exports = UserUnitListTable;
