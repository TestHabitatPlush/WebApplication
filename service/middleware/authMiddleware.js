// const { verifyToken } = require("../utils/jwt");
// const checkAuth = (req, res, next) => {
//   const token = req.cookies.authToken;
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const decoded = verifyToken(token);
//   if (!decoded) {
//     return res.status(401).json({ message: "Invalid token" });
//   }

//   req.user = decoded;
//   next();
// };

// module.exports = {checkAuth};

// const { verifyToken } = require("../utils/jwt");

// const checkAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   const decoded = verifyToken(token);

//   if (!decoded) return res.status(401).json({ message: "Invalid token" });

//   req.user = decoded;
//   next();
// };

// module.exports = { checkAuth };

const { verifyToken } = require("../utils/jwt");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // JWT payload attached here
  req.user = decoded;

  // Safe defaults (legacy compatible)
  req.user.dashboards = req.user.dashboards || ["resident"];
  req.user.defaultDashboard = req.user.defaultDashboard || "resident";

  next();
};

module.exports = { checkAuth };
