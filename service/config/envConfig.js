const dotenv = require("dotenv");
const path = require("path");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envConfiguration = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      dotenv.config({
        path: path.resolve(__dirname, "../env/.env.production"),
      });
      break;
    case "test":
      dotenv.config({ path: path.resolve(__dirname, "../env/.env.test") });
      break;
    default:
      dotenv.config({
        path: path.resolve(__dirname, "../env/.env.development"),
      });
      break;
  }
};

module.exports = envConfiguration;