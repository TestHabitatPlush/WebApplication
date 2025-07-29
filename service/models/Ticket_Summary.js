// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const User = require("./User");
// const ref_ticket_status = require("./ref_ticket_status");
// const ref_ticket_catagorisation = require("./ref_ticket_catagorisation");

// const Ticket_Summary = sequelize.define(
//   "Ticket_Summary",
//   {
//     ticket_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     ticketCategorisationId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: ref_ticket_catagorisation,
//         key: "ticket_catagorisation_Id",
//       },
//       allowNull: false,
//     },
//     ticketPurpose: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     ticketTitle: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },

//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: false,
//     },
//     ticket_description_max_Id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "Ticket_Summary",
//     timestamps: true,
//   }
// );

// module.exports = Ticket_Summary;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Ticket_Purpose = require("./Ticket_Purpose");
const ref_ticket_categorisation = require("./ref_ticket_catagorisation");

const Ticket_Summary = sequelize.define(
  "Ticket_Summary",
  {
    ticket_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_categorisation_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ref_ticket_categorisation,
        key: "ticket_categorisation_Id",
      },
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
    ticket_description_max_Id: {
      type: DataTypes.INTEGER,
      allowNull: true,
   
    },
  },
  {
    tableName: "Ticket_Summary",
    timestamps: true,
  }
);



module.exports = Ticket_Summary;
