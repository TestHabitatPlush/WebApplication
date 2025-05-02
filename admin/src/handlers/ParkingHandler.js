import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { parkingBookedService, getParkingStatusService,getParkingDataByIdService,updateParkingService,createVehicleBySocietyService } from "../services/parkingService";

const ParkingHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  if (!societyId) {
    console.error("Error: Society ID is undefined.");
  }



  const createParkingHandler = async (data) => {
    try {
      if (!societyId) {
        toast.error("Society ID is missing. Cannot create parking slot.");
        return;
      }
  
      // Add logs to debug request payload
      console.log("Sending Data to API:", JSON.stringify(data, null, 2));
      console.log("Society ID:", societyId);
  
      const response = await parkingBookedService(societyId, token, data);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Parking created successfully.");
      }
    } catch (error) {
      console.error("Error creating parking:", error.response?.data || error.message);
      toast.error("Error creating parking: " + (error.response?.data?.message || error.message));
    }
  };
  
    

  const getParkingHandler = async () => {
    try {
      if (!societyId) {
        toast.error("Society ID is missing. Cannot fetch parking data.");
        return;
      }

      const response = await getParkingStatusService(societyId, token);
      return response.data;
    } catch (error) {
      console.error("Error fetching parking data:", error);
      toast.error("Error fetching parking: " + (error.response?.data?.message || error.message));
    }
  };

    const getParkingDataByIdHandler = async (id) => {
      try {
        const response = await getParkingDataByIdService(id, token);
        console.log(response);
        return response.data;  
      } catch (err) {
        console.error("Error Parking Facility by ID:", err);
        toast.error("Error Parking Facility details.");
      }
    };
    
    const updateParkingHandler = async (data) => {
      try {
        console.log("Updating parking data:", data);
        const response = await updateParkingService(
          { ...data, societyId: data.societyId, parkingId: data.parkingId },
          token
        );
    
        console.log("API Response:", response);
    
        if (response && (response.status === 200 || response.status === 201)) {
          toast.success("Parking Updated successfully.");
        } else {
          console.error("Unexpected status code:", response.status);
          toast.error("Failed to update parking.");
        }
      } catch (err) {
        console.error("Update failed:", err);
        toast.error(
          "Failed to update parking: " + (err.response?.data?.message || err.message)
        );
      }
    };
    
  
    
  const createNewVehicleHandler = async (data) => {
    try {
  
      const response = await createVehicleBySocietyService(societyId, token, data);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Vehicle created successfully.");
      }
    } catch (error) {
      console.error("Error creating vehicle:", error.response?.data || error.message);
      toast.error("Error creating vehicle: " + (error.response?.data?.message || error.message));
    }
  };
  
  return {
    createParkingHandler,
    getParkingHandler,
    getParkingDataByIdHandler,
    updateParkingHandler,

    createNewVehicleHandler,
  };
};

export default ParkingHandler;
