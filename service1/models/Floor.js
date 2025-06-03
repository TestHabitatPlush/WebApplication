const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const Building = require("./Building");

const Floor = sequelize.define(
  "floor",
  {
    floorId: {
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
      allowNull: false,
    },
    buildingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Building,
        key: "buildingId",
      },
      allowNull: true,
    },
    floorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortForm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "floor",
    timestamps: true,
  }
);

module.exports = Floor;
