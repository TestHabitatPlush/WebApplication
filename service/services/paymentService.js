const rezorpay = require("..//utils/razorpay");

const createRezorpayPlan = async ({ planName, price, billingCycle }) => {
    const intervalMap ={
        Monthly: 1,
        Quarterly: 3,
        Yearly: 12,
        "Half-Yearly": 6,
        Custom: 1 // Default to 1 for custom plans
    };

    const plan = await rezorpay.plans.create({
        period :"monthly",
        interval: intervalMap[billingCycle] || 1,
        item: {
            name: planName,
            amount: price * 100, // Convert to paise
            currency: "INR",
            description: `Subscription plan for ${planName}`,
        },
    });

    return plan;
}