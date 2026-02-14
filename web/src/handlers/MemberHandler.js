import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getMyUnitMembersService,
  getAllMembersService,
} from "@/services/memberService";

const MemberHandler = () => {
  const token = useSelector((state) => state.auth?.token);
  const userId = useSelector((state) => state.auth?.user?.userId);

  const handleError = (error) => {
    if (error === "TOKEN_MISSING") toast.error("Please login again");
    else if (error === "USER_ID_MISSING") toast.error("User not found");
    else if (error?.response?.status === 401)
      toast.error("Session expired");
    else toast.error("Failed to fetch data");
  };

  // ✅ Fetch tenant unit
  const fetchUserUnits = async () => {
    try {
      const res = await getMyUnitMembersService(userId, token);

      console.log("USER UNIT API RESPONSE 👉", res.data);

      return (
        res.data?.units ||
        res.data?.data ||
        (Array.isArray(res.data) ? res.data : [])
      );
    } catch (error) {
      handleError(error);
      return [];
    }
  };

  // ✅ Fetch all members of owner's units
  const fetchAllMembers = async () => {
    try {
      const res = await getAllMembersService(token);
        return res.data?.data || [];
    } catch (error) {
      handleError(error);
      return [];
    }
  };




  return { fetchUserUnits, fetchAllMembers };
};

export default MemberHandler;
