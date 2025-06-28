const express = require('express');
const passwordRouter = express.Router();
const passwordController = require("../controllers/passwordController")

passwordRouter.post("/reset-password",passwordController.resetPassword);

module.exports = passwordRouter;