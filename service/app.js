// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

// require("./cron/expireSubscription.js");


// app.use(bodyParser.json());

// const errorHandler = require("./middleware/errorHandler");

// // router paths
// // const passwordReset = require("./routes/resetPasswordRoutes");

// const userRouter = require("./routes/userRoutes");
// const familyRouter = require("./routes/userFamilyRoutes.js");
// const authRouter = require("./routes/authRoutes");
// const documentRouter = require("./routes/documentRoutes");
// const discussionRouter = require("./routes/discussion_forum_Routes");
// const jobProfileRouter = require("./routes/jobProfileRoutes");
// const customerRoutes = require("./routes/customerRoutes");
// const parkingRoutes = require("./routes/parkingRoutes");
// const emergencyContact_router = require("./routes/emergency_contact_Routes");
// const gateAllocationRoutes = require("./routes/gateAllocationRoutes.js");
// const locationRouter = require("./routes/locationRoutes");
// const subscriptionPlanRoutes = require("./routes/subscriptionPlanRoutes");
// const roleRouter = require("./routes/roleRoutes");
// const adminRouter = require("./routes/adminRoutes");
// const buildingRouter = require("./routes/buildingRoutes");
// const filterRoutes = require("./routes/filterRoutes");
// const floorRouter = require("./routes/floorRoutes");
// const facilityManagement = require("./routes/facilityManagementRoutes");
// const unitTypeRouter = require("./routes/unitTypeRoutes");
// const gateRouter = require("./routes/gateRouter"); // Corrected variable name
// const {
//   User,
//   Customer,
//   GateAllocation,
//   Floor,
//   Facility,
//   Building,
//   Parking,
//   JobProfile,
//   Gate,
//   UnitType,
//   UserGroup,
//   Unit,
//   Visitor_new_visitentry,
//   Ticket_Summery,
//   Ticket_Details,
//   Document,
//   DiscussionForum,
// } = require("./models");
// const refUserGroupRouter = require("./routes/refUserGroupRouter");
// const {
//   initController,
//   //createSuperAdmin,
//   //createAdmin,
// } = require("./auto-creating-handlers");
// const noticeAnnouncementRouter = require("./routes/noticeAnnouncementRouter");
// const visitorManagementRouter = require("./routes/visitorManagementRouter");
// const unitRouter = require("./routes/unitRoutes");
// const softwareHelpDeskRouter = require("./routes/softwareHelpDeskRouter");
// const refTicketStatusRouter = require("./routes/refTicketStatusRouter");
// const passwordRouter = require("./routes/passwordRoutes.js");

// // testing apis
// app.get("/", (req, res) => {
//   res.send("API is working fine !");
// });
// app.get("/getenv", (req, res) => {
//   res.send(`Your current environment is ${process.env.NODE_ENV}`);
// });

// app.use("/api/users", userRouter);
// app.use("/api/family",familyRouter);
// app.use("/api/password",passwordRouter);
// app.use("/api/auth", authRouter);
// app.use("/api", customerRoutes);
// app.use("/api", subscriptionPlanRoutes);

// // admin routes
// app.use("/api/role", roleRouter);
// app.use("/api/admin", adminRouter);

// // gate routes
// app.use("/api/gate", gateRouter); // Corrected variable name here as

// //gateAllocation routes
// // app.use("/api/gateAllocation",gateAllocationRouter); // Corrected variable name here as

// // Static folder for uploaded files (optional, for serving files)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Use the routes defined in gateAllocationRouter
// app.use("/api/gateAllocation", gateAllocationRoutes);

// // building routes
// app.use("/api/building", buildingRouter);
// app.use("/api/floor", floorRouter);
// app.use("/api/unitType", unitTypeRouter);
// app.use("/api/unit", unitRouter);

// app.use("/api/jobProfile", jobProfileRouter);

// // app.use create user ref group superadmin api
// app.use("/api/refusergroup", refUserGroupRouter);

// // notice announcement
// app.use("/api/noticeAnnouncement", noticeAnnouncementRouter);

// // visitor management
// app.use("/api/visitormanagement", visitorManagementRouter);

// // software helpdesk
// app.use("/api/softwarehelpdesk", softwareHelpDeskRouter);

// // softwarehelpdesk refticketstatus
// app.use("/api/softwarehelpdesk", refTicketStatusRouter);

// // creating automatic users
// app.get("/init-database", initController);
// // app.get("/create-super-admin", createSuperAdmin);
// // app.get("/create-admin", createAdmin);

// app.use(errorHandler);

// // Ticket_Details.sync({ alter: true })
// //   .then(() => console.log("User table has been synced successfully."))
// //   .catch((err) => console.error("Error syncing the User table:", err));

// // Unit.sync({ alter: true })
// //   .then(() => console.log("UserModel table has been synced successfully."))
// //   .catch((err) => console.error("Error syncing the User table:", err));

// app.use("/api/filter", filterRoutes);

// // facilityManagement
// app.use("/api/facilityManagement", facilityManagement);

// // Parking
// app.use("/api", parkingRoutes);

// // passwordReset

// // app.use("/api", passwordReset);

// // documentReset
// app.use("/api/documents", documentRouter);

// // discussionForum
// app.use("/api/discussionForum",discussionRouter);

