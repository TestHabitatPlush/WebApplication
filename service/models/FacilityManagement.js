const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer"); // Ensure this model exists

const Facility = sequelize.define(
  "Facility",
  {
    facilityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer, 
        key: "customerId", 
      },
      onDelete: "CASCADE", 
    },
    facilityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facilityType: {
      type: DataTypes.ENUM("PublicUsage", "PrivateUsage"),
      allowNull: false,
    },
    facilityUsage: {
      type: DataTypes.ENUM("Hourly", "Daily"),
      allowNull: false,
    },
    facilityCharge: {
      type: DataTypes.ENUM("Free", "Paid"),
      allowNull: false,
    },
    chargeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    bookingFrom: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    bookingTo: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "facility_management",
    timestamps: true,
  }
);

// *Associations*
Facility.belongsTo(Customer, { foreignKey: "societyId", as: "society" });
Customer.hasMany(Facility, { foreignKey: "societyId", as: "facilities" });

module.exports = Facility;