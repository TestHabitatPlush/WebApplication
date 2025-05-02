const { verifyToken } = require("../utils/jwt");
const checkAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
};

module.exports = {checkAuth};

// const jwt = require("jsonwebtoken");
// const { verifyToken } = require("../utils/jwt");
// 
// const checkAuth = (req, res, next) => {
  // const token = req.cookies.authToken;
  // if (!token) {
    // return res.status(401).json({ message: "No token provided" });
  // }
// 
  // const decoded = verifyToken(token);
  // if (!decoded) {
    // return res.status(401).json({ message: "Invalid token" });
  // }
// 
  // req.user = decoded;
  // next();
// };
// const authMiddleware = (req, res, next) => {
  // const authHeader = req.headers.authorization;
// 
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // return res.status(401).json({ message: "Authorization header missing or invalid" });
  // }
// 
  // const token = authHeader.split(" ")[1];
// 
  // try {
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // if (!decodedToken.societyId) {
      // return res.status(403).json({ message: "Society ID missing in token" });
    // }
// 
    // req.user = {
      // userId: decodedToken.userId,
      // societyId: decodedToken.societyId,
    // };
// 
    // next();
  // } catch (error) {
    // console.error("Token verification error:", error.message);
    // res.status(401).json({ message: "Authentication failed" });
  // }
// };
// 
// 
// 
// module.exports = { checkAuth, authMiddleware };
// 