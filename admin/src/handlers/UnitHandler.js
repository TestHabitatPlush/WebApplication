
import {
getAllUnitBySocietyIdService
} from "../services/unitService";
import { useSelector } from "react-redux";

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


  return {
    getAllUnitHandler
  };
};
export default UnitHandler;
