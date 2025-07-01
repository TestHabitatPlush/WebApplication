// handlers/MemberHandler.js
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createMemberService } from "@/services/memberService";

const MemberHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const createMemberHandler = async (formData) => {
    if (!token) {
      toast.error("You are not authenticated!");
      return;
    }

    try {
      const response = await createMemberService(formData, token);
      toast.success("Member created successfully!");
      return response;
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.response?.data?.message || "Failed to create member");
    }
  };

  return { createMemberHandler };
};

export default MemberHandler;
