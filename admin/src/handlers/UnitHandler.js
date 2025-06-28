
import {
getAllUnitBySocietyIdService,deleteUnitByIdService,updateUnitService
} from "../services/unitService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UnitHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);


 const getAllUnitHandler = async () => {
    return await getAllUnitBySocietyIdService(societyId, token) // Pass societyId
      .then((res) => res)
      .catch((err) => {
        console.error("Error fetching Units:", err);
      });
  };

  const deleteUnitHandler = async (id) => {
    try {
         const response = await deleteUnitByIdService(id, token);
         if (response.status === 200) {
          // toast.success("Unit deleted successfully");
           return response.data;
         } else {
          // toast.error("Failed to delete the Unit");
         }
       } catch (err) {
         console.error("Error deleting Unit:", err);
       //  toast.error("An error occurred while deleting the Unit.");
       }
  };

  const updateUnitHandler = async (data) => {
        try {
          console.log("Updating parking data:", data);
          const response = await updateUnitService(
            { ...data, unitId: data.unitId},
            token
          );
      
          console.log("API Response:", response);
      
          if (response && (response.status === 200 || response.status === 201)) {
            toast.success("unit Updated successfully.");
          } else {
            console.error("Unexpected status code:", response.status);
            toast.error("Failed to update unit.");
          }
        } catch (err) {
          console.error("Update failed:", err);
          toast.error(
            "Failed to update unit: " + (err.response?.data?.message || err.message)
          );
        }
      };
      
  return {
    getAllUnitHandler,
    deleteUnitHandler,
    updateUnitHandler
  };
};
export default UnitHandler;
