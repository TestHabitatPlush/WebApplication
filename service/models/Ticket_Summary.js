const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const ref_ticket_status = require("./ref_ticket_status");
const ref_ticket_catagorisation = require("./ref_ticket_catagorisation");

const Ticket_Summery = sequelize.define(
  "Ticket_Summery",
  {
    ticket_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketCategorisationId: {
      type: DataTypes.INTEGER,
      references: {
        model: ref_ticket_catagorisation,
        key: "ticket_catagorisation_Id",
      },
      allowNull: false,
    },
    ticketPurpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customerId",
      },
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    ticket_description_max_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Ticket_Summery",
    timestamps: true,
  }
);

module.exports = Ticket_Summery;
