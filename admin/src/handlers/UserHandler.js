// handlers/UserHandler.js
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
        return response.data;
      }
    } catch (error) {
      console.error('Error creating moderator:', error);
      toast.error(error.response?.data?.message || 'Moderator creation failed.');
    }
  };

  const createSocietyResidentUserHandler = async (societyId, formData) => {
    try {
      const response = await createSocietyResidentService(societyId, token, formData);
      if (response.status === 201) {
        toast.success('Society Resident created successfully!');
        return response.data;
      }
    } catch (error) {
      console.error('Error creating resident:', error);
      toast.error(error?.response?.data?.message || 'Resident creation failed.');
    }
  };

  const getResidentBySocietyIdHandler = async (societyId, { page, pageSize }) => {
    try {
      const response = await getResidentBySocietyIdService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching residents:', error);
      toast.error('Failed to fetch residents.');
    }
  };

  const getAllUserDataHandler = async () => {
    try {
      const response = await getAllUserDataService(token);
      return response.data;
    } catch (error) {
      console.error('Error fetching all user data:', error);
      toast.error('Failed to fetch all users.');
    }
  };

  const getUserByIdHandler = async (id) => {
    try {
      const response = await getUserByIdService(id, token);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      toast.error('Failed to fetch user.');
    }
  };

  const getAllApprovedUserDataHandler = async (societyId, filters) => {
    try {
      const response = await getAllApprovedUserDataService(societyId, token, filters);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved users:', error);
      toast.error('Failed to fetch approved users.');
    }
  };

  const getAllDeactiveUserDataHandler = async (societyId, { page, pageSize }) => {
    try {
      const response = await getAllDeactiveUserDataService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching deactivated users:', error);
      toast.error('Failed to fetch deactivated users.');
    }
  };

  const updateUserForApprovedAndRejectHandler = async (data) => {
    try {
      const response = await updateUsersForApprovedAndRejectService(data, token);
      toast.success('User status updated.');
      return response.data;
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status.');
    }
  };

  const activateModeratorHandler = async (userId) => {
    try {
      const payload = { status: 'active' };
      const res = await updateModeratorStatusService(userId, payload, token);
      toast.success('Moderator activated successfully');
      return res.updatedModerator?.status;
    } catch (error) {
      console.error('Error activating moderator:', error);
      toast.error(error?.response?.data?.message || 'Activation failed');
    }
  };

  const inactivateModeratorHandler = async (userId) => {
    try {
      const payload = { status: 'inactive' };
      const res = await updateModeratorStatusService(userId, payload, token);
      toast.success('Moderator inactivated successfully');
      return res.updatedModerator?.status;
    } catch (error) {
      console.error('Error inactivating moderator:', error);
      toast.error(error?.response?.data?.message || 'Inactivation failed');
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
