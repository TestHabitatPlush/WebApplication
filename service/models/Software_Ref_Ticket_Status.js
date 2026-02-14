
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Software_Ref_Ticket_Status = sequelize.define("software_ref_ticket_status", {
  ticket_status_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticket_status_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "software_Ref_Ticket_Status",
  timestamps: true,
});



module.exports = Software_Ref_Ticket_Status;
