const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const UserGroup = require("./UserGroup");

const DiscussionForum = sequelize.define("DiscussionForum", {
  discussionId: {
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
    allowNull: true,
  },
  discussionTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discussionDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "discussion_forum",
  timestamps: true,
});

module.exports = DiscussionForum;
