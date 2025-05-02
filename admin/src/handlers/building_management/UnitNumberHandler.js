import { useSelector } from "react-redux";
import { getUnitNumbersService } from "../../services/building_management/unitNumberService";

const UnitNumberHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const getUnitNumbersHandler = async (data) => {
    return await getUnitNumbersService({ ...data, societyId }, token);
  };

  return { getUnitNumbersHandler };
};

export default UnitNumberHandler;
