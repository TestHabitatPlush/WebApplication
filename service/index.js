const envConfiguration = require("./config/envConfig");
envConfiguration();

const http = require("http");
const app = require("./app");
const sequelize = require("./config/database");
const { setupSocket } = require("./utils/socket");

// IMPORTANT: load ALL models BEFORE sync
require("./models");   // must exist and import all models

const PORT = process.env.PORT || 5001;

(async function startServer() {
  try {
    //  Connect DB
    await sequelize.authenticate();
    console.log("Database connected");

    //  DROP & RECREATE all tables (DATA WILL BE LOST)
    
    // await sequelize.sync({ force: true }); // use only first time 
    await sequelize.sync({}); 
    console.log("All tables dropped & recreated");

    //  Create HTTP server
    const server = http.createServer(app);

    //  Initialize Socket.IO
    setupSocket(server);

    //  Start listening
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
})();




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