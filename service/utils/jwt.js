const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}


exports.generateToken = (payload, expiresIn = "30d") => {
  console.log("Token generated successfully");
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  console.log("Token:", token);
  console.log("Expires in:", expiresIn);
  console.log("Payload:", payload);
  console.log("Secret:", process.env.JWT_SECRET);
  return token;
};


exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

