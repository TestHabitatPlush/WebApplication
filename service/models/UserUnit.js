const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Unit = require("./Unit");

const UserUnit = sequelize.define(
  "user_unit",
  {
    userUnitId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      type:DataTypes.ENUM("active","inactive","pending"),
      allowNull:false,
      defaultValue:"active",
    },
  },

  {
    tableName: "user_units",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["userId", "unitId"],
      },
    ],
  }
);
// UserUnit.belongsTo(User, { foreignKey: "userId" });
// UserUnit.belongsTo(Unit, { foreignKey: "unitId" });

// User.hasMany(UserUnit, { foreignKey: "userId" });
// Unit.hasMany(UserUnit, { foreignKey: "unitId" });

module.exports = UserUnit;
