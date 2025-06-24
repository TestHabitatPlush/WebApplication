import { useSelector } from "react-redux";
import { getEmergencyContactByUserIdService } from "@/services/emergencyContactService";

const EmergencyContactHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = 3;
  //useSelector((state) => state.auth.user?.userId); // ✅ Get userId safely

  const getEmergencyContactUserHandler = async (params = {}) => {
    try {
      if (!userId || !token) {
        console.error("Missing userId or token");
        return { success: false, data: [] };
      }

      const res = await getEmergencyContactByUserIdService(userId, params, token);
      return { success: true, data: res?.data };
    } catch (err) {
      console.error("Error fetching emergency contact:", err);
      return { success: false, data: [] };
    }
  };

  return { getEmergencyContactUserHandler };
};

export default EmergencyContactHandler;
