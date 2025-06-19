const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Role = require("./RoleModel");

const Notice = sequelize.define(
  "Notice",
  {
    noticeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customerId",
      },
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "roleId",
      },
      allowNull: true,
    },
    roleCategories: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    noticeHeading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noticeDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: true,
    },
    noticeExpireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Notice",
    timestamps: true, 
  }
);


module.exports = Notice;
