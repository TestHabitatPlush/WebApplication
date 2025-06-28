const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const visitorRelationship = require("./visitorRelationship");

const Visitor_new_visitentry = sequelize.define(
  "Visitor_new_visitentry",
  {
    visit_entry_Id: {
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
    visit_expect_date_of_entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    visit_type_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: visitorRelationship,
        key: "Visit_relation_Id",
      },
    },
    visit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visit_mobileno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Visit_relation_Id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: visitorRelationship,
        key: "Visit_relation_Id",
      },
    },
    visit_porpous: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relationship:{
      type: DataTypes.STRING,
     allowNull: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visit_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "created", 
    },
    qrCodeImage: {
      type: DataTypes.BLOB("long"), 
      allowNull: true, 
    },
    isQRCodeValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicates if the QR code is still valid
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Visitor_new_visitentry",
    timestamps: true,
  }
);

module.exports = Visitor_new_visitentry;
