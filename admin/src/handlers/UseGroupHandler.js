import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { userGroupNoticeService } from "../services/UserGroupService";

const UserGroupHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);

  const getUserGroupHandler = async () => {
    console.log("get user handler user group");

    return await userGroupNoticeService({ societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getUserGroupHandler,
  };
};

export default UserGroupHandler;
