


// const express = require("express");
// const router = express.Router();
// const subscriptionPlanController = require("../controllers/subscriptionPlanController");

// router.post("/subscription-plans", subscriptionPlanController.createSubscriptionPlan);
// router.get("/subscription-plans", subscriptionPlanController.getAllSubscriptionPlans);
// router.get("/subscription-plans/:id", subscriptionPlanController.getSubscriptionPlanById);
// router.put("/subscription-plans/:id", subscriptionPlanController.updateSubscriptionPlan);
// router.delete("/subscription-plans/:id", subscriptionPlanController.deleteSubscriptionPlan);

// module.exports = router;

const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionPlanController");

//CRUD
router.post("/subscription-plans", subscriptionController.createSubscription);
router.get("/subscription-plans", subscriptionController.getAllSubscriptions);
router.get("/subscription-plans/:id", subscriptionController.getSubscriptionById);
router.put("/subscription-plans/:id", subscriptionController.updateSubscription);
router.put("/subscription-plans/status/:id", subscriptionController.updateSubscriptionStatus);
router.delete("/subscription-plans/:id", subscriptionController.deleteSubscription);
//Status
router.get("/expiring-soon", subscriptionController.getSubscriptionsExpiringSoon);
router.get("/subscription-plans/expire-check", subscriptionController.runExpiryCheck);

// get aalowed modules
router.get("/subscription-plans/:id/modules",subscriptionController.getSubscriptionModules)
router.get("/modules",subscriptionController.getAllModules)

module.exports = router;