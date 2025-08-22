const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ref_ticket_categorisation = sequelize.define(
  "ref_ticket_categorisation",
  {
    ticket_categorisation_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticket_categorisation_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ref_ticket_categorisation",
    timestamps: true, 
  }
);


module.exports = ref_ticket_categorisation;
