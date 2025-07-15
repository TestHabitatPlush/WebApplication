const SubscriptionPlan = require("../models/SubscriptionPlan");
const { Op } = require("sequelize");

const determineStatus = (startDate, endDate) => {
  const now = new Date();
  if (now < new Date(startDate)) return "pending";
  if (now > new Date(endDate)) return "expired";
  return "active";
};


const computeFinalPrice = (price, discountPercentage) => {
  return (price - (price * discountPercentage / 100)).toFixed(2);
};

const createSubscription = async (data) => {
   data.status = determineStatus(data.startDate, data.endDate);
  data.finalPrice = computeFinalPrice(data.price, data.discountPercentage);
  return await SubscriptionPlan.create(data);
};

const getAllSubscriptions = async () => {
  return await SubscriptionPlan.findAll();
};

const getSubscriptionById = async (id) => {
  return await SubscriptionPlan.findByPk(id);
};

const updateSubscription = async (id, data) => {
  const subscription = await SubscriptionPlan.findByPk(id);
  if (!subscription) return null;

  if (data.startDate && data.endDate) {
    data.status = determineStatus(data.startDate, data.endDate);
  }

  if (data.price !== undefined || data.discountPercentage !== undefined) {
    // fallback to existing values if not provided
    const price = data.price ?? subscription.price;
    const discount = data.discountPercentage ?? subscription.discountPercentage;
    data.finalPrice = computeFinalPrice(price, discount);
  }

  await subscription.update(data);
  return subscription;
};

const deleteSubscription = async (id) => {
  return await SubscriptionPlan.destroy({
    where: { subscriptionId: parseInt(id) }
  });
};

const getSubscriptionsExpiringSoon = async () => {
  const now = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(now.getDate() + 10);

  return await SubscriptionPlan.findAll({
    where: {
      endDate: {
        [Op.between]: [now, tenDaysLater],
      },
      status: "active",
    },
  });
};

const expireSubscriptions = async () =>{
  const now = new Date();
  const expiredSubscriptions = await SubscriptionPlan.findAll({
    where: {
      endDate:{ [Op.lt]: now },
      status: {[Op.not]: "expired"},
    }
  });

  for (const sub of expiredSubscriptions){
    sub.status = "expired";
    await sub.save();
  }

  return expiredSubscriptions.length;

}

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getSubscriptionsExpiringSoon,
  expireSubscriptions,
};
