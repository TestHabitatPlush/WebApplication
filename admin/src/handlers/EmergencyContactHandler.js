import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createEmergencyContactService,
  getEmergencyContactService,
  deleteEmergencyContactService,
  updateEmergencyContactService,
} from "../services/emerencyContactService";

const EmergencyContactHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const createEmergencyContactHandler = async (data) => {
    try {
      if (!societyId) {
        toast.error("Society ID is missing. Cannot create emergency contact.");
        return;
      }
      const response = await createEmergencyContactService(societyId, token, data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Emergency contact created successfully.");
        return response.data;
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const getEmergencyContactHandler = async (params = {}) => {
    try {
      if (!societyId) {
        toast.error("Society ID is missing. Cannot fetch emergency contacts.");
        return null;
      }
      const response = await getEmergencyContactService(societyId, params, token);
      return response.data;
    } catch (error) {
      toast.error("Error fetching Emergency Contacts: " + (error.response?.data?.message || error.message));
      return null;
    }
  };

  const deleteEmergencyContactByIdHandler = async (contactId) => {
    try {
      const response = await deleteEmergencyContactService(contactId, token);
      if (response.status === 200) {
        toast.success("Emergency Contact deleted successfully.");
      }
      return response;
    } catch (err) {
      toast.error("Failed to delete Emergency Contact.");
      return null;
    }
  };
const updateEmergencyContactHandler = async (data) => {
  try {
    const response = await updateEmergencyContactService(
      {
        ...data,
        societyId: data.societyId,
        contactId: data.contactId, // ensure this is present
      },
      token
    );

    if (response && (response.status === 200 || response.status === 201)) {
      toast.success("Emergency Contact Updated successfully.");
      return response;
    } else {
      toast.error("Failed to update Emergency Contact.");
      return null;
    }
  } catch (err) {
    toast.error(
      "Failed to update Emergency Contact: " +
        (err.response?.data?.message || err.message)
    );
    return null;
  }
};


  return {
    createEmergencyContactHandler,
    getEmergencyContactHandler,
    deleteEmergencyContactByIdHandler,
    updateEmergencyContactHandler,
  };
};

export default EmergencyContactHandler;
