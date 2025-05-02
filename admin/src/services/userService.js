

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
      "Content-Type": "application/json",
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

// export const approveUserService = (userId, unitId, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/approve`;

//   return axios.post(
//     url,
//     { userId, unitId },  // Ensure userId and unitId are passed here
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
// };

export const approveUserService = (userId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/approve`;

   return axios.post(
    url,
    { userId }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectUserService = (userId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/reject`;

  return axios.post(
    url,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};


export const getAllApprovedUserDataService = (societyId, token, { page, pageSize }) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/resident/approvedUser/${societyId}`;

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
