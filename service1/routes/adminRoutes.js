
const express = require("express");
const { createSocietyModerator } = require("../controllers/userController");
const multer = require('multer');
const path = require('path');

const adminRouter = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// adminRouter.post("/create-society-user",upload.any(), createSocietyModerator);
adminRouter.post("/create-society-user", createSocietyModerator);

module.exports = adminRouter;