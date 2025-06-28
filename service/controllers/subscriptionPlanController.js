const subscriptionPlanService = require("../services/subscriptionPlanService");

const createSubscriptionPlan = async (req, res) => {
  try {
    const plan = await subscriptionPlanService.createSubscriptionPlan(req.body);
    res
      .status(201)
      .json({ message: "Subscription created successfully", plan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await subscriptionPlanService.getAllSubscriptionPlans();
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSubscriptionPlanById = async (req, res) => {
  try {
    const plan = await subscriptionPlanService.getSubscriptionPlanById(
      req.params.id
    );
    if (plan) {
      res.status(200).json(plan);
    } else {
      res.status(404).json({ error: "Subscription Plan not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateSubscriptionPlan = async (req, res) => {
  try {
    const plan = await subscriptionPlanService.updateSubscriptionPlan(
      req.params.id,
      req.body
    );
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSubscriptionPlan = async (req, res) => {
  try {
    await subscriptionPlanService.deleteSubscriptionPlan(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
};
