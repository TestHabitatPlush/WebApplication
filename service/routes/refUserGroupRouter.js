const express = require("express");
const {
  createRefUserGroup,
  getUserGroupNotice,
} = require("../controllers/refUserGroupController");
// const { createRole, getRoles, updateRole, deleteRole } = require('../controllers/roleController');
// const { roleValidationRules } = require('../validators/roleValidator');

const refUserGroupRouter = express.Router();

refUserGroupRouter.post("/", createRefUserGroup).get("/", getUserGroupNotice);

module.exports = refUserGroupRouter;
