import toast from "react-hot-toast";
import {
  createCustomerService,
  getCustomerDetailsByIdService,
  getCustomerService,
  updateCustomerDetailsByIdService,
  updateCustomerStatusService,
} from "../../services/superadmin/customerService";

const CustomerHandler = () => {
  const validateCustomerData = (data) => {
    const requiredFields = [
      "customerType",
      "customerName",
      "societyType",
      "establishedYear",
      "subscriptionId",
      "phone",
      "status",
      "email",
      "address.city",
      "address.state",
      "address.zipCode",
      "address.street",
      "address.address1",
    ];

    const missingFields = requiredFields.filter((field) => {
      const fieldParts = field.split(".");
      let value = data;
      for (let part of fieldParts) {
        value = value?.[part];
        if (value === undefined || value === "") break;
      }
      return !value;
    });

    return missingFields;
  };

  const createCustomerHandler = async (data, token) => {
    const missingFields = validateCustomerData(data);
    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast.error(`Please fill the ${field} field.`);
      });
      return;
    }
    try {
      const res = await createCustomerService(data, token);
      if (res.status === 201) {
        toast.success("Customer created successfully.");
      }
    } catch (error) {
      toast.error("Error creating customer.");
      console.error(error);
    }
  };

  const getCustomerHandler = async (params, token) => {
    try {
      return await getCustomerService(params, token);
    } catch (err) {
      console.error("Error getting customer:", err);
    }
  };

  const getCustomerDetailsByIdHandler = async (id, token) => {
    try {
      return await getCustomerDetailsByIdService(id, token);
    } catch (err) {
      console.error("Error fetching customer by ID:", err);
    }
  };

  const updateCustomerDetailsByIdHandler = async (id, data, token) => {
    try {
      const res = await updateCustomerDetailsByIdService(id, data, token);
      if (res.status === 200) {
        toast.success("Customer updated successfully!");
        return res;
      }
    } catch (err) {
      console.error("Error updating customer:", err);
      toast.error(err.message || "Error updating customer.");
    }
  };

  const updateCustomerStatusHandler = async (id, status, token) => {
    try {
      const response = await updateCustomerStatusService(id, status, token);
      toast.success("Status updated successfully.");
      return response.data.data.status;
    } catch (err) {
      console.error("Error updating customer status:", err);
    }
  };

  return {
    createCustomerHandler,
    getCustomerHandler,
    getCustomerDetailsByIdHandler,
    updateCustomerDetailsByIdHandler,
    updateCustomerStatusHandler,
  };
};

export default CustomerHandler;
