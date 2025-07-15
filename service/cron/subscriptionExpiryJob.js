const cron = require("node-cron");
const subscriptionService = require("../services/subscriptionPlanService");

cron.schedule("0 0 * * *",async() => {
  console.log(`[${new Date().toISOString()}] Running daily subscription expiration check`);
  try {
    const expiredCount = await subscriptionService.expireSubscriptions();
    console.log(`Marked ${expiredCount} subscriptions as expired`);
  } catch (err){
    console.error("Error running expired job:", err);
  }
})