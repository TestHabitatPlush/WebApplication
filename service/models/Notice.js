// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const UserGroup = require("./UserGroup");
// const User = require("./User");

// const Notice = sequelize.define(
//   "Notice",
//   {
//     noticeId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//     noticeHeading: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     noticeDescription: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     senderId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//     },
//     noticeExpireDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },

//     userGroupId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: UserGroup,
//         key: "userGroupId",
//       },
//     },
//   },
//   {
//     tableName: "Notice",
//     timestamps: true, // Disable default timestamps if you're using custom ones
//   }
// );

// // Sync models to the database
// // sequelize
// //   .sync({ alter: true }) // `alter: true` ensures existing tables are modified without dropping
// //   .then(() => {
// //     console.log("Tables synced successfully!");
// //   })
// //   .catch((error) => {
// //     console.error("Error syncing tables: ", error);
// //   });

// module.exports = Notice;


const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Role = require("./RoleModel");

const Notice = sequelize.define(
  "Notice",
  {
    noticeId: {
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
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "roleId",
      },
      allowNull: true,
    },
    roleCategories: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    noticeHeading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noticeDescription: {
      type: DataTypes.STRING,
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
    noticeExpireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Notice",
    timestamps: true, 
  }
);

Notice.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(Notice, { foreignKey: "roleId" });

module.exports = Notice;