// // emergencyContact
// app.use("/api/emergencyContacts", emergencyContact_router);

// app.use("/api/location", locationRouter);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
const apiKeyMiddleware = require("./middleware/apiKeyMiddleware.js")

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Setup session store for Keycloak
const memoryStore = new session.MemoryStore();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
    cookie: {
      secure: false, //  set true if HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Keycloak configuration
const keycloak = new Keycloak(
  { store: memoryStore },
  {
    "auth-server-url": process.env.KEYCLOAK_AUTH_SERVER_URL, // e.g. http://localhost:8080/auth
    "realm": process.env.KEYCLOAK_REALM, // e.g. myrealm
    "resource": process.env.KEYCLOAK_CLIENT_ID, // e.g. my-client
    "public-client": true,
    "confidential-port": 0
  }
);

app.use(keycloak.middleware());

// CRON jobs
require("./cron/expireSubscription.js");

// Body parser
app.use(bodyParser.json());

// Error handler
const errorHandler = require("./middleware/errorHandler");

// Import routes
const userRouter = require("./routes/userRoutes");
const userUnitRouter = require ('./routes/userUnitRoutes.js')
const familyRouter = require("./routes/userFamilyRoutes.js");
const authRouter = require("./routes/authRoutes");
const documentRouter = require("./routes/documentRoutes");
const discussionRouter = require("./routes/discussion_forum_Routes");
const chat = require ("./routes/chatRoutes.js")
const chatAdmin = require("./routes/chatAdminRoutes.js");
const jobProfileRouter = require("./routes/jobProfileRoutes");
const customerRoutes = require("./routes/customerRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const vehicleRouter = require("./routes/vehicleRoutes.js")
const emergencyContactRouter = require("./routes/emergency_contact_Routes");
const gateAllocationRoutes = require("./routes/gateAllocationRoutes.js");
const locationRouter = require("./routes/locationRoutes");
const subscriptionPlanRoutes = require("./routes/subscriptionPlanRoutes");
const roleRouter = require("./routes/roleRoutes");
const adminRouter = require("./routes/adminRoutes");
const buildingRouter = require("./routes/buildingRoutes");
const filterRoutes = require("./routes/filterRoutes");
const floorRouter = require("./routes/floorRoutes");
const facilityManagement = require("./routes/facilityManagementRoutes");
const unitTypeRouter = require("./routes/unitTypeRoutes");
const gateRouter = require("./routes/gateRouter");
const refUserGroupRouter = require("./routes/refUserGroupRouter");
const { initController } = require("./auto-creating-handlers");
const noticeAnnouncementRouter = require("./routes/noticeAnnouncementRouter");
const visitorManagementRouter = require("./routes/visitorManagementRouter");
const unitRouter = require("./routes/unitRoutes");
const societyHelpDeskRouter = require("./routes/societyHelpDeskRouter");
const softwareHelpDeskRouter = require("./routes/softwareHelpDeskRouter.js");
const refTicketStatusRouter = require("./routes/refTicketStatusRouter");
const passwordRouter = require("./routes/passwordRoutes.js");

// --- Testing endpoints ---
app.get("/", (req, res) => {
  res.send("API is working fine!");
});

app.get("/getenv", (req, res) => {
  res.send(`Your current environment is ${process.env.NODE_ENV}`);
});

// --- Protected Routes ---
//app.use("/api", keycloak.protect(), userRouter);

app.use("/api",apiKeyMiddleware)

// --- Public / Semi-protected Routes ---
app.use("/api/users", userRouter);
app.use("/api/userUnit",userUnitRouter)
app.use("/api/family", familyRouter);
app.use("/api/password", passwordRouter);
app.use("/api/auth", authRouter);
app.use("/api", customerRoutes);
app.use("/api", subscriptionPlanRoutes);
app.use("/api/role", roleRouter);
app.use("/api/admin", adminRouter);
app.use("/api/gate", gateRouter);
app.use("/api/gateAllocation", gateAllocationRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/building", buildingRouter);
app.use("/api/floor", floorRouter);
app.use("/api/unitType", unitTypeRouter);
app.use("/api/unit", unitRouter);
app.use("/api/jobProfile", jobProfileRouter);
app.use("/api/refusergroup", refUserGroupRouter);
app.use("/api/noticeAnnouncement", noticeAnnouncementRouter);
app.use("/api/visitormanagement", visitorManagementRouter);

// software helpdesk
app.use("/api/societyhelpdesk", societyHelpDeskRouter);
app.use("/api/softwarehelpdesk", softwareHelpDeskRouter);


// softwarehelpdesk refticketstatus
app.use("/api/softwarehelpdesk", refTicketStatusRouter);
app.get("/init-database", initController);
app.use("/api/filter", filterRoutes);
app.use("/api/facilityManagement", facilityManagement);
app.use("/api", parkingRoutes);
app.use("/api/vehicle",vehicleRouter)
app.use("/api/documents", documentRouter);
app.use("/api/discussionForum", discussionRouter);
app.use("/api/chat",chat);
app.use("/api/chatAdmin",chatAdmin);
app.use("/api/emergencyContacts", emergencyContactRouter);
app.use("/api/location", locationRouter);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
