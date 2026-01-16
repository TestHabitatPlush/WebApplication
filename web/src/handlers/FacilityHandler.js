// handlers/FacilityHandler.js
import { useSelector } from "react-redux";
import { getFacilityDetailsService } from "@/services/facilityService";

const FacilityHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.society.selectedSocietyId);

  const getFacilityDetailsHandler = async () => {
    if (!societyId || !token) {
      console.warn("Missing societyId or token");
      return [];
    }

    try {
      const res = await getFacilityDetailsService(societyId, token);
      // ✅ IMPORTANT
      return res?.data || [];
    } catch (error) {
      console.error("Error fetching facilities:", error);
      throw error;
    }
  };

  return { getFacilityDetailsHandler, societyId, token };
};

export default FacilityHandler;
