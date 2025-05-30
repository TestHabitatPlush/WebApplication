const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
 const Building = require("./Building");

const UnitType = sequelize.define(
  "unitType",
  {
    unitTypeId: {
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
    unitTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "unitType",
    timestamps: true,
  }
);

module.exports = UnitType;
