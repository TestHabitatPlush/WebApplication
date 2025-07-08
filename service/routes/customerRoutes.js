const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/customers", customerController.createCustomer);
router.get("/customers", customerController.getAllCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.put("/customers/:id", customerController.updateCustomer);
router.put("/customers/status/:id", customerController.updateCustomerStatus);
router.delete("/customers/:id", customerController.deleteCustomer);
<<<<<<< HEAD
router.put("/customers/Status/:id", customerController.updateCustomerStatus);
=======

>>>>>>> e2eb08a5aec9899dc858dd234d25cf2815fa6384

module.exports = router;
