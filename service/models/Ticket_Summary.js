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
const RefTicketCategorisation = require("./ref_ticket_catagorisation");

const Ticket_Summary = sequelize.define("Ticket_Summary", {
  ticket_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticket_categorisation_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: RefTicketCategorisation,
      key: "ticket_categorisation_Id",
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
}, {
  tableName: "Ticket_Summary",
  timestamps: true,
});

RefTicketCategorisation.hasMany(Ticket_Summary, {
  foreignKey: "ticket_categorisation_Id",
});
Ticket_Summary.belongsTo(RefTicketCategorisation, {
  foreignKey: "ticket_categorisation_Id",
});

Customer.hasMany(Ticket_Summary, { foreignKey: "societyId" });
Ticket_Summary.belongsTo(Customer, { foreignKey: "societyId" });

User.hasMany(Ticket_Summary, { foreignKey: "userId" });
Ticket_Summary.belongsTo(User, { foreignKey: "userId" });

module.exports = Ticket_Summary;
