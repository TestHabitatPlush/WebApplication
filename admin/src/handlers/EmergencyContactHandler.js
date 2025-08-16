import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createEmergencyContactByUserIdService,
  getEmergencyContactsByUserIdService,
  createEmergencyContactBySocietyService,
  getEmergencyContactBySocietyIdService,
  updateEmergencyContactService,
  deleteEmergencyContactService,
} from "../services/emerencyContactService"; 

const EmergencyContactHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.userId);

  // Super Admin
  const createEmergencyContactBySuperAdminHandler = async ({ userId, data }) => {
    try {
      const response = await createEmergencyContactByUserIdService(userId, token, data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Emergency contact created successfully by Super Admin.");
        return response.data;
      }
    } catch (error) {
      toast.error("Super Admin Error: " + (error.response?.data?.message || error.message));
    }
  };

  // Society Admin
  const createEmergencyContactBySocietyAdminHandler = async ({ societyId, userId, data }) => {
    try {
      if (!userId || !societyId) {
        toast.error("Missing userId or societyId.");
        return null;
      }

      const response = await createEmergencyContactBySocietyService(societyId, userId, data, token);
      if (response.status === 200 || response.status === 201) {
        toast.success("Emergency contact created successfully by Society Admin.");
        return response.data;
      } else {
        toast.error("Unexpected response status: " + response.status);
        return null;
      }
    } catch (error) {
      toast.error("Society Admin Error: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const getEmergencyContactUserHandler = async (userId, params = {}) => {
    try {
      const response = await getEmergencyContactsByUserIdService(userId, params, token); // ✅ corrected
      return response.data;
    } catch (error) {
      toast.error("Error fetching Emergency Contacts: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const getEmergencyContactSocietyHandler = async (societyId, userId, params = {}) => {
    try {
      const response = await getEmergencyContactBySocietyIdService(societyId, userId, params, token);
      return response.data;
    } catch (error) {
      toast.error("Error fetching Emergency Contacts: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const deleteEmergencyContactByIdHandler = async (contactId) => {
    try {
      const response = await deleteEmergencyContactService( contactId, token);
      if (response.status === 200) {
        toast.success("Emergency Contact deleted successfully.");
        return true;
      }
    } catch (error) {
      toast.error("Failed to delete Emergency Contact: " + (error.response?.data?.message || error.message));
      return false;
    }
  };

  const updateEmergencyContactHandler = async (data) => {
    try {
      const response = await updateEmergencyContactService(
        {
          ...data,
        
          contactId: data.contactId,
        },
        token
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Emergency Contact updated successfully.");
        return response.data;
      }
    } catch (error) {
      toast.error("Failed to update Emergency Contact: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  return {
    createEmergencyContactBySuperAdminHandler,
    createEmergencyContactBySocietyAdminHandler,
    getEmergencyContactUserHandler,
    getEmergencyContactSocietyHandler,
    deleteEmergencyContactByIdHandler,
    updateEmergencyContactHandler,
  };
};

export default EmergencyContactHandler;