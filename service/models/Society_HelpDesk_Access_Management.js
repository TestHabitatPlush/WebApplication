

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

Society_HelpDesk_Access_Management.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Society_HelpDesk_Access_Management, {
  foreignKey: "userId",
});


module.exports = Society_HelpDesk_Access_Management;


