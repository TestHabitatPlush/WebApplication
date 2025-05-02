import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createCustomerService,
  getCustomerDetailsByIdService,
  getCustomerService,
  updateCustomerDetailsByIdService,
} from "../../services/superadmin/customerService";

const CustomerHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const validateCustomerData = (data) => {
    const requiredFields = [
      "customerType",
      "customerName",
      "societyType",
      "establishedYear",
      "subscriptionId",
      "phone",
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

  const createCustomerHandler = (data) => {
    const missingFields = validateCustomerData(data);
    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast.error(`Please fill the ${field} field.`);
      });
      return;
    }
    console.log("Customer data is valid:", data);
    createCustomerService(data).then((res) => {
      if (res.status === 201) {
        toast.success("Customer created successfully.");
      }
    });
  };

  const getCustomerHandler = async (data, token) => {
    return await getCustomerService(data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCustomerDetailsByIdHandler = async (id) => {
    return await getCustomerDetailsByIdService(id, token);
  };

  const updateCustomerDetailsByIdHandler = async (id, data) => {
    return await updateCustomerDetailsByIdService(id, data, token)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Customer updated successfully !");
          console.log(res.data);
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return {
    createCustomerHandler,
    getCustomerHandler,
    getCustomerDetailsByIdHandler,
    updateCustomerDetailsByIdHandler,
  };
};

export default CustomerHandler;
