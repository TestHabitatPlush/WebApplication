
import { gateListServices } from "../services/gateListService"
import { useSelector } from "react-redux";

const GateListHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const getGateListHandler = async (data) => {
    console.log("approved get data", data);

    return await gateListServices({ ...data, societyId}, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getGateListHandler,
    // getUnitTypeHandler
    // getGateUserHandler,
  };
};

export default GateListHandler;
