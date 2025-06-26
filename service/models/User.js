// const bcrypt = require("bcrypt");
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Address = require("./Address");
// const Customer = require("./Customer");
// const Unit = require("./Unit");
// const Role = require("./RoleModel");

// const User = sequelize.define(
//   "User",
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     salutation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     photo: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     countryCode: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     mobileNumber: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//     },
//     alternateCountryCode: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     alternateNumber: {
//       type: DataTypes.BIGINT,
//       allowNull: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       validate: {
//         isEmail: true,
//       },
//       allowNull: true,
//     },
//     addressId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Address,
//         key: "addressId",
//       },
//       allowNull: true,
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: true,
//     },
//     unitId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Unit,
//         key: "unitId",
//       },
//       allowNull: true,
//     },
//     roleId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Role,
//         key: "roleId",
//       },
//       allowNull: false,
//     },
//     livesHere: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: false,
//     },
//     primaryContact: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//     isManagementCommittee: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//     managementDesignation: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     remarks: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("active", "inactive"),
//       allowNull: false,
//       defaultValue: "active",
//     },
//     isDeleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: false,
//     tableName: "users",
//     hooks: {
//       beforeCreate: async (user) => {
//         if (user.changed("password")) {
//           user.password = await bcrypt.hash(user.password, 10);
//         }
//       },
//       beforeUpdate: async (user) => {
//         if (user.changed("password")) {
//           user.password = await bcrypt.hash(user.password, 10);
//         }
//       },
//     },
//   }
// );

// Address.hasMany(User, { foreignKey: "addressId" });
// User.belongsTo(Address, { foreignKey: "addressId" });

// Customer.hasMany(User, { foreignKey: "societyId" });
// User.belongsTo(Customer, { foreignKey: "societyId" });

// Unit.hasMany(User, { foreignKey: "unitId" });
// User.belongsTo(Unit, { foreignKey: "unitId" });

// Role.hasMany(User, { foreignKey: "roleId", as: "role" });
// User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

// module.exports = User;

const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Address = require("./Address");
const Customer = require("./Customer");
const Unit = require("./Unit");
const Role = require("./RoleModel");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    salutation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    // resetToken:{
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // resetTokenExpiration:{
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    
    countryCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    alternateCountryCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alternateNumber: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: true,
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: Address,
        key: "addressId",
      },
      allowNull: true,
    },
    societyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "customerId",
      },
      allowNull: true,
    },
    unitId: {
      type: DataTypes.INTEGER,
      references: {
        model: Unit,
        key: "unitId",
      },
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "roleId",
      },
      allowNull: false,
    },
    livesHere: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    primaryContact: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isManagementCommittee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    managementDesignation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive","pending"),
      allowNull: false,
      defaultValue: "pending",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
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
  }
);

Address.hasMany(User, { foreignKey: "addressId" });
User.belongsTo(Address, { foreignKey: "addressId" });

// Customer.hasMany(User, { foreignKey: 'societyId', as: 'users' });
// User.belongsTo(Customer, { foreignKey: 'societyId', as: 'customer' });

Customer.hasMany(User, { foreignKey: "societyId" });
User.belongsTo(Customer, { foreignKey: "societyId" });

// Unit.hasMany(User, { foreignKey: "unitId" });
// User.belongsTo(Unit, { foreignKey: "unitId" });

Role.hasMany(User, { foreignKey: "roleId", as: "role" });
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

module.exports = User;