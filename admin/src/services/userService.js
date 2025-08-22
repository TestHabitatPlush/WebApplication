

import axios from "axios";

export const createSocietyModeratorService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/admin/create-society-user`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
      
    },
  });
};


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


export const createSocietyResidentService = async (societyId, token, data) => {
 
  const url =`${process.env.REACT_APP_PUBLIC_API_URL}/users/create-resident/${societyId}`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
     // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
    },
  });
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
    },
    params: data,
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

export const updateSocietyModeratorService = async (userId, formData, token) => {
  if (!token || !userId) throw new Error("Missing token or user ID");

  return await axios.put(
    `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSocietyModeratorService = (societyId, token, params = {}) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/2`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // will be ignored if empty
  });
};


// export const createBulkSocietyUserService = async (societyId, token, data) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/bulk-create/${societyId}`;
//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }

// ✅ Manual Bulk Create (JSON array)
export const createBulkSocietyUserService = async (societyId, token, users) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/bulk-create/${societyId}`;
  return axios.post(url, { users }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// ✅ File Upload Bulk Create (Excel/CSV)
export const createMultipleSocietyUserService = async (societyId, token, file) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/bulk-create/${societyId}`;
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};