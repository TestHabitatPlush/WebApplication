//  Rectified UserHandler.js with added logic for both Activate and Inactivate

import toast from 'react-hot-toast';
import {
  
  createSocietyResidentService,
  createBulkSocietyUserService,
  getResidentBySocietyIdService,
  getUserByIdService,
  getAllUserDataService,
  getAllApprovedUserDataService,
  getAllDeactiveUserDataService,
  updateUsersForApprovedAndRejectService,
  updateModeratorStatusService,
  updateSocietyModeratorService,
  getSocietyModeratorService,
  createMultipleSocietyUserService,
  updateUserIdStatusService
} from '../services/userService';
import { useSelector } from 'react-redux';

const UserHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);
  

  const createSocietyResidentUserHandler = async (societyId, formData) => {
    try {
      const response = await createSocietyResidentService(societyId, token, formData);
      
      console.log("society response",response);
      if (response.status === 201) {
        toast.success('Society Resident created successfully!');
      }
      return response;
    } catch (error) {
      console.error('Error creating resident:', error);
      toast.error(error?.response?.data?.message || 'An error occurred. Please try again.');
      return null;
    }
  };
// const createSocietyResidentUserHandler = async (societyId, residentData) => {
//   try {
//     const {
//       units = [], // array of selected unit IDs
//       firstName,
//       lastName,
//       mobileNumber,
//       email,
//       photo,
//       ...rest
//     } = residentData;

//     if (!units.length) {
//       toast.error("Please select at least one unit");
//       return null;
//     }

//     // ✅ FIRST UNIT → User table
//     const primaryUnitId = units[0];

//     // ✅ OTHER UNITS → UserUnit table
//     const userUnits = units.slice(1).map((unitId) => ({
//       unitId,
//     }));

//     const formData = new FormData();

//     // basic fields
//     formData.append("firstName", firstName);
//     formData.append("lastName", lastName);
//     formData.append("mobileNumber", mobileNumber);
//     formData.append("email", email);

//     // ✅ MAIN UNIT
//     formData.append("unitId", primaryUnitId);

//     // ✅ EXTRA UNITS
//     if (userUnits.length) {
//       formData.append("userUnits", JSON.stringify(userUnits));
//     }

//     // photo
//     if (photo instanceof File) {
//       formData.append("photo", photo);
//     }

//     // any extra fields
//     Object.keys(rest).forEach((key) => {
//       if (rest[key] !== undefined && rest[key] !== null) {
//         formData.append(key, rest[key]);
//       }
//     });

//     const response = await createSocietyResidentService(
//       societyId,
//       token,
//       formData
//     );

//     if (response.status === 201) {
//       toast.success("Society Resident created successfully!");
//     }

//     return response;
//   } catch (error) {
//     console.error("Error creating resident:", error);
//     toast.error(
//       error?.response?.data?.message || "Failed to create resident"
//     );
//     return null;
//   }
// };

  const getResidentBySocietyIdHandler = async (societyId, { page, pageSize }) => {
    try {
      const response = await getResidentBySocietyIdService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const getAllUserDataHandler = async () => {
    try {
      const response = await getAllUserDataService(token);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
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

  const getAllApprovedUserDataHandler = async (societyId, data) => {
    try {
      const response = await getAllApprovedUserDataService(societyId, token, data);
      return response.data;
    } catch (error) {
      console.error('Error fetching approved user data:', error);
      return null;
    }
  };

  const getAllDeactiveUserDataHandler = async (societyId, { page, pageSize }) => {
    try {
      const response = await getAllDeactiveUserDataService(societyId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error('Error fetching deactivated user data:', error);
      return null;
    }
  };

  const updateUserForApprovedAndRejectHandler = async (data) => {
    try {
      const response = await updateUsersForApprovedAndRejectService(data, token);
      return response;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  };

  // ✅ Separate handlers for activating and inactivating moderators
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
    }
  };
  // const createBulkSocietyUserHandler = async (societyId, formData) => {
  //   try {
  //     const response = await createBulkSocietyUserService(societyId, token, formData)
  //     if (response.status === 201) {
  //       toast.success("Society Resident users created Success!");
  //     }
  //   } catch (error) {
  //     console.error("Error creating resident:", error);
  //   }
  // }

  const updateResidentBySocietyIdHandler = async (residentData) => {
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

  const getSocietyModeratorHandler = async (societyId, params) => {
    try {
      const response = await getSocietyModeratorService(societyId, token, params);
      console.log("API Full Response:", response);
      return response.data?.moderator || [];
    } catch (error) {
      console.error("Error fetching society moderator:", error);
      return [];
    }
  };


const createBulkSocietyUserHandler = async (societyId, token, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file); // 👈 field must be "file"

    const response = await createBulkSocietyUserService(societyId, token, formData);

    if (response.status === 201) {
      toast.success(
        response.data.message || "Society resident users created successfully!"
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error creating bulk users:", error.response?.data || error);
    toast.error(error?.response?.data?.message || "Failed to create bulk users");
    return null;
  }
};
// Bulk create via JSON
 const createMultipleSocietyUserHandler = async (societyId, token, users) => {
  try {
    // ✅ unwrap if object has "users"
    const payload = Array.isArray(users) ? users : users.users;

    if (!Array.isArray(payload)) {
      throw new Error("Users data must be an array");
    }

    const response = await createMultipleSocietyUserService(societyId, token, payload);

    if (response.status === 201) {
      toast.success(response.data.message || "Society resident users created successfully!");
    }
    return response.data;
  } catch (error) {
    console.error("Error in multiple user creation:", error.response?.data || error);
    toast.error(error?.response?.data?.message || "Failed to create multiple users");
    return null;
  }
};


  const updateUserIdStatusHandler = async (userId, token, data) => {
    try {
      const response = await updateUserIdStatusService(userId, token, data);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating user status by ID:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  return {
   
    createSocietyResidentUserHandler,
    getResidentBySocietyIdHandler,
    getUserByIdHandler,
    getAllUserDataHandler,
    getAllApprovedUserDataHandler,
    getAllDeactiveUserDataHandler,
    updateUserForApprovedAndRejectHandler,
    activateModeratorHandler,
    inactivateModeratorHandler,
    updateResidentBySocietyIdHandler,
    getSocietyModeratorHandler,
    createBulkSocietyUserHandler,
    createMultipleSocietyUserHandler,
    
    updateUserIdStatusHandler
  };
};

export default UserHandler;


