require("./config/envConfig")();

const sequelize = require("./config/database");

// IMPORTANT: load all models
require("./models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync();
    console.log("DB synced successfully");

    process.exit(0);
  } catch (err) {
    console.error("DB sync failed:", err);
    process.exit(1);
  }
})();
