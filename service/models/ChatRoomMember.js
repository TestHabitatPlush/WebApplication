const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require ("../models/User")

const ChatRoomMember = sequelize.define("ChatRoomMember", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chatRoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isMuted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBanned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "chat_room_members",
  timestamps: false,
});

module.exports = ChatRoomMember;
