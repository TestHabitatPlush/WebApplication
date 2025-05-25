const envConfiguration = require("./config/envConfig");
envConfiguration();
// 
const sequelize = require("./config/database");
const app = require("./app");
// 
const PORT = process.env.PORT || 5000;
// 
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database synchronized...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(onDatabaseError);
// 
function onDatabaseError(err) {
  console.error("Unable to connect to the database:", err);
}

// const envConfiguration = require("./config/envConfig");
// envConfiguration();
// 
// const sequelize = require("./config/database");
// const app = require("./app");
// 
// const PORT = process.env.PORT || 5000;
// const HOST = '0.0.0.0'; 
// 
// sequelize
  // .authenticate()
  // .then(() => {
    // console.log("Database connected...");
    // return sequelize.sync({ force: false });
  // })
  // .then(() => {
    // console.log("Database synchronized...");
    // app.listen(PORT, HOST, () => {
      // console.log(`Server is running at http://${HOST}:${PORT}`);
    // });
  // })
  // .catch(onDatabaseError);
// 
// function onDatabaseError(err) {
  // console.error("Unable to connect to the database:", err);
// }
// 