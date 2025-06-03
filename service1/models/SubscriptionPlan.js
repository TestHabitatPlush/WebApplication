const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubscriptionPlan = sequelize.define(
  "SubscriptionPlan",
  {
    subscriptionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "subscriptionPlans",
  }
);

module.exports = SubscriptionPlan;
