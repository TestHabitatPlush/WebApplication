import axios from "axios";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

// 1. Ticket Status
export const createRefTicketStatusService = (data, token) =>
  axios.post(`${API_URL}/societyhelpdesk/refticketstatus`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRefTicketStatusService = (token) =>
  axios.get(`${API_URL}/societyhelpdesk/refticketstatus`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 2. Ticket Purpose
export const createTicketPurposeService = (societyId, userId, data, token) =>
  axios.post(
    `${API_URL}/societyhelpdesk/ticket-purpose/${societyId}/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getTicketPurposeService = (societyId, token, params = {}) =>
  axios.get(`${API_URL}/societyhelpdesk/ticket-purpose/${societyId}`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

export const updateTicketPurposeService = (ticket_purpose_Id, data, token) =>
  axios.put(
    `${API_URL}/societyhelpdesk/ticket-purpose/${ticket_purpose_Id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const getTicketPurposeDropdownService = (societyId, token) =>
  axios.get(
    `${API_URL}/societyhelpdesk/ticket-purpose/dropdown/${societyId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

// 3. Ticket Summary
export const createTicketService = (userId, societyId, formData, token) =>
  axios.post(
    `${API_URL}/societyhelpdesk/ticket/create/${userId}/${societyId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const getTicketTableService = (userId, societyId, token, params = {}) =>
  axios.get(`${API_URL}/societyhelpdesk/ticket/${userId}/${societyId}`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) =>
  axios.put(`${API_URL}/societyhelpdesk/ticket/${ticket_Id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });



export const getAssignableUsersService = (societyId, token) =>
  axios.get(`${API_URL}/societyhelpdesk/accessmanagement/${societyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
