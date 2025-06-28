const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ref_ticket_catagorisation = sequelize.define(
  "ref_ticket_catagorisation",
  {
    ticket_catagorisation_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_catagorisation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ref_ticket_catagorisation",
    timestamps: true, // Disable default timestamps if you're using custom ones
  }
);

module.exports = ref_ticket_catagorisation;
