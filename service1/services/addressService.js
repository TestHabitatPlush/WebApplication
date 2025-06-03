const Address = require("../models/Address");

// Create a new address
const createAddress = async (addressData) => {
  try {
    const address = await Address.create(addressData);
    return address;
  } catch (error) {
    throw new Error(`Unable to create address: ${error.message}`);
  }
};

const deleteAddress = async (addressId) => {
  try {
    const address = await getAddressById(addressId);
    if (address.isDeleted) {
      throw new Error("Address is already deleted");
    }
    await address.update({ isDeleted: true });
    return { message: "Address deleted successfully (soft delete)" };
  } catch (error) {
    throw new Error(`Unable to delete address: ${error.message}`);
  }
};

const getAllAddresses = async (filter = {}) => {
  try {
    const addresses = await Address.findAll({
      where: {
        ...filter,
        isDeleted: false, // Exclude deleted addresses by default
      },
    });
    return addresses;
  } catch (error) {
    throw new Error(`Unable to retrieve addresses: ${error.message}`);
  }
};

const getAddressById = async (addressId, includeDeleted = false) => {
  try {
    const address = await Address.findOne({
      where: {
        addressId,
        ...(includeDeleted ? {} : { isDeleted: false }), // Exclude deleted unless specified
      },
    });

    if (!address) {
      throw new Error("Address not found");
    }
    return address;
  } catch (error) {
    throw new Error(`Unable to retrieve address: ${error.message}`);
  }
};


// Update an existing address
const updateAddress = async (addressId, updateData) => {
  try {
    const address = await getAddressById(addressId); // Ensure address exists
    await address.update(updateData);
    return address;
  } catch (error) {
    throw new Error(`Unable to update address: ${error.message}`);
  }
};

module.exports = {
  createAddress,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAllAddresses,
};
