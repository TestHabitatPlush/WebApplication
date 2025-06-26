const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/customers", customerController.createCustomer);
router.get("/customers", customerController.getAllCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.put("/customers/:id", customerController.updateCustomer);
router.put("/customers/:id", customerController.updateCustomerStatus);
router.delete("/customers/:id", customerController.deleteCustomer);
router.put("/customers/Status/:id", customerController.updateCustomerStatus);

module.exports = router;
