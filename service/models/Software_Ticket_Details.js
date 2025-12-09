
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Software_Ticket_Summary = require("./Software_Ticket_Summary");
const Software_Ref_Ticket_Status = require("./Software_Ref_Ticket_Status");

const Software_Ticket_Details  = sequelize.define(
  "Software_Ticket_Details",
  {
    ticket_details_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_details_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket_attachment_details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "userId" },
    },
    ticket_status_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Software_Ref_Ticket_Status,
        key: "ticket_status_Id",
      },
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: User, key: "userId" },
    },
    updated_by_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: User, key: "userId" },
    },
    ticket_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model:Software_Ticket_Summary, key: "ticket_Id" },
    },
    societyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Customer, key: "customerId" },
    },
    ticket_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Software_Ticket_Details",
    timestamps: true,
  }
);

Software_Ticket_Details .belongsTo(User, { as: "assignedUser", foreignKey: "assigned_to" });
Software_Ticket_Details .belongsTo(User, { as: "updatedUser", foreignKey: "updated_by_user_id" });

module.exports = Software_Ticket_Details;
