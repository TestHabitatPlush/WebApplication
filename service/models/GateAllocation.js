// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer"); 

// const GateAllocation = sequelize.define(
//   "GateAllocation",
//   {
//     allocationId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     profilePhoto: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     mobileNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     idProof: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     role: {
//       type: DataTypes.ENUM("SecurityGuard", "Supervisor", "FacilityManager"),
//       allowNull: false,
//     },
//     // societyId: {
//       // type: DataTypes.INTEGER,
//       // allowNull: false,
//       // validate: {
//         // notEmpty: true,
//       // },
//     // },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer, // Correctly referencing the Customer model
//         key: "customerId", // Referencing the primary key of Customer
//       },
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "gate_allocations",
//     timestamps: true,
//   }
// );

// module.exports = GateAllocation;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Database connection file
const Customer = require('./Customer');
const Gate = require('./Gate');
const JobProfile = require('./JobProfile');

const GateAllocation = sequelize.define('GateAllocation', {
    gateAllocationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    societyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: "customerId",
        },
        allowNull: false,
    },
    gateId: {
        type: DataTypes.INTEGER,
        references: {
            model: Gate,
            key: "gateId",
        },
        allowNull: false,
    },
    profileId: {
        type: DataTypes.INTEGER,
        references: {
            model: JobProfile,
            key: "profileId",
        },
        allowNull: false,
    }
}, {
    tableName: 'GateAllocations',
    timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// Relationships
Customer.hasMany(GateAllocation, { foreignKey: "societyId" });
GateAllocation.belongsTo(Customer, { foreignKey: "societyId" });

Gate.hasMany(GateAllocation, { foreignKey: "gateId" });
GateAllocation.belongsTo(Gate, { foreignKey: "gateId" });

JobProfile.hasMany(GateAllocation, { foreignKey: "profileId" });
GateAllocation.belongsTo(JobProfile, { foreignKey: "profileId" });

module.exports = GateAllocation;

