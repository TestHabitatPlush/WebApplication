// const ADMIN_ROLES = [
//   "super_admin",
//   "super_admin_it",
//   "society_moderator",
//   "management_committee",
// ];

// const checkAdmin = (req, res, next) => {
//   const role = req.user.roleCategory || req.user.role; // ✅ FIX

//   if (!ADMIN_ROLES.includes(role)) {
//     return res.status(403).json({ message: "Admin access denied" });
//   }

//   next();
// };

// module.exports = { checkAdmin };

const { ADMIN_ROLES } = require("../config/role.js");

const checkAdmin = (req, res, next) => {
  const role = req.user.role;

  if (!ADMIN_ROLES.includes(role)) {
    return res.status(403).json({ message: "Admin access denied" });
  }

  next();
};

module.exports ={ checkAdmin};
