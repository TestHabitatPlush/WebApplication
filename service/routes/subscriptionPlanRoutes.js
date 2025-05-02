const express = require("express");
const router = express.Router();
const subscriptionPlanController = require("../controllers/subscriptionPlanController");

router.post(
  "/subscription-plans",
  subscriptionPlanController.createSubscriptionPlan
);
router.get(
  "/subscription-plans",
  subscriptionPlanController.getAllSubscriptionPlans
);
router.get(
  "/subscription-plans/:id",
  subscriptionPlanController.getSubscriptionPlanById
);
router.put(
  "/subscription-plans/:id",
  subscriptionPlanController.updateSubscriptionPlan
);
router.delete(
  "/subscription-plans/:id",
  subscriptionPlanController.deleteSubscriptionPlan
);

module.exports = router;
