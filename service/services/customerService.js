const { Op } = require("sequelize");
const { Customer } = require("../models");
const addressService = require("../services/addressService");


// create customer
const createCustomer = async (data) => {
  try {
    const { address, ...customerData } = data;

    const addressData = await addressService.createAddress(address);
    console.log(addressData.addressId);

    if (!addressData || !addressData.addressId) {
      throw new Error("Address creation failed");
    }

    const customer = await Customer.create({
      ...customerData,
      addressId: addressData.addressId,
    });
    return customer;
  } catch (err) {
    console.error("Error creating customer:", err.message);
    throw new Error("Unable to create customer");
  }
};



const deleteCustomer = async (id) => {
  const deleted = await Customer.destroy({ where: { customerId: id } });
  if (!deleted) {
    throw new Error("Customer not found");
  }
};

module.exports = {
  createCustomer,
  deleteCustomer,
};