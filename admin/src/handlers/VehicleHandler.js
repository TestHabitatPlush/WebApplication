import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  createVehicleBySocietyService,
  updateVehicleBySocietyService,
  getVehicleBySocietyService,
  getVehicleDataByIdService,
  createVehicleByUserService,
  getVehicleByUserService,
} from "../services/vehicleService";

const useVehicleHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );

  /* ========== ADMIN ========== */

  const createVehicleBySocietyHandler = async (data) => {
    try {
      const res = await createVehicleBySocietyService(
        societyId,
        data,
        token
      );
      toast.success("Vehicle added successfully");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add vehicle");
    }
  };

const updateVehicleHandler = async (societyId, vehicleId, payload) => {
  try {
    const res = await updateVehicleBySocietyService(
      societyId,
      vehicleId,
      payload,
      token
    );
    return res;
  } catch (error) {
    console.error("Update Vehicle Error:", error?.response?.data || error);
    throw error;
  }
};



  const getVehicleBySocietyHandler = async () => {
    try {
      const res = await getVehicleBySocietyService(societyId, token);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch vehicles");
    }
  };

  
  /* ========== COMMON ========== */

  const getVehicleDataByIdHandler = async (vehicleId) => {
    try {
      const res = await getVehicleDataByIdService(vehicleId, token);
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch vehicle details");
    }
  };
// const deactivateVehicleHandler = async (vehicleId) => {
//   try {
//     const res = await deactivateVehicleService(vehicleId, token);
//     toast.success("Vehicle deactivated successfully");
//     return res.data;
//   } catch (err) {
//     toast.error(
//       err.response?.data?.message || "Failed to deactivate vehicle"
//     );
//   }
// };

  return {
    createVehicleBySocietyHandler,
    updateVehicleHandler,
    getVehicleBySocietyHandler,
    createVehicleByUserHandler,
    getVehicleByUserHandler,
    getVehicleDataByIdHandler
    //deactivateVehicleHandler
  };
};

export default useVehicleHandler;
