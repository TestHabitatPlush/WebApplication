// const { Sequelize } = require("sequelize");

// // env
// // const DB_HOST = process.env.DB_HOST;
// // const DB_USER = process.env.DB_USER;
// // const DB_PASSWORD = process.env.DB_PASSWORD;
// // const DB_NAME = process.env.DB_NAME;

// // define('DB_HOSTNAME', 'localhost');
// // define('DB_USERNAME', 'u236629367_software2');
// // define('DB_PASSWORD', 'Signal@2412');
// // define('DB_DATABASE', 'u236629367_software2');

// // old production
// // const DB_HOST = "srv1021.hstgr.io";
// // const DB_USER = "u236629367_software2";
// // const DB_PASSWORD = "Signal@2412";
// // const DB_NAME = "u236629367_software2";
// // hello

// // -------  testdb-1 ---------

// // const DB_HOST = "srv1021.hstgr.io";
// // const DB_USER = "u236629367_habitatplush";
// // const DB_PASSWORD = "0Vw$DrhtE";
// // const DB_NAME = "u236629367_testdb_1";

// // const DB_HOST = "localhost";
// const DB_HOST = "127.0.0.1";
// const DB_USER = "root";
// const DB_PASSWORD = "root";
// const DB_NAME = "habitat_plush";

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "mysql",
// });

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const DB_HOST = "127.0.0.1"; // or "localhost"
const DB_USER = "root";
const DB_PASSWORD = "root";
const DB_NAME = "habitat_plush";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
