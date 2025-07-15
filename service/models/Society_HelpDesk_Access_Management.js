// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const User = require("./User");

// const Society_HelpDesk_Access_Management = sequelize.define(
//   "Society_HelpDesk_Access_Management",
//   {
//     Socity_HelpDesk_Access_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
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
//     module_Access: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Update_User_Id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true,
//     tableName: "Society_HelpDesk_Access_Management",
//   }
// );

// module.exports = Society_HelpDesk_Access_Management;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");

const Society_HelpDesk_Access_Management = sequelize.define(
  "Society_HelpDesk_Access_Management",
  {
    Socity_HelpDesk_Access_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    module_Access: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Update_User_Id: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "userId" },
      allowNull: false,
    },
  },
  {
    tableName: "Society_HelpDesk_Access_Management",
    timestamps: true,
  }
);

Customer.hasMany(Society_HelpDesk_Access_Management, { foreignKey: "societyId" });
Society_HelpDesk_Access_Management.belongsTo(Customer, { foreignKey: "societyId" });

User.hasMany(Society_HelpDesk_Access_Management, {
  foreignKey: "userId",
  as: "accessUser",
});
Society_HelpDesk_Access_Management.belongsTo(User, {
  foreignKey: "userId",
  as: "accessUser",
});

User.hasMany(Society_HelpDesk_Access_Management, {
  foreignKey: "Update_User_Id",
  as: "updatedBy",
});
Society_HelpDesk_Access_Management.belongsTo(User, {
  foreignKey: "Update_User_Id",
  as: "updatedBy",
});

module.exports = Society_HelpDesk_Access_Management;
