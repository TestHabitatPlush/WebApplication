const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Unit = require('./Unit');
const Customer = require('./Customer');

const Parking = sequelize.define('Parking', {
    parkingId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    societyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'customerId',
        },
        allowNull: false,
    },
    // unitName: {
    //     type: DataTypes.STRING,
    //     references: {
    //         model: Unit,
    //         key: 'unitName',
    //     },
    //     allowNull: true,
    // },
    unitId: {
        type: DataTypes.INTEGER,
        references: {
            model: Unit,
            key: 'unitId',
        },
        allowNull: true,
    },
    parkingSlotName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parkingSlotType: {
        type: DataTypes.ENUM('PublicUsage', 'PrivateUsage'),
        allowNull: false,
    },
    parkingCharges: {
        type: DataTypes.ENUM('Free', 'Paid'),
        allowNull: false,
    },
    parkingUsage: {
        type: DataTypes.ENUM('Hourly', 'Days'),
        allowNull: false,
    },
    chargeAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bookingFrom: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
    bookingTo: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        },
    },
}, {
    tableName: 'parking',
    timestamps: true,
});

module.exports = Parking;
