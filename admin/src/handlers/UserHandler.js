<<<<<<< HEAD
// ✅ Rectified UserHandler.js with added logic for both Activate and Inactivate

=======
// handlers/UserHandler.js
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
import toast from 'react-hot-toast';
import {
  createSocietyModeratorService,
  createSocietyResidentService,
  getResidentBySocietyIdService,
  getUserByIdService,
  getAllUserDataService,
  getAllApprovedUserDataService,
  getAllDeactiveUserDataService,
  updateUsersForApprovedAndRejectService,
  updateModeratorStatusService,
} from '../services/userService';
import { useSelector } from 'react-redux';

const UserHandler = () => {
  const token = useSelector((state) => state.auth.token);

  const createSocietyModeratorHandler = async (formData) => {
    try {
      const response = await createSocietyModeratorService(formData, token);
      if (response.status === 201) {
        toast.success('Society Moderator created successfully!');
      }
    } catch (error) {
      console.error('Error creating moderator:', error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const createSocietyResidentUserHandler = async (societyId, formData) => {
    try {
      const response = await createSocietyResidentService(societyId, token, formData);
      if (response.status === 201) {
        toast.success('Society Resident created successfully!');
      }
    } catch (error) {
      console.error('Error creating resident:', error);
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

<<<<<<< HEAD
  const getResidentBySocietyIdHandler = async (societyId, token, { page, pageSize }) => {
=======
  const getResidentBySocietyIdHandler = async (societyId, { page, pageSize }) => {
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
    try {
      const response = await getResidentBySocietyIdService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getAllUserDataHandler = async () => {
    try {
      const response = await getAllUserDataService(token);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getUserByIdHandler = async (id) => {
    try {
      const response = await getUserByIdService(id, token);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  };

<<<<<<< HEAD
  const getAllApprovedUserDataHandler = async (societyId, token, data) => {
=======
  const getAllApprovedUserDataHandler = async (societyId, data) => {
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
    try {
      const response = await getAllApprovedUserDataService(societyId, token, data);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved user data:', error);
      return null;
    }
  };

<<<<<<< HEAD
  const getAllDeactiveUserDataHandler = async (societyId, token, { page, pageSize }) => {
=======
  const getAllDeactiveUserDataHandler = async (societyId, { page, pageSize }) => {
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
    try {
      const response = await getAllDeactiveUserDataService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching deactivate user data:', error);
      return null;
    }
  };

  const updateUserForApprovedAndRejectHandler = async (data) => {
    try {
      const response = await updateUsersForApprovedAndRejectService(data, token);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

<<<<<<< HEAD
  // ✅ ADDED: Two separate handlers for activating and inactivating moderators
  const activateModeratorHandler = async (id) => {
    try {
      await updateModeratorStatusService({ id, status: 'active' }, token);
      toast.success('Moderator status changed to "active"');
      return 'active';
    } catch (error) {
      console.error('Activate error:', error);
      toast.error(error?.response?.data?.message || 'Failed to activate moderator');
      return null;
    }
  };

  const inactivateModeratorHandler = async (id) => {
    try {
      await updateModeratorStatusService({ id, status: 'inactive' }, token);
      toast.success('Moderator status changed to "inactive"');
      return 'inactive';
    } catch (error) {
      console.error('Inactivate error:', error);
      toast.error(error?.response?.data?.message || 'Failed to inactivate moderator');
      return null;
=======
  const activateModeratorHandler = async (userId) => {
    try {
      const payload = { status: 'active' };
      const res = await updateModeratorStatusService(userId, payload, token);
      toast.success('Moderator activated successfully');
      return res.updatedModerator?.status;
    } catch (err) {
      console.error('Activate error:', err);
      toast.error(err?.response?.data?.message || 'Activation failed');
    }
  };

  const inactivateModeratorHandler = async (userId) => {
    try {
      const payload = { status: 'inactive' };
      const res = await updateModeratorStatusService(userId, payload, token);
      toast.success('Moderator inactivated successfully');
      return res.updatedModerator?.status;
    } catch (err) {
      console.error('Inactivate error:', err);
      toast.error(err?.response?.data?.message || 'Inactivation failed');
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
    }
  };

  return {
    createSocietyModeratorHandler,
    createSocietyResidentUserHandler,
    getResidentBySocietyIdHandler,
    getUserByIdHandler,
    getAllUserDataHandler,
    getAllApprovedUserDataHandler,
    getAllDeactiveUserDataHandler,
    updateUserForApprovedAndRejectHandler,
    activateModeratorHandler,
    inactivateModeratorHandler,
  };
};

export default UserHandler;