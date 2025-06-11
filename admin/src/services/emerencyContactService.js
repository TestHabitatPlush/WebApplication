import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_PUBLIC_API_URL}/contacts/emergency-contacts`;

export const createEmergencyContactService = async (societyId, token, data) => {
  const url = `${BASE_URL}/${societyId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getEmergencyContactService = async (societyId, params, token) => {
  const url = `${BASE_URL}/${societyId}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};

export const deleteEmergencyContactService = async (contactId, token) => {
  const url = `${BASE_URL}/${contactId}`;
  return axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateEmergencyContactService = async ( data, token) => {
  const url = `${BASE_URL}/${data.societyId}/${data.contactId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
