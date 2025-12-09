
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Software_Ticket_Purpose = require("./Software_Ticket_Purpose");

const Software_Ticket_Summary = sequelize.define(
  "Software_Ticket_Summary",
  {
    ticket_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    request_type: {
      type: DataTypes.ENUM("suggestion", "complaint", "clarification"),
      allowNull: false,
      defaultValue: "suggestion",
    },
    ticket_purpose_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Software_Ticket_Purpose,
        key: "ticket_purpose_Id",
      },
    },
    ticket_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket_attachment_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "customerId",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    tableName: "Software_Ticket_Summary",
    timestamps: true,
  }
);

module.exports = Software_Ticket_Summary;