const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SubscriptionPlan = require("./SubscriptionPlan");
const Module = require("./Module");

const SubcriptionModule = sequelize.define("SubscriptionModule", {
  SubscriptionModuleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subscriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SubscriptionPlan,
      key: "subscriptionId",
    },
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Module,
      key: "moduleId",
    },
  },
}, {
  tableName: "SubcriptionModules",
  timestamps: false,
});

// Associations
SubscriptionPlan.belongsToMany(Module, {
  through: SubcriptionModule,
  foreignKey: "subscriptionId",
});
Module.belongsToMany(SubscriptionPlan, {
  through: SubcriptionModule,
  foreignKey: "moduleId",
});

module.exports = SubcriptionModule;
