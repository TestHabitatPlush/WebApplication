
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Ticket_Purpose = require("./Ticket_Purpose");

const Ticket_Summary = sequelize.define(
  "Ticket_Summary",
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
        model: Ticket_Purpose,
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
    tableName: "Ticket_Summary",
    timestamps: true,
  }
);

module.exports = Ticket_Summary;
