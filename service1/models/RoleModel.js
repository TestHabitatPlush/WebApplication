// models/role.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const UserGroup = require("./UserGroup");

const Role = sequelize.define(
  "Role",
  {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userGroupId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserGroup,
        key: "userGroupId",
      },
      allowNull: true,
    },
    roleCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupancyStatus: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "roles",
  }
);

module.exports = Role;
