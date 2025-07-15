const subscriptionService = require("../services/subscriptionPlanService");

const createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json({ message: "Subscription created", subscription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.updateSubscription(req.params.id, req.body);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const deletedCount = await subscriptionService.deleteSubscription(req.params.id);
    if (!deletedCount) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json({
      message: `Subscription with id ${req.params.id} deleted successfully`
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSubscriptionsExpiringSoon = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptionsExpiringSoon();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const runExpiryCheck = async (req, res) => {
  try {
    const count = await subscriptionService.expireSubscriptions();
    res.status(200).json({ message: `Marked ${count} subscriptions as expired.` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getSubscriptionsExpiringSoon,
  runExpiryCheck,

};
