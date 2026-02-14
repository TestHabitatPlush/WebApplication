// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const ref_ticket_status = sequelize.define(
//   "ref_ticket_status",
//   {
//     ticket_status_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     ticket_status_description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "ref_ticket_status",
//     timestamps: false, // Disable default timestamps if you're not using them
//   }
// );

// module.exports = ref_ticket_status;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ref_ticket_status = sequelize.define("ref_ticket_status", {
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
  tableName: "ref_ticket_status",
  timestamps: true,
});



module.exports = ref_ticket_status;
