// handlers/EmergencyContactHandler.js

import { useSelector } from "react-redux";
import { getEmergencyContactByUserIdService } from "@/services/emergencyContactService";

const EmergencyContactHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);
  const societyId = useSelector(
    (state) => state.society.selectedSocietyId
  );

  const getEmergencyContactUserHandler = async () => {
    try {
      if (!societyId || !userId || !token) {
        console.error("Missing auth params", {
          societyId,
          userId,
          token,
        });
        return { success: false, data: [] };
      }

      const res = await getEmergencyContactByUserIdService(
        societyId,
        userId,
        token
      );

      return { success: true, data: res?.data || [] };
    } catch (error) {
      console.error("Error fetching emergency contact:", error);
      return { success: false, data: [] };
    }
  };

  return { getEmergencyContactUserHandler };
};

export default EmergencyContactHandler;
