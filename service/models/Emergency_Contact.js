const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");

const Emergency_Contact = sequelize.define(
  "Emergency_Contact",
  {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customerId",
      },
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    econtactNo1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    econtactNo2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emergencyContactType: {
      type: DataTypes.ENUM("hospital", "police", "fire", "ambulance", "others"),
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "Emergency_Contact",
    timestamps: true,
  }
);

module.exports = Emergency_Contact;

