const sequelize = require("../config/database");
const Module = require("../models/Module");
const SubscriptionPlan = require("../models/SubscriptionPlan");
require("../models/SubscriptionModule");  // 👈 import to activate associations

async function seedModules() {
  try {
    await sequelize.sync({ force: false });

    const modules = [
      "users",
      "notice",
      "gate",
      "document",
      "emergency_contact",
      "vehicle",
      "visitor_new_visitentry"
    ];

    // create or fetch modules
    const moduleInstances = await Promise.all(
      modules.map(name =>
        Module.findOrCreate({
          where: { moduleName: name },
          defaults: { moduleName: name }
        })
      )
    );

    // create or fetch plans
    const [silver] = await SubscriptionPlan.findOrCreate({
      where: { planName: "Silver" },
      defaults: { planName: "Silver", billingCycle: "monthly" }
    });

    const [gold] = await SubscriptionPlan.findOrCreate({
      where: { planName: "Gold" },
      defaults: { planName: "Gold", billingCycle: "monthly" }
    });

    const [platinum] = await SubscriptionPlan.findOrCreate({
      where: { planName: "Platinum" },
      defaults: { planName: "Platinum", billingCycle: "monthly" }
    });

    // link modules to plans
    await silver.setModules(moduleInstances.slice(0, 3).map(m => m[0]));
    // first 3 modules
    await gold.setModules(moduleInstances.slice(0, 5).map(m => m[0]));
    // first 5 modules
    await platinum.setModules(moduleInstances.map(m => m[0]));
    // all modules

    console.log("Modules seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(" Error seeding:", err);
    process.exit(1);
  }
}

seedModules();
