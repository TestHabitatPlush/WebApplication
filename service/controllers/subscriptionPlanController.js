// const SubscriptionPlan = require("../models/SubscriptionPlan");
const { SubscriptionPlan, Customer, User } = require("../models") // ensure both models are imported
const { Module } = require("../models/Module")
const sequelize = require("../config/database");
// const Customer = require("../models/Customer");
const { Op } = require("sequelize");
const { determineStatus, computeFinalPrice, computeEndDate } = require("../services/subscriptionPlanService");

// CREATE
const createSubscription = async (req, res) => {
  try {
    const {
      planName,
      billingCycle,
      startDate,
      endDate: userEndDate,
      price = 0,
      discountPercentage = 0,
    } = req.body;

    if(!startDate) {
      return res.status(400).json({ error: "Start date is required" });
    }
    let endDate = userEndDate;
    if(billingCycle !== "custom") {
      endDate = computeEndDate(startDate, billingCycle);
    } else if (!userEndDate) {
      return res.status(400).json({ error: "End date is required for custom billing cycle" });
    }

    const finalPrice = computeFinalPrice(price, discountPercentage);
    const status = determineStatus(startDate, endDate);

    const subscription = await SubscriptionPlan.create({
     planName,
      billingCycle,
      startDate,
      endDate,
      price,
      discountPercentage,
      finalPrice,
      status,
    });

    res.status(201).json({ message: "Subscription created", subscription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await SubscriptionPlan.findAll();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET BY ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await SubscriptionPlan.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE
const updateSubscription = async (req, res) => {
  try {
    const subscription = await SubscriptionPlan.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    let {
      planName,
      billingCycle,
      price,
      discountPercentage,
      startDate,
      endDate,
      status
    } = req.body;

    planName = planName ?? subscription.planName;
    billingCycle = billingCycle ?? subscription.billingCycle;
    price  = price ?? subscription.price;
    discountPercentage = discountPercentage ?? subscription.discountPercentage;
    startDate = startDate ?? subscription.startDate;

    if (billingCycle !== "custom" && !endDate) {
      endDate = computeEndDate(startDate, billingCycle);
    } else {
      endDate = endDate ?? subscription.enddate;
    }

    let finalPrice = computeFinalPrice(price, discountPercentage);
    // let status = determineStatus(startDate, endDate);

    // if (price !== undefined || discountPercentage !== undefined) {
    //   const p = price !== undefined ? price : subscription.price;
    //   const d = discountPercentage !== undefined ? discountPercentage : subscription.discountPercentage;
    //   finalPrice = computeFinalPrice(p, d);
    // }

    // if (startDate !== undefined || endDate !== undefined) {
    //   const s = startDate !== undefined ? startDate : subscription.startDate;
    //   const e = endDate !== undefined ? endDate : subscription.endDate;
    //   status = determineStatus(s, e);
    // }

    await subscription.update({
      planName,
      billingCycle,
      price,
      discountPercentage,
      startDate,
      endDate,
      finalPrice,
      status,
    });

    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//update Subscription Status

const updateSubscriptionStatus = async (req, res) => {
  const { status } = req.body;
  const subscriptionId = req.params.id;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  const t = await sequelize.transaction();
  try {
    // 1. Update Subscription status
    const [updatedSubscription] = await SubscriptionPlan.update(
      { status },
      { where: { subscriptionId }, transaction: t }
    );

    // 2. Find affected customers
    const customers = await Customer.findAll({
      where: { subscriptionId },
      transaction: t,
    });

    const customerIds = customers.map((c) => c.customerId);

    // 3. Update Customer status
    await Customer.update(
      { status },
      {
        where: { subscriptionId },
        transaction: t,
      }
    );

    // 4. Update User status where societyId = affected customerIds
    await User.update(
      { status },
      {
        where: {
          societyId: customerIds,
        },
        transaction: t,
      }
    );

    await t.commit();
    return res.status(200).json({
      message: "Subscription plan and related customer/user statuses updated successfully",
      data: { subscriptionId, status },
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

// DELETE
const deleteSubscription = async (req, res) => {
  try {
    const deleted = await SubscriptionPlan.destroy({ where: { subscriptionId: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: "Subscription not found" });
    }
    res.status(200).json({ message: `Subscription with id ${req.params.id} deleted successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// EXPIRING SOON
const getSubscriptionsExpiringSoon = async (req, res) => {
  try {
    const now = new Date();
    const next7Days = new Date();
    next7Days.setDate(now.getDate() + 7);

    const subscriptions = await SubscriptionPlan.findAll({
      where: {
        endDate: {
          [Op.between]: [now, next7Days],
        },
        status: "active",
      },
    });

    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// EXPIRE CHECK (for CRON/manual)
const runExpiryCheck = async (req, res) => {
  try {
    const now = new Date();
    const [count] = await SubscriptionPlan.update(
      { status: "expired" },
      {
        where: {
          endDate: { [Op.lt]: now },
          status: "active",
        },
      }
    );

    res.status(200).json({ message: `Marked ${count} subscriptions as expired.` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSubscriptionModules = async (req,res) =>{
  try{
    const subscription = await SubscriptionPlan.findByPk(req.params.id,{
      include: {
        model:Module, through:{
          attributes:[],
          // through: { attributes: [] }
        }
      }
    });
    if (!subscription) return res.status(404).json({
      error:"Subscription not found"
    });
    res.status(200).json({
      plan:subscription.planName,
      modules:subscription.Modules.map(m => m.moduleName)
    });
  } catch (err){
    res.status(500).json({
      error:err.message
    });
  }
}

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  updateSubscriptionStatus,
  deleteSubscription,
  getSubscriptionsExpiringSoon,
  runExpiryCheck,
  getSubscriptionModules,
};
