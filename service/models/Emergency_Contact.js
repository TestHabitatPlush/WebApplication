// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const User = require("./User");

// const Emergency_Contact = sequelize.define(
//   "Emergency_Contact",
//   {
//     contactId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     econtactNo1: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     econtactNo2: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     emergencyContactType: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     address: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     state: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     pin: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     viewStatus: {
//       type: DataTypes.ENUM("active", "inactive","pending"),
//       allowNull: true,
//       defaultValue: "pending",
//     },
//   },
//   {
//     tableName: "Emergency_Contact",
//     timestamps: true,
//   }
// );

// module.exports = Emergency_Contact;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");
const Role = require("./RoleModel");

const Emergency_Contact = sequelize.define(
  "Emergency_Contact",
  {
    contactId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: false,
      defaultValue: [],
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    econtactNo1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    econtactNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emergencyContactType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "active",
    },
  },
  {
    tableName: "Emergency_Contact",
    timestamps: true,
  }
);


Emergency_Contact.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Emergency_Contact.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = Emergency_Contact;