

import axios from "axios";


export const getResidentBySocietyIdService = (societyId, token, { page, pageSize }) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      page,      
      pageSize,  
    },
  });
};

export const getUserByIdService = (id, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/${id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const createSocietyResidentService = async (
  societyId,
  token,
  formData
) => {
  return axios.post(
    `${process.env.REACT_APP_PUBLIC_API_URL}/users/create-resident/${societyId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};




export const getAllUserDataService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users`;

  return axios.get(url, {
    headers: {
      Authorization:` Bearer ${token}`,
    },
    params: data,
  });
};



export const getAllApprovedUserDataService = (societyId, token, data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/approvedUser/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    
    params: data,
    },
  });
};


export const getAllDeactiveUserDataService = (societyId, token, { page, pageSize }) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/deactive/${societyId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      pageSize,
    },
  });
};

export const updateUsersForApprovedAndRejectService = (data, token) => {
  if (!data.societyId) {
    console.error("Society ID is missing in API request");
    return;
  }

  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/${data.societyId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const updateModeratorStatusService = async ( data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderators/${data.id}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// export const updateSocietyModeratorService = async (userId, formData, token) => {
//   if (!token || !userId) throw new Error("Missing token or user ID");

//   return await axios.put(
//     `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${userId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };


//update status
export const updateSocietyModeratorService = (userId, formData, token) => {
  return axios.put(
    `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT manually set multipart boundary
        // 'Content-Type': 'multipart/form-data'
      },
    }
  );
};


export const updateUserIdStatusService = (userId, token, data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/User/${userId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Bulk create using file upload (Excel/CSV)
export const createBulkSocietyUserService = async (societyId, token, formData) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/bulk-create/${societyId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
// Bulk create manually using JSON
export const createMultipleSocietyUserService = async (societyId, token, users) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/bulk-create/${societyId}`;

  // ✅ Ensure backend receives an array
  if (!Array.isArray(users)) {
    throw new Error("Users payload must be an array");
  }

  return axios.post(url, users, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateResidentBySocietyIdService = async (societyId, formData) => {
  try {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/${societyId}`;
    
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // return only the data if needed
  } catch (error) {
    console.error("Error updating resident:", error);
    throw error; // re-throw so the calling function can handle it
  }
};

export const getSocietyModeratorService = (societyId, token, params = {}) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${societyId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // will be ignored if empty
  });
};
//update super admin it 
export const updateSuperAdminITService = async (data, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PUBLIC_API_URL}/users/super-admin-it`, // Change base URL if needed
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Update Error:", error.response?.data || error.message);
    throw error;
  }
};