// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const Customer = require("./Customer");
// const ref_visitor_type = require("./ref_visitor_type");
// const visitorRelationship = require("./visitorRelationship");
// // 
// const Visitor_new_visitentry = sequelize.define(
//   "Visitor_new_visitentry",
//   {
//     societyId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Customer,
//         key: "customerId",
//       },
//       allowNull: false,
//     },
//     visit_entry_Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     visit_expect_date_of_entry_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         isDate: true, // Ensures the input is a valid date format
//       },
//     },
//     visit_type_Id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: ref_visitor_type,
//         key: "visit_type_Id",
//       },
//       allowNull: false,
//     },
//     visit_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     visit_mobileno: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     Visit_relation_Id: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//       references: {
//         model: visitorRelationship,
//         key: "Visit_relation_Id",
//       },
//     },
//     visit_purpose: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     senderId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     status: {
//       type: DataTypes.STRING,
//       defaultValue: "created", // Set default value as a string 'created'
//     },
//     // qr_code: {
//     //   type: DataTypes.INTEGER,
//     //   defaultValue: 1,
//     //   // Or use INTEGER if you prefer numbers only
//     //   // allowNull: false,
//     //   // unique: true, // Ensure the qr_code is unique
//     // },
//   },
//   {
//     tableName: "Visitor_new_visitentry",
//     timestamps: true, // Disable default timestamps if you're using custom ones
//   }
//   // {
//   //   hooks: {
//   //     beforeCreate: (Visitor_new_visitentry) => {
//   //       // Generate a random number or string as QR code
//   //       const randomCode = Math.floor(100000000 + Math.random() * 900000000); // 9-digit random number
//   //       Visitor_new_visitentry.qr_code = randomCode.toString(); // Convert to string if necessary
//   //     },
//   //   },
//   // }
// );

// module.exports = Visitor_new_visitentry;

      //####################################


// model visitor_new_visitentry.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("./Customer");
const visitorRelationship = require("./visitorRelationship");

const Visitor_new_visitentry = sequelize.define(
  "Visitor_new_visitentry",
  {
    visit_entry_Id: {
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
    visit_expect_date_of_entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    visit_type_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: visitorRelationship,
        key: "Visit_relation_Id",
      },
    },
    visit_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visit_mobileno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Visit_relation_Id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: visitorRelationship,
        key: "Visit_relation_Id",
      },
    },
    visit_purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relationship:{
      type: DataTypes.STRING,
     allowNull: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visit_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "created", 
    },
    qrCodeImage: {
      type: DataTypes.BLOB("long"), 
      allowNull: true, 
    },
    isQRCodeValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Indicates if the QR code is still valid
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "Visitor_new_visitentry",
    timestamps: true,
  }
);

module.exports = Visitor_new_visitentry;
