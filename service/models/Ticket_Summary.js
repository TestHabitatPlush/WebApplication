<<<<<<< HEAD
=======

>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
<<<<<<< HEAD
const ref_ticket_status = require("./ref_ticket_status");
const ref_ticket_catagorisation = require("./ref_ticket_catagorisation");

const Ticket_Summery = sequelize.define(
  "Ticket_Summery",
=======
const Ticket_Purpose = require("./Ticket_Purpose");

const Ticket_Summary = sequelize.define(
  "Ticket_Summary",
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  {
    ticket_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
<<<<<<< HEAD
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
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
      references: {
        model: Customer,
        key: "customerId",
      },
<<<<<<< HEAD
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
=======
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
      references: {
        model: User,
        key: "userId",
      },
<<<<<<< HEAD
      allowNull: false,
    },
    ticket_description_max_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Ticket_Summery",
=======
    },
  },
  {
    tableName: "Ticket_Summary",
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = Ticket_Summery;
=======
module.exports = Ticket_Summary;
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
