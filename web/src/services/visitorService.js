import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement`;

// Create Visitor Entry
export const createVisitorEntryService = async (data, token) => {
  return axios.post(`${BASE_URL}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Get Visitor Relationships by SocietyId
export const getVisitorRelationshipService = async (data, token) => {
  return axios.get(`${BASE_URL}/relationship`, {
    headers: { Authorization: `Bearer ${token}` },
    params: data,
  });
};

// Get Visitor List for Resident by senderId
export const getVisitorListForResidentService = async (senderId, token, data = {}) => {
  return axios.get(`${BASE_URL}/resident/${senderId}`, {
    headers: { Authorization: `Bearer ${token}` },
    params: data,
  });
};

// Get QR Code by Visit Entry ID
export const getQrCodeByIdService = async (visitEntryId, token) => {
  return axios.get(`${BASE_URL}/qrcode/${visitEntryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete Visitor
export const deleteVisitorService = async (id, token) => {
  return axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get Visitor Entry by ID
export const getVisitorEntryByIdService = async (id, token) => {
  return axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Get Visitor Entry Table
export const getVisitorEntryTableService = async (data, token) => {
  return axios.get(`${BASE_URL}/table`, {
    headers: { Authorization: `Bearer ${token}` },
    params: data,
  });
};
