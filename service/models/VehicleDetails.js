const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Customer = require("./Customer");

const Vehicle = sequelize.define(
  "vehicle",
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
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
      validate: {
        len: [6, 12],
      },
    },
<<<<<<< HEAD
    // fastagNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     len: [8, 16],
    //     // isNumeric: true,
    //      isAlphanumeric: true,
    //   },
    // },
    fastagNumber: {
=======
  fastagNumber: {
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [12, 16],
        is: /^[A-Z0-9]+$/i, 
<<<<<<< HEAD
      },
    },
=======
      },
    },
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
 
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

Vehicle.belongsTo(Customer, { foreignKey: "societyId" });
Vehicle.belongsTo(User, { foreignKey: "userId" });

module.exports = Vehicle;
