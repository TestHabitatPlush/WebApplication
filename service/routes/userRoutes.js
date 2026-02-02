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



// const express = require("express");
// const userRouter = express.Router();
// const userController = require("../controllers/userController")
// const upload = require("..//middleware/upload.js")


// // User routes start here
// userRouter.post("/", userController.createUser);
// userRouter.get("/", userController.getAllUsers);
// userRouter.get("/:id", userController.getUserById);
// userRouter.get("/society/:societyId/users", userController.getUserBySocietyId);

// // userRouter.post("/resident/:id", userController.createResident);

// userRouter.post("/create-resident/:societyId", userController.createSocietyResident);
// userRouter.get("/resident/:societyId", userController.getResidentBySocietyId);

// userRouter.put("/resident/:societyId", userController.updateResidentBySocietyId)

// userRouter.post("/bulk-create/:societyId", upload.single("file"), userController.bulkCreateResidents)

// userRouter.get("/moderator/:societyId", userController. getSocietyModerator);
// userRouter.get("/management/:societyId", userController.getManagement_committee);

// userRouter.put("/moderator/:userId", upload.fields([{ name: "photo", maxCount: 1 }]), userController.updateSocietyModerator);
// userRouter.put("/moderators/:id", userController.updateSocietyStatus);

// userRouter.get('/resident/approvedUser/:societyId', userController.getAllApprovedUsers);
// userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
// // 
// userRouter.get('/superadmin/moderator', userController.getAllSuper_admin_itAndModrerator);
// // 
// userRouter.put('/User/:userId', userController.updateUserIdStatus);
// // userRouter.post("/resident/reject", userController.rejectUser);
//  userRouter.get('/resident/deactive/:societyId', userController.getAllDeactiveUsers);
// module.exports = userRouter;


const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");
const upload = require("../middleware/upload");

const { checkAuth } = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/adminOnly");

/* ---------------- PUBLIC / SYSTEM ---------------- */

userRouter.post("/", userController.createUser);

/* ---------------- AUTH REQUIRED ---------------- */

userRouter.get("/", checkAuth, userController.getAllUsers);
userRouter.get("/:id", checkAuth, userController.getUserById);
userRouter.get("/society/:societyId/users", checkAuth, userController.getUserBySocietyId);

/* ---------------- ADMIN ONLY ---------------- */

userRouter.post("/create-resident/:societyId",checkAuth,checkAdmin,userController.createSocietyResident);
userRouter.post("/bulk-create/:societyId",checkAuth,checkAdmin,upload.single("file"),userController.bulkCreateResidents);
userRouter.put("/moderator/:userId",checkAuth,checkAdmin,upload.fields([{ name: "photo", maxCount: 1 }]),userController.updateSocietyModerator);
userRouter.put("/moderators/:id",checkAuth,checkAdmin,userController.updateSocietyStatus);
userRouter.get("/superadmin/moderator",checkAuth,checkAdmin,userController.getAllSuper_admin_itAndModrerator);

/* ---------------- RESIDENT + ADMIN ---------------- */

userRouter.get("/resident/:societyId", checkAuth,userController.getResidentBySocietyId);
userRouter.put("/resident/:societyId",checkAuth,userController.updateResidentBySocietyId);
userRouter.get("/resident/approvedUser/:societyId",checkAuth,userController.getAllApprovedUsers);
userRouter.get("/resident/deactive/:societyId",checkAuth,userController.getAllDeactiveUsers);

/* ---------------- USER STATUS ---------------- */

userRouter.put("/User/:userId",checkAuth,checkAdmin,userController.updateUserIdStatus);

// socety_admin_it
userRouter.get("/super-admin-it", checkAuth, checkAdmin, userController.getSuperAdminIT);
userRouter.put("/super-admin-it", checkAuth, checkAdmin, userController.updateSuperAdminIT);
userRouter.delete("/super-admin-it", checkAuth, checkAdmin, userController.deleteSuperAdminIT);

module.exports = userRouter;
