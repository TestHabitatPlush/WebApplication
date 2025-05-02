// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Building = require("./Building");
// const Floor = require("./Floor");
// const UnitType = require("./UnitType");
// const Customer = require("./Customer");

// const Unit = sequelize.define(
//   "unit",
//   {
//     unitId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     unitName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     unitNumber: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     // societyId: {
//       // type: DataTypes.INTEGER,
//       // references: {
//         // model: Floor,
//         // key: "floorId",
//       // },
//       // allowNull: false,
//     // },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//     buildingId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Building,
//         key: "buildingId",
//       },
//       allowNull: false,
//     },
//     floorId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Floor,
//         key: "floorId",
//       },
//       allowNull: false,
//     },
//     unitTypeId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: UnitType,
//         key: "unitTypeId",
//       },
//       allowNull: false,
//     },
//     unitsize: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "unit",
//     timestamps: true,
//   }
// );

// // Unit Model (Unit.js)

// // Unit.belongsTo(Floor, { foreignKey: "floorId" });  // Floor should be an object
// // Unit.belongsTo(UnitType, { foreignKey: "unitTypeId" }); // UnitType should be an object
// // 

// Unit.belongsTo(Customer, { foreignKey:"customerId" }); // Customer should be an object
// Unit.belongsTo(UnitType, { foreignKey:"unitTypeId" }); // Unit
// module.exports = Unit;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Building = require("./Building");
const Floor = require("./Floor");
const UnitType = require("./UnitType");
const Customer = require("./Customer");

const Unit = sequelize.define(
  "unit",
  {
    unitId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitNumber: {
      type: DataTypes.INTEGER,
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
    buildingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Building,
        key: "buildingId",
      },
      allowNull: false,
    },
    floorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Floor,
        key: "floorId",
      },
      allowNull: false,
    },
    unitTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: UnitType,
        key: "unitTypeId",
      },
      allowNull: false,
    },
    unitsize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "unit",
    timestamps: true,
  }
);

// Define associations
Unit.belongsTo(Customer, { foreignKey: "societyId" });
Unit.belongsTo(Building, { foreignKey: "buildingId" });
Unit.belongsTo(Floor, { foreignKey: "floorId" });
Unit.belongsTo(UnitType, { foreignKey: "unitTypeId" });

module.exports = Unit;

