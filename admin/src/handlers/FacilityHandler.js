import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createFacilityService, getFacilityService,deleteFacilityService ,getFacilityByIdService,updateFacilityService} from "../services/facilityService";

const FacilityHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  ;

  const getFacilityHandler = async () => {
    try {
      return await getFacilityService(societyId, {}, token);
    } catch (err) {
      console.error("Error fetching facility:", err);
    }
  };

  const createFacilityHandler = async (data) => {
    try {
      const res = await createFacilityService(societyId, data, token);
      if (res.status === 201) {
        toast.success("Facility created successfully.");
        return res;
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error creating facility.");
      }
      console.error(err);
    }
  }

    // Function to delete Facility by ID
  const deleteFacilityByIdHandler = async (id) => {
    try {
      const response = await deleteFacilityService(id, token);
      if (response.status === 200) {
        toast.success("Facility deleted successfully");
        return response.data;
      } else {
        toast.error("Failed to delete the Facility");
      }
    } catch (err) {
      console.error("Error deleting Facility:", err);
      toast.error("An error occurred while deleting the Facility.");
    }
  };

  const getFacilityDataByIdHandler = async (id) => {
    try {
      const response = await getFacilityByIdService(id, token);
      console.log(response);
      return response.data;  
    } catch (err) {
      console.error("Error fetching Facility by ID:", err);
      toast.error("Error fetching Facility details.");
    }
  };
  
  const updateFacilityHandler = async (data) => {
    if (!data.facilityId) {
      console.error("Error: Missing facilityId in update data", data);
      return;
    }
    return await updateFacilityService(
      { ...data, societyId: data.societyId, facilityId: data.facilityId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Facility Updated successfully.");
      }
    }).catch((err) => {
      console.error("Update failed:", err);
      toast.error("Failed to update facility.");
    });
  };
  
  
  return { createFacilityHandler, getFacilityHandler ,deleteFacilityByIdHandler,getFacilityDataByIdHandler,updateFacilityHandler};
};

export default FacilityHandler;