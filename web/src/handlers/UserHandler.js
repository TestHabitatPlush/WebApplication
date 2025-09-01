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

      const formData = new FormData();
      formData.append("firstName", residentData.firstName);
      formData.append("lastName", residentData.lastName);
      formData.append("mobileNumber", residentData.mobileNumber);

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