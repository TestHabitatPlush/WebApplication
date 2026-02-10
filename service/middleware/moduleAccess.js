// middlewares/moduleAccess.js
const Customer = require("../models/Customer");
const SubscriptionPlan = require("../models/SubscriptionPlan");
const Module = require("../models/Module");

module.exports = moduleName => {
  return async (req, res, next) => {
    try {
      if (!req.user?.customerId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const customer = await Customer.findByPk(req.user.customerId, {
        include: [{
          model: SubscriptionPlan,
          include: [Module],
        }],
      });

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      const allowedModules =
        customer.SubscriptionPlan?.Modules.map(m => m.moduleName) || [];

      if (!allowedModules.includes(moduleName)) {
        return res.status(403).json({
          message: `Module '${moduleName}' not available in your plan`,
        });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};