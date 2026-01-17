const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Customer = require("./Customer");
const Unit = require("./Unit");

const Vehicle  = sequelize.define(
  "Vehicle",
  {
    vehicleId: {
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: true,
    },
    unitId: {
      type: DataTypes.INTEGER,
      references: {
        model: Unit,
        key: "unitId",
      },
      allowNull: true,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [6, 12],
      },
    },
    fastagNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [12, 16],
<<<<<<< HEAD:service/models/Vehicle.js
        is: /^[A-Z0-9]+$/i,
=======
        is: /^[A-Z0-9]+$/i, 
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6:service/models/VehicleDetails.js
      },
    },
    vehicleType: {
      type: DataTypes.ENUM("Car", "Bike", "Truck", "Van", "Bus"),
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerContact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]{10}$/,
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "vehicle",
    timestamps: true,
  }
);

Vehicle.belongsTo(Customer, { foreignKey: "societyId", as: "society" });
Vehicle.belongsTo(User, { foreignKey: "userId", as: "user" });
Vehicle.belongsTo(Unit, { foreignKey: "unitId", as: "unit" });

module.exports = Vehicle ;