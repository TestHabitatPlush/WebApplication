const cron = require("node-cron");
const subscriptionService = require("../services/subscriptionPlanService");

cron.schedule("0 0 * * *", async () => {
  try {
    const count = await subscriptionService.expireSubscriptions();
    console.log(`✅ Cron Job: Marked ${count} subscriptions as expired.`);
  } catch (err) {
    console.error("❌ Cron Job Error:", err.message);
  }
});
