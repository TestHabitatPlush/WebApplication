
import { approveGateServices } from "../services/approvedGateService";
import { useSelector } from "react-redux";

const ApprovedGateUserHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const getApprovedGateUserHandler = async (data) => {
    console.log("approved get data", data);

    return await approveGateServices({ ...data, societyId}, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    getApprovedGateUserHandler,
  };
};

export default ApprovedGateUserHandler;
