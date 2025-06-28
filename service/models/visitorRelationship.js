const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Customer = require("./Customer");

const visitorRelationship = sequelize.define(
  "visitorRelationship",
  {
    Visit_relation_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Visit_relation_Description: {  // visitor category
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customerId",
      },
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "visitorRelationship",
    timestamps: true, // Disable default timestamps if you're using custom ones
  }
);

module.exports = visitorRelationship;
