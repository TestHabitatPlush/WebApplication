// handlers/MemberHandler.js
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createMemberService } from "@/services/memberService";

const MemberHandler = () => {
  const token = useSelector((state) => state.auth.token); // ✅ Redux token

  const createMemberHandler = async (data) => {
    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    try {
      const res = await createMemberService(data, token);
      if (res.status === 201) {
        toast.success("Member created successfully.");
        return res;
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error creating member.");
      console.error("API Error:", err);
    }
  };

  return {
    createMemberHandler,
  };
};

export default MemberHandler;
