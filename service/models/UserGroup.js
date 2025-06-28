const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserGroup = sequelize.define(
  "UserGroup",
  {
    userGroupId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userGroupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "userGroup",
    timestamps: false, 
  }
);

module.exports = UserGroup;
