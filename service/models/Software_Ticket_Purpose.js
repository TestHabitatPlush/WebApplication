
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");

const Software_Ticket_Purpose = sequelize.define(
  "Software_Ticket_Purpose",
  {
    ticket_purpose_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purpose_Details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
   
    societyId: {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: "customerId" },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "userId" },
      allowNull: false,
    },
  },
  {
    tableName: "Software_Ticket_Purpose",
    timestamps: true,
  }
);




module.exports = Software_Ticket_Purpose;
