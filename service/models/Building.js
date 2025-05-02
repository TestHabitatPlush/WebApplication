// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");

// const Building = sequelize.define(
//   "building",
//   {
//     buildingId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//     buildingName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "building",
//     timestamps: true,
//   }
// );

// module.exports = Building;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer"); // Correctly imported Customer model

const Building = sequelize.define(
  "building",
  {
    buildingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer, // Correctly referencing the Customer model
        key: "customerId", // Referencing the primary key of Customer
      },
      allowNull: false,
    },
    buildingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "building",
    timestamps: true,
  }
);

// Define relationships
Customer.hasMany(Building, { foreignKey: "societyId" });
Building.belongsTo(Customer, { foreignKey: "societyId" });

module.exports = Building;
