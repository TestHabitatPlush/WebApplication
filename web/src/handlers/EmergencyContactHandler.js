import { useSelector } from "react-redux";
import { getEmergencyContactByUserIdService } from "@/services/emergencyContactService";

const EmergencyContactHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = 3;
<<<<<<< HEAD
  const societyId = 2;
=======
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
  //useSelector((state) => state.auth.user?.userId); // ✅ Get userId safely

  const getEmergencyContactUserHandler = async (params = {}) => {
    try {
<<<<<<< HEAD
      if (!userId || !token || !societyId) {
=======
      if (!userId || !token) {
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
        console.error("Missing userId or token");
        return { success: false, data: [] };
      }

<<<<<<< HEAD
      const res = await getEmergencyContactByUserIdService(userId, societyId,params, token);
=======
      const res = await getEmergencyContactByUserIdService(userId, params, token);
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
      return { success: true, data: res?.data };
    } catch (err) {
      console.error("Error fetching emergency contact:", err);
      return { success: false, data: [] };
    }
  };

  return { getEmergencyContactUserHandler };
};

export default EmergencyContactHandler;
