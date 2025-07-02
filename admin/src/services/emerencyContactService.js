import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_PUBLIC_API_URL}/emergencyContact`;

// For Super Admin based creation

export const createEmergencyContactByUserIdService = async (userId, token, data) => {
  const url = `${BASE_URL}/${userId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
//get Super Admin
export const getEmergencyContactsByUserIdService = async (userId, params = {}, token) => {
  if (!userId) throw new Error("User ID is missing");

  const url = `${BASE_URL}/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

// For create Admin-level role needing societyId

export const createEmergencyContactBySocietyService = async (societyId, userId, data, token) => {
  const url = `${BASE_URL}/${societyId}/${userId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
// For get Admin-level role needing societyId

export const getEmergencyContactBySocietyIdService = async (societyId, userId,params, token) => {
  const url = `${BASE_URL}/${societyId}/${userId}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};

export const updateEmergencyContactService = async (data, token) => {
  const url = `${BASE_URL}/${data.contactId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteEmergencyContactService = async (contactId, token) => {
  const url = `${BASE_URL}/${contactId}`;
  return axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
