const { Customer, Address, User } = require("../models");
const { validationResult, query } = require("express-validator");
const customerService = require("../services/customerService");
// const { Op } = require("sequelize");
 const sequelize = require("../config/database");
// const User = require("../models/User");

// 
const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateFilters = [
  query("name").optional().isString().withMessage("Name must be a string"),
  query("type").optional().isString().withMessage("Type must be a string"),
  // query('email').optional().isEmail().withMessage('Email must be a valid email address'),
  query("phone").optional().isString().withMessage("Phone must be a string"),
  query("subscriptionId")
    .optional()
    .isInt()
    .withMessage("Subscription ID must be an integer"),
  query("page")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Page must be a non-negative integer"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page size must be a positive integer"),
];

// get all customers
const getAllCustomers = async (req, res) => {
  await Promise.all(validateFilters.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const filters = {
      name: req.query.name || "",
      type: req.query.type || "",
      email: req.query.email || "",
      phone: req.query.phone || "",
      subscriptionId: req.query.subscriptionId || "",
    };

    console.log(filters);

    const pagination = {
      page: parseInt(req.query.page, 10) || 0,
      pageSize: parseInt(req.query.pageSize, 10) || 10,
    };

    const whereClause = {};
    if (filters.name)
      whereClause.customerName = { [Op.iLike]: `%${filters.name}%` }; // Case-insensitive search
    if (filters.type) whereClause.customerType = filters.type;
    if (filters.email) whereClause.email = { [Op.iLike]: `%${filters.email}%` };
    if (filters.phone) whereClause.phone = filters.phone;
    if (filters.subscriptionId)
      whereClause.subscriptionId = filters.subscriptionId;

    const { count, rows } = await Customer.findAndCountAll({
      where: whereClause,
      limit: pagination.pageSize,
      offset: pagination.page * pagination.pageSize,
    });
    const totalPages = Math.ceil(count / pagination.pageSize);
    res.status(200).json({
      message: "Customers fetched successfully",
      data: rows,
      total: count,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// get customer by Id
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;

    if (!customerId) {
      return res.status(404).json({ message: "CustomerId not found!" });
    }

    const data = await Customer.findByPk(customerId, {
      include: [
        {
          model: Address,
        },
      ],
    });

    if (data) {
      res.status(200).json({ message: "data fetched", data });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customerData = req.body;
    console.log(customerId, customerData);

    const [updated] = await Customer.update(customerData, {
      where: { customerId },
    });

    const [addressUpdated] = await Address.update(customerData.address, {
      where: { addressId: customerData.addressId },
    });

    if (updated && addressUpdated) {
      return res.status(200).json({
        message: "Customer updated successfully",
        data: customerData,
      });
    }

    throw new Error("Customer not found");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


// const updateCustomerStatus = async (req, res) => {
//   try {
//     const customerId = req.params.id;
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ error: "Status is required." });
//     }

//     const [updated] = await Customer.update(
//       { status },
//       { where: { customerId } }
//     );

//     if (updated) {
//       return res.status(200).json({
//         message: "Customer status updated successfully",
//         data: { customerId, status },
//       });
//     }

//     return res.status(404).json({ error: "Customer not found" });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

// const updateCustomerStatus = async (req, res) => {
//   const { status } = req.body;
//   const customerId = req.params.id;

//   if (!status) {
//     return res.status(400).json({ error: "Status is required." });
//   }

//   const t = await sequelize.transaction();
//   try {
//     const [updatedCustomer] = await Customer.update(
//       { status },
//       { where: { customerId }, transaction: t }
//     );
//     const [updatedUsers] = await User.update(
//       { status },
//       { where: { societyId:customerId }, transaction: t }
//     );

//     if (updatedCustomer === 0 && updatedUsers === 0) {
//       await t.rollback();
//       return res.status(200).json({
//         message: "Customer and related user statuses updated successfully",
//         // data: { customerId, status },
//       });
//     }

//     await t.commit();
//     return res.status(200).json({
//       message: "Customer and related user statuses updated successfully",
//       data: { customerId, status },
//     });
//   } catch (error) {
//     await t.rollback();
//     return res.status(400).json({ error: error.message });
//   }
// };

const updateCustomerStatus = async (req, res) => {
  const { status } = req.body;
  const customerId = req.params.id;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  const t = await sequelize.transaction();
  try {
    // 1. Update customer status
    const [updatedCustomer] = await Customer.update(
      { status },
      { where: { customerId }, transaction: t }
    );

    if (!updatedCustomer) {
      await t.rollback();
      return res.status(404).json({ error: "Customer not found" });
    }

    // 2. Update all users where societyId = customerId
    await User.update(
      { status },
      { where: { societyId: customerId }, transaction: t }
    );

    await t.commit();
    return res.status(200).json({
      message: "Customer and related user statuses updated successfully",
      data: { customerId, status },
    });
  } catch (error) {
    await t.rollback();
    return res.status(400).json({ error: error.message });
  }
};



const deleteCustomer = async (req, res) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  updateCustomerStatus,
  deleteCustomer,
};
