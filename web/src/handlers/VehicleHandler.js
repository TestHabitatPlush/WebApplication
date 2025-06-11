import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createVehicleBySocietyService} from "@/services/vehicleService";

const VehicleHandler = () => {
  const token = useSelector((state) => state.auth.token);
  //const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
  const userId = useSelector((state)=>state.auth.user.userId)

 
   const createVehicleHandler = async (data) => {
     try {
       const res = await createVehicleBySocietyService(userId, data, token);
       if (res.status === 201) {
         toast.success("Vehicle created successfully.");
         return res;
       }
     } catch (err) {
       toast.error(err.response?.data?.message || "Error creating Vehicle.");
       console.error(err);
     }
   };
 
  return {
    createVehicleHandler,
    
  };
};

export default VehicleHandler;
