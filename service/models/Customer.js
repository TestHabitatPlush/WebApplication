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
    }
  },
  {
    tableName: "customers",
  }
);
// 
module.exports = Customer;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const SubscriptionPlan = require("./SubscriptionPlan");
// const Address = require("./Address");
// 
// const Customer = sequelize.define(
  // "Customer",
  // {
    // customerId: {
      // type: DataTypes.INTEGER,
      // autoIncrement: true,
      // primaryKey: true,
    // },
    // customerName: {
      // type: DataTypes.STRING,
      // allowNull: false,
    // },
    // customerType: {
      // type: DataTypes.STRING,
      // allowNull: false,
    // },
    // societyType: {
      // type: DataTypes.STRING,
      // allowNull: true,
    // },
    // establishedYear: {
      // type: DataTypes.STRING,
      // allowNull: true,
    // },
    // addressId: {
      // type: DataTypes.INTEGER,
      // allowNull: false,
      // references: {
        // model: Address,
        // key: "addressId", // Ensure Address model has this field
      // },
    // },
    // phone: {
      // type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
        // isNumeric: true, // Ensures phone contains only numbers
        // len: [10, 15], // Minimum and maximum length for phone numbers
      // },
    // },
    // email: {
      // type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
        // isEmail: true, // Ensures valid email format
      // },
    // },
    // subscriptionId: {
      // type: DataTypes.INTEGER,
      // allowNull: false,
      // references: {
        // model: SubscriptionPlan,
        // key: "subscriptionId", // Ensure SubscriptionPlan model has this field
      // },
    // },
    // builderName: {
      // type: DataTypes.STRING,
      // allowNull: true,
    // },
    // builderSocialLink: {
      // type: DataTypes.STRING,
      // allowNull: true,
      // validate: {
        // isUrl: true, // Ensures valid URL format if provided
      // },
    // },
  // },
  // {
    // tableName: "customers",
  // }
// );
// 
// module.exports = Customer;
// 