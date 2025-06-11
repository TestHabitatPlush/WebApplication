import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { userGroupNoticeService } from "../services/UserGroupService";

const UserGroupHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const getUserGroupHandler = async () => {
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }

    try {
      const response = await userGroupNoticeService(token);
      return response;
    } catch (err) {
      console.error("User group fetch error:", err);
      toast.error("Failed to fetch user groups.");
    }
  };

  return {
    getUserGroupHandler,
  };
};

export default UserGroupHandler;
