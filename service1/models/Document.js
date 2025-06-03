const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const UserGroup = require("./UserGroup");
const User = require("./User");

const Document = sequelize.define("Document", {
    documentId: {
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
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId",
        },
        allowNull: true,
    },
    userGroupId: {
        type: DataTypes.INTEGER,
        references: {
          model: UserGroup,
          key: "userGroupId",
        },
      },
    documentName: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    document: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Documents',
    timestamps: true,
});

module.exports = Document;
