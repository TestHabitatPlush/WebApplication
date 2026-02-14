import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  parkingBookedService,
  getParkingStatusService,
  getParkingDataByIdService,
  updateParkingService,
} from "../services/parkingService";

const useParkingHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector(
    (state) => state.auth.user?.societyId
  );

  const createParkingHandler = async (data) => {
    try {
      if (!societyId) {
        toast.error("Society ID is missing.");
        return;
      }

      const response = await parkingBookedService(societyId, token, data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Parking created successfully.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating parking.");
    }
  };

  const getParkingHandler = async () => {
    try {
      if (!societyId) return;
      const response = await getParkingStatusService(societyId, token);
      return response.data;
    } catch (error) {
      toast.error("Error fetching parking data.");
    }
  };

const getParkingDataByIdHandler = async (parkingId) => {
  try {
    if (!parkingId) return;

    const response = await getParkingDataByIdService(
      parkingId,
      token
    );

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Error fetching parking details.");
  }
};


  const updateParkingHandler = async (data) => {
    try {
      const response = await updateParkingService(
        {
          ...data,
          societyId,
          parkingId: data.parkingId,
        },
        token
      );

      if (response.status === 200) {
        toast.success("Parking updated successfully.");
      }
    } catch (error) {
      toast.error("Failed to update parking.");
    }
  };

  return {
    createParkingHandler,
    getParkingHandler,
    getParkingDataByIdHandler,
    updateParkingHandler,
  };
};

export default useParkingHandler;
