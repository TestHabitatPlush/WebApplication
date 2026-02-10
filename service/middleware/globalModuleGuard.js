// middleware/globalModuleGuard.js
const moduleMap = require("../config/moduleMap");
const moduleAccess = require("./moduleAccess");

module.exports = (req, res, next) => {
  if (!req.user?.customerId) return next();

  const matched = Object.entries(moduleMap).find(([route]) =>
    req.originalUrl.startsWith(route)
  );

  if (!matched) return next();

  const moduleName = matched[1];

  // 🔁 reuse your existing middleware
  return moduleAccess(moduleName)(req, res, next);
};