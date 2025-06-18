const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Country = require("./Country");

const State = sequelize.define(
  "state",
  {
    StateId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    countryIsoCode: {
      type: DataTypes.STRING,
      references: {
        model: Country,
        key: "isoCode",
      },
      allowNull: false,
    },
    isoCode: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "state",
    timestamps: false,
  }
);

module.exports = State;
