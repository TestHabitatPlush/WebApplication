

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


<<<<<<< HEAD
export const updateModeratorStatusService = async ( data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderators/${data.id}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
=======
export const updateModeratorStatusService = async (id, payload, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderators/${id}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await axios.put(url, payload, { headers });
  return response.data;
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
};