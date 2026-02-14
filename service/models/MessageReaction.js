const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const ChatMessage = require("./ChatMessage");

const MessageReaction = sequelize.define(
  "MessageReaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ChatMessage,
        key: "messageId",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
    },
    reaction: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "message_reactions",
    timestamps: true, // createdAt & updatedAt
    indexes: [
      {
        unique: true,
        fields: ["messageId", "userId"], // prevent duplicate reactions
      },
    ],
  }
);

module.exports = MessageReaction;
