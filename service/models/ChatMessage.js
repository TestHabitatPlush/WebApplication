const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require ("../models/User")

const ChatMessage = sequelize.define("ChatMessage", {
  messageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chatRoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    references: {
        model: User,
        key: "userId",
      },
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
  },
  replyToMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  editedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: "chat_messages",
  timestamps: true,
});

module.exports = ChatMessage;
