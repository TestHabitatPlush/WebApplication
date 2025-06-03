
const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")
const upload = require("..//middleware/upload.js")


// User routes start here
userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);


userRouter.post("/create-resident/:societyId",userController.createSocietyResident);
userRouter.get("/resident/:societyId" ,userController.getResidentBySocietyId);

userRouter.put("/resident/:societyId",userController.updateResidentBySocietyId)

userRouter.post("/bulk-create/:societyId",upload.single("file"),userController.bulkCreateResidents)

userRouter.get("/management/:societyId", userController.getManagement_committee);

userRouter.get('/resident/approvedUser/:societyId', userController.getAllApprovedUsers);
userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
module.exports = userRouter;