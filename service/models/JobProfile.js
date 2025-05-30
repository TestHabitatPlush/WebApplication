const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Customer = require('./Customer');
const Role = require("./RoleModel");
const bcrypt = require('bcrypt');

const JobProfile = sequelize.define('JobProfile', {
    profileId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    idProof: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true, // Ensure email is unique
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{10}$/, // Only 10-digit numbers allowed
        },
    },
    societyId: {
        type: DataTypes.INTEGER,
        // references: {
            // model: Customer,
            // key: "customerId",
        // },
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        // references: {
            // model: Role,
            // key: "roleId",
        // },
        allowNull: false,
    },
    roleCategory:{
        type: DataTypes.STRING,
        allowNull: false,  // Role allocation for the job profile if applicable. For now, this field is kept as string type.
    },
    documentType:{
        type:DataTypes.ENUM("Aadhaar","CompanyId","VoterId","PAN"),
        allowNull: false,  // Type of ID document for the job profile. For now, this field is kept as string type.
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
    },
}, {
    tableName: 'JobProfiles',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    },
});

// Associate JobProfile with Customer and Role
Customer.hasMany(JobProfile, { foreignKey: "societyId", onDelete: "CASCADE" });
JobProfile.belongsTo(Customer, { foreignKey: "societyId" });

Role.hasMany(JobProfile, { foreignKey: "roleId", onDelete: "CASCADE" });
JobProfile.belongsTo(Role, { foreignKey: "roleId", as:"role" });

module.exports = JobProfile;