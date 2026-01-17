<<<<<<< HEAD
import toast from "react-hot-toast";
import { updateSocietyModeratorService } from "../services/userService";
import { useSelector } from "react-redux";

const UserHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const updateResidentBySocietyIdHandler = async (userId, residentData) => {
    try {
      if (!token || !userId) {
        throw new Error("Missing token or userId");
      }
=======
import toast from 'react-hot-toast';
import {

  updateSocietyModeratorService,
 
} from '../services/userService';
import { useSelector } from 'react-redux';

const UserHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId); const updateResidentBySocietyIdHandler = async (residentData) => {
    try {
      if (!token || !userId) throw new Error("Missing token or user ID");
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

      const formData = new FormData();
      formData.append("firstName", residentData.firstName);
      formData.append("lastName", residentData.lastName);
      formData.append("mobileNumber", residentData.mobileNumber);

<<<<<<< HEAD
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

  return {
    updateResidentBySocietyIdHandler,
  };
};

export default UserHandler;
=======
      if (residentData.photo instanceof File) {
        formData.append("photo", residentData.photo);
      }

      const response = await updateSocietyModeratorService(userId, formData, token);
      return response;
    } catch (error) {
      console.error("Error in updateResidentBySocietyIdHandler:", error);
      return null;
    }
  };
return {
    updateResidentBySocietyIdHandler,
  
  };
};

export default UserHandler;
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
