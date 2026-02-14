import toast from "react-hot-toast";
import { updateSocietyModeratorService,getUsersBySocietyIdService } from "../services/userService";
import { useSelector } from "react-redux";

const UserHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const updateResidentBySocietyIdHandler = async (userId, residentData) => {
    try {
      if (!token || !userId) {
        throw new Error("Missing token or userId");
      }

      const formData = new FormData();
      formData.append("firstName", residentData.firstName);
      formData.append("lastName", residentData.lastName);
      formData.append("mobileNumber", residentData.mobileNumber);

      if (residentData.photo) {
        formData.append("photo", residentData.photo);
      }

      const response = await updateSocietyModeratorService(
        userId,
        formData,
        token
      );

      toast.success("Profile updated successfully");
      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Failed to update profile");
      return null;
    }
  };

 const getUsersBySocietyHandler = async (societyIdParam, token, { page = 0, pageSize = 10, roleCategory } = {}) => {
  try {
    if (!societyIdParam || !token) {
      throw new Error("Missing societyId or token");
    }

    const response = await getUsersBySocietyIdService(societyIdParam, token, { page, pageSize, roleCategory });

    return response.data.data || []; // backend returns { success, count, data }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to load users");
    return [];
  }
};
  return {
    updateResidentBySocietyIdHandler,
    getUsersBySocietyHandler
  };
};

export default UserHandler;
