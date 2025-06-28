const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SubscriptionPlan = require("./SubscriptionPlan");
const Address = require("./Address");
// 
const Customer = sequelize.define(
  "Customer",
  {
    customerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    societyType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    establishedYear: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Address,
        key: "addressId",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubscriptionPlan,
        key: "subscriptionId",
      },
    },
    builderName :{
      type:DataTypes.STRING,
      allowNull:true,
    },
    builderSocialLink :{
      type:DataTypes.STRING,
      allowNull:true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive","pending"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  
  {
    tableName: "customers",
  }
);
// 
module.exports = Customer;