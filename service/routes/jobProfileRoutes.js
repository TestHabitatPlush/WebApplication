const express = require("express");
const jobProfileRouter = express.Router();
const JobProfileController = require("../controllers/profileController");

// Routes to handle job profiles
jobProfileRouter.post("/create/:societyId", JobProfileController.createJobProfile);
jobProfileRouter.get("/:id", JobProfileController.getJobProfileById);
jobProfileRouter.get("/society/:societyId", JobProfileController.getJobProfilesBySocietyId);
jobProfileRouter.put("/update/:id", JobProfileController.updateJobProfileGuard);
jobProfileRouter.delete("/delete/:id", JobProfileController.deleteJobProfileGuard);

module.exports = jobProfileRouter;
