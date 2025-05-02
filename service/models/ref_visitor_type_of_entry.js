const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ref_visitor_type_of_entry = sequelize.define(
  "ref_visitor_type_of_entry",
  {
    type_of_entry_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    entry_Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ref_visitor_type_of_entry",
    timestamps: true, // Disable default timestamps if you're using custom ones
  }
);

module.exports = ref_visitor_type_of_entry;
