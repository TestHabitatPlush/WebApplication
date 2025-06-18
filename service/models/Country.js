const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Country = sequelize.define(
  "country",
  {
    isoCode: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "country",
    timestamps: false,
  }
);

module.exports = Country;
