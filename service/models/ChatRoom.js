const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("../models/Customer")

const ChatRoom = sequelize.define("ChatRoom", {
  chatRoomId: {
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
  type: {
    type: DataTypes.ENUM("private", "group"),
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "chat_rooms",
  timestamps: true,
});

module.exports = ChatRoom;
