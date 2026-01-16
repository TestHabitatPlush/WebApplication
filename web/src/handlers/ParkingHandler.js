import { useSelector } from "react-redux";
import { getParkingDetailsService } from "@/services/parkingService";

const ParkingHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.society.selectedSocietyId);

  const getParkingDetailsHandler = async () => {
    if (!societyId || !token) return [];

    const res = await getParkingDetailsService(societyId, token);
    return res?.data || [];
  };

  return { getParkingDetailsHandler, societyId, token };
};

export default ParkingHandler;
