const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const State = require("./State");

const City = sequelize.define(
  "city",
  {
    cityId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    stateIsoCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryIsoCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "city",
    timestamps: false,
  }
);

module.exports = City;
