const SubscriptionPlan = require("../models/SubscriptionPlan");

const createSubscriptionPlan = async (data) => {
  return await SubscriptionPlan.create(data);
};

const getAllSubscriptionPlans = async () => {
  return await SubscriptionPlan.findAll();
};

const getSubscriptionPlanById = async (id) => {
  return await SubscriptionPlan.findByPk(id);
};

const updateSubscriptionPlan = async (id, data) => {
  const [updated] = await SubscriptionPlan.update(data, {
    where: { subscriptionId: id },
  });
  if (updated) {
    return await SubscriptionPlan.findByPk(id);
  }
  throw new Error("Subscription Plan not found");
};

const deleteSubscriptionPlan = async (id) => {
  const deleted = await SubscriptionPlan.destroy({
    where: { subscriptionId: id },
  });
  if (!deleted) {
    throw new Error("Subscription Plan not found");
  }
};

module.exports = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
};
