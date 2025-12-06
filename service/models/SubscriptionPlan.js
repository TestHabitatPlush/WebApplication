const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubscriptionPlan = sequelize.define("SubscriptionPlan", {
  subscriptionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  planName: {
    type: DataTypes.ENUM("Silver", "Gold", "Platinum", "Custom"),
    allowNull: false,
  },
  billingCycle: {
    type: DataTypes.ENUM("monthly", "quarterly", "yearly", "half-yearly", "custom"),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0,
    },
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  finalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "active", "expired"),
    allowNull: false,
    defaultValue: "active",
  },
}, {
  tableName: "SubscriptionPlans",
  timestamps: true,
});

module.exports = SubscriptionPlan;