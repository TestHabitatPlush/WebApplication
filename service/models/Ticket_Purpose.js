// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const User = require("./User");

// const Ticket_Purpose = sequelize.define(
//   "Ticket_Purpose",
//   {
//     ticket_purpose_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     purpose_Details: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "created",
//     },
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "userId",
//       },
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "Ticket_Purpose",
//     timestamps: true, // Disable default timestamps if you're using custom ones
//   }
// );

// module.exports = Ticket_Purpose;

<<<<<<< HEAD
=======


>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const User = require("./User");

<<<<<<< HEAD
const Ticket_Purpose = sequelize.define(
  "Ticket_Purpose",
  {
    ticket_purpose_Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    purpose_Details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
   
    societyId: {
      type: DataTypes.INTEGER,
      references: { model: Customer, key: "customerId" },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "userId" },
      allowNull: false,
    },
  },
  {
    tableName: "Ticket_Purpose",
    timestamps: true,
  }
);
=======
const Ticket_Purpose = sequelize.define("Ticket_Purpose", {
  ticket_purpose_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  purpose_Details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "created",
  },
  societyId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "customerId" },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: "userId" },
    allowNull: false,
  },
}, {
  tableName: "Ticket_Purpose",
  timestamps: true,
});

Customer.hasMany(Ticket_Purpose, { foreignKey: "societyId" });
Ticket_Purpose.belongsTo(Customer, { foreignKey: "societyId" });

User.hasMany(Ticket_Purpose, { foreignKey: "userId" });
Ticket_Purpose.belongsTo(User, { foreignKey: "userId" });
>>>>>>> 870a576d38725c9830678d5f338e9368efed5b2f




module.exports = Ticket_Purpose;
