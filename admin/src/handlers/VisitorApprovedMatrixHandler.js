import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getVisitorAprrovalMatrixService } from "../services/visitorApprovalMatrixService";

const VisitorApprovedMatrixHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);

  const getVisitorAprrovalMatrix = async (data) => {
    // console.log("jdsjhfjd", societyId);
    return await getVisitorAprrovalMatrixService({ ...data, societyId }, token)
      .then((res) => {
        console.log(res);

        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getVisitorAprrovalMatrix,
  };
};

export default VisitorApprovedMatrixHandler;
