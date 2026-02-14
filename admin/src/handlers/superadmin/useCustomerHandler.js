import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createCustomerService,
  getCustomerService,
  getCustomerDetailsByIdService,
  updateCustomerDetailsByIdService,
  updateCustomerStatusService,
} from "../../services/superadmin/customerService";

const useCustomerHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const createCustomer = async (data) => {
    try {
      const res = await createCustomerService(data, token);
      if (res.status === 201 || res.status === 200) {
        toast.success("Customer created successfully");
        return res.data;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Create customer failed");
      throw err;
    }
  };

  return {
    createCustomer,
    getCustomerService,
    getCustomerDetailsByIdService,
    updateCustomerDetailsByIdService,
    updateCustomerStatusService,
  };
};

export default useCustomerHandler;
