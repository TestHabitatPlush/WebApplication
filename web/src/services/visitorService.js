"use client";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement`;

// CREATE VISITOR ENTRY
export const createVisitorEntryService = (data, token) => {
  return axios.post(`${BASE_URL}/new-visit-entry`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// GET VISITOR RELATIONSHIP (Visitor Types)
export const getVisitorRelationshipService = (societyId, token) => {
  if (!societyId) throw new Error("societyId is required");

  return axios.get(`${BASE_URL}/visitor-relationship`, {
    params: { societyId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Get all visitor entries by senderId
export const getVisitorEntriesBySenderService = async (senderId, page = 0, pageSize = 5) => {
  const response = await axios.get(`${BASE_URL}/visitor-entries/sender/${senderId}`, {
    params: { page, pageSize },
  });
  return response.data;
};
// Get visitor by ID
export const getVisitorByIdService = async (visit_entry_Id) => {
  const response = await axios.get(`${BASE_URL}/visitor/${visit_entry_Id}`);
  return response.data;
};

// Get QR code by visitor ID
export const getQRCodeService = async (visit_entry_Id) => {
  const response = await axios.get(`${BASE_URL}/qrCode/${visit_entry_Id}`);
  return response.data;
};

// Delete visitor by ID
export const deleteVisitorService = async (visit_entry_Id) => {
  const response = await axios.delete(`${BASE_URL}  `);
  return response.data;
};
