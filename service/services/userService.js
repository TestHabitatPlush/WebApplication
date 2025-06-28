const { User, Address, Customer } = require("../models");
const addressService = require("../services/addressService");


const createUserService = async (data) => {
    try {
      const { address, ...customerData } = data;

      const addressData = await addressService.createAddress(address);
      console.log(addressData.addressId);

      if (!addressData || !addressData.addressId) {
        throw new Error("Address creation failed");
      }

      const customer = await User.create({
        ...customerData,
        addressId: addressData.addressId,
      });
      return customer;
    } catch (err) {
      console.error("Error creating customer:", err.message);
      throw new Error("Unable to create User");
    }
};

const getAllUsersService = async () => {
  return await User.findAll();
};

const getUserByIdService = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
};
