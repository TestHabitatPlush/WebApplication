// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const Module = sequelize.define("Module", {
//   moduleId: { 
//     type: DataTypes.INTEGER, 
//     autoIncrement: true,
//      primaryKey: true },
//   moduleName: { 
//     type: DataTypes.STRING, 
//     allowNull: false, 
//     unique: true }
// }, {
//   tableName: "Modules",
//   timestamps: false,
// });

// module.exports = Module;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Module = sequelize.define("Module", {
  moduleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  moduleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Modules",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["moduleName"],
    },
  ],
});

module.exports = Module;
