const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserAdminAccess = sequelize.define(
  "UserAdminAccess",
  {
    adminAccessId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    societyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessType: {
      type: DataTypes.STRING, // society_admin / committee
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    tableName: "user_admin_access",
    timestamps: true,
  }
);

module.exports = UserAdminAccess;
