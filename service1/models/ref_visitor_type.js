const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ref_visitor_type = sequelize.define(
  "ref_visitor_type",
  {
    visit_type_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    visit_type_Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ref_visitor_type",
    timestamps: true, // Disable default timestamps if you're using custom ones
  }
);

module.exports = ref_visitor_type;
