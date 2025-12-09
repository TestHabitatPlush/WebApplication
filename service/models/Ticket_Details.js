// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const User = require("./User");
// const ref_ticket_status = require("./ref_ticket_status");

// const Ticket_Details = sequelize.define(
//   "Ticket_Details",
//   {
//     ticket_details_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     ticket_desc_Id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0,
//     },

//     requestType: {
//       type: DataTypes.ENUM("Suggestion", "Complain", "Clarification"),
//       allowNull: false,
//     },

//     ticket_details_description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     ticket_attachment_details: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: false,
//     },
//     ticket_status_Id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: ref_ticket_status,
//         key: "ticket_status_Id",
//       },
//       defaultValue: 1,
//     },
//     assignedTo: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: true,
//     },
//     // ticket_status_Id: {
//     //   type: DataTypes.INTEGER,
//     //   references: {
//     //     model: ref_ticket_status,
//     //     key: "ticket_status_Id",
//     //   },
//     //   allowNull: false,
//     // },
//     Ticket_Desc_Update_User_ID: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: true,
//       defaultValue: null, // This will explicitly set it to null if not provided
//     },
//     ticket_Id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Ticket_Summery", // Use string to avoid circular dependency issues
//         key: "ticket_Id",
//       },
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "Ticket_Details",
//     timestamps: true,
//   }
// );

// module.exports = Ticket_Details;

<<<<<<< HEAD
=======

>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Ticket_Summary = require("./Ticket_Summary");
<<<<<<< HEAD
const ref_ticket_status = require("./ref_ticket_status");

const Ticket_Details = sequelize.define(
  "Ticket_Details",
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
        model: ref_ticket_status,
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
      references: { model: Ticket_Summary, key: "ticket_Id" },
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
=======
const RefTicketStatus = require("./ref_ticket_status");

const Ticket_Details = sequelize.define("Ticket_Details", {
  ticket_details_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
  },
  ticket_desc_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
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
    references: {
      model: User,
      key: "userId",
    },
    allowNull: false,
  },
  ticket_status_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: RefTicketStatus,
      key: "ticket_status_Id",
    },
    allowNull: false,
    defaultValue: 1,
  },
      requestType: {
      type: DataTypes.ENUM("Suggestion", "Complain", "Clarification"),
      allowNull: false,
    },

  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: true,
  },
  Ticket_Desc_Update_User_ID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: true,
    defaultValue: null,
  },
  ticket_Id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket_Summary,
      key: "ticket_Id",
    },
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
}, {
  tableName: "Ticket_Details",
  timestamps: true,
});

RefTicketStatus.hasMany(Ticket_Details, { foreignKey: "ticket_status_Id" });
Ticket_Details.belongsTo(RefTicketStatus, { foreignKey: "ticket_status_Id" });

Customer.hasMany(Ticket_Details, { foreignKey: "societyId" });
Ticket_Details.belongsTo(Customer, { foreignKey: "societyId" });

User.hasMany(Ticket_Details, { foreignKey: "userId" });
Ticket_Details.belongsTo(User, { foreignKey: "userId", as: "creator" });

User.hasMany(Ticket_Details, { foreignKey: "assignedTo" });
Ticket_Details.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });

User.hasMany(Ticket_Details, { foreignKey: "Ticket_Desc_Update_User_ID" });
Ticket_Details.belongsTo(User, { foreignKey: "Ticket_Desc_Update_User_ID", as: "updater" });

Ticket_Details.belongsTo(User, { as: "assignedUser", foreignKey: "assigned_to" });
Ticket_Details.belongsTo(User, { as: "updatedUser", foreignKey: "updated_by_user_id" });

module.exports = Ticket_Details;
