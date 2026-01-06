// const express = require("express");
// const userRouter = express.Router();
// const userController = require("../controllers/userController")
// const upload = require("..//middleware/upload.js")


// // User routes start here
// userRouter.post("/", userController.createUser);
// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getUserById);

// // userRouter.post("/resident/:id", userController.createResident);

// userRouter.post("/create-resident/:societyId", userController.createSocietyResident);
// userRouter.get("/resident/:societyId", userController.getResidentBySocietyId);

// userRouter.put("/resident/:societyId", userController.updateResidentBySocietyId)

// userRouter.post("/bulk-create/:societyId", upload.single("file"), userController.bulkCreateResidents)
// userRouter.post("/bulk-create/manual/:societyId", userController.bulkCreateResidentsManual);

// userRouter.get("/moderator/:societyId", userController. getSocietyModerator);
// userRouter.get("/management/:societyId", userController.getManagement_committee);

// userRouter.put("/moderator/:userId", upload.fields([{ name: "photo", maxCount: 1 }]), userController.updateSocietyModerator);
// userRouter.put("/moderators/:id", userController.updateSocietyStatus);

// userRouter.get('/resident/approvedUser/:societyId', userController.getAllApprovedUsers);
// userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
// // 
// // 
// // userRouter.post("/resident/reject", userController.rejectUser);
// module.exports = userRouter;



const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")
const upload = require("..//middleware/upload.js")


// User routes start here
userRouter.post("/", userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.get("/society/:societyId/users", userController.getUserBySocietyId);

// userRouter.post("/resident/:id", userController.createResident);

userRouter.post("/create-resident/:societyId", userController.createSocietyResident);
userRouter.get("/resident/:societyId", userController.getResidentBySocietyId);

userRouter.put("/resident/:societyId", userController.updateResidentBySocietyId)

userRouter.post("/bulk-create/:societyId", upload.single("file"), userController.bulkCreateResidents)

userRouter.get("/moderator/:societyId", userController. getSocietyModerator);
userRouter.get("/management/:societyId", userController.getManagement_committee);

userRouter.put("/moderator/:userId", upload.fields([{ name: "photo", maxCount: 1 }]), userController.updateSocietyModerator);
userRouter.put("/moderators/:id", userController.updateSocietyStatus);

userRouter.get('/resident/approvedUser/:societyId', userController.getAllApprovedUsers);
userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
// 
userRouter.get('/superadmin/moderator', userController.getAllSuper_admin_itAndModrerator);
// 
userRouter.put('/User/:userId', userController.updateUserIdStatus);
// userRouter.post("/resident/reject", userController.rejectUser);
 userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
module.exports = userRouter;


