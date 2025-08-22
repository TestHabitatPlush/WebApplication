// "use clent"

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // 1. Ticket Status
// export const createRefTicketStatusService = (data, token) =>
//   axios.post(`${API_URL}/softwarehelpdesk/refticketstatus`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getRefTicketStatusService = (token) =>
//   axios.get(`${API_URL}/softwarehelpdesk/refticketstatus`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 2. Ticket Purpose
// export const createTicketPurposeService = (societyId, userId, data, token) =>
//   axios.post(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}/${userId}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeService = (societyId, token, params = {}) =>
//   axios.get(`${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketPurposeService = (ticket_purpose_Id, data, token) =>
//   axios.put(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/${ticket_purpose_Id}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeDropdownService = (societyId, token) =>
//   axios.get(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/dropdown/${societyId}`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// // 3. Ticket Summary
// export const createTicketService = (userId, societyId, formData, token) =>
//   axios.post(
//     `${API_URL}/softwarehelpdesk/ticket/create/${userId}/${societyId}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

// export const getTicketTableService = (userId, societyId, token, params = {}) =>
//   axios.get(`${API_URL}/softwarehelpdesk/ticket/${userId}/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) =>
//   axios.put(`${API_URL}/softwarehelpdesk/ticket/${ticket_Id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getAssignableUsersService = (societyId, token) =>
//   axios.get(`${API_URL}/softwarehelpdesk/accessmanagement/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// "use client";

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // 1. Ticket Status
// export const createRefTicketStatusService = (data, token) =>
//   axios.post(`${API_URL}/softwarehelpdesk/refticketstatus`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getRefTicketStatusService = (token) =>
//   axios.get(`${API_URL}/softwarehelpdesk/refticketstatus`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 2. Ticket Purpose
// export const createTicketPurposeService = (societyId, userId, data, token) =>
//   axios.post(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}/${userId}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeService = (societyId, token, params = {}) =>
//   axios.get(`${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketPurposeService = (ticket_purpose_Id, data, token) =>
//   axios.put(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/${ticket_purpose_Id}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeDropdownService = (societyId, token) =>
//   axios.get(
//     `${API_URL}/softwarehelpdesk/ticket-purpose/dropdown/${societyId}`,
//     console.log(
//       `${API_URL}/softwarehelpdesk/ticket-purpose/dropdown/${societyId}`
//     ),
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// // 3. Ticket Summary
// export const createTicketService = (userId, societyId, formData, token) =>
//   axios.post(
//     `${API_URL}/softwarehelpdesk/ticket/create/${userId}/${societyId}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

// export const getTicketTableService = (userId, societyId, token, params = {}) =>
//   axios.get(`${API_URL}/softwarehelpdesk/ticket/${userId}/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) =>
//   axios.put(`${API_URL}/softwarehelpdesk/ticket/${ticket_Id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 4. Access Management
// export const getAssignableUsersService = (societyId, token) =>
//   axios.get(`${API_URL}/softwarehelpdesk/accessmanagement/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });



"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Ticket Status
export const createRefTicketStatusService = (data, token) => {
  const url = `${API_URL}/softwarehelpdesk/refticketstatus`;
  console.log("API CALL:", url);
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getRefTicketStatusService = (token) => {
  const url = `${API_URL}/softwarehelpdesk/refticketstatus`;
  console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 2. Ticket Purpose
export const createTicketPurposeService = (societyId, userId, data, token) => {
  const url = `${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}/${userId}`;
  console.log("API CALL:", url);
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTicketPurposeService = (societyId, token, params = {}) => {
  const url = `${API_URL}/softwarehelpdesk/ticket-purpose/${societyId}`;
  console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};

export const updateTicketPurposeService = (
  ticket_purpose_Id,
  data,
  token
) => {
  const url = `${API_URL}/softwarehelpdesk/ticket-purpose/${ticket_purpose_Id}`;
  console.log("API CALL:", url);
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTicketPurposeDropdownService = (societyId, token) => {
  const url = `${API_URL}/softwarehelpdesk/ticket-purpose/dropdown/${societyId}`;
  console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 3. Ticket Summary
export const createTicketService = (userId, societyId, formData, token) => {
  const url = `${API_URL}/softwarehelpdesk/ticket/create/${userId}/${societyId}`;
  console.log("API CALL:", url);
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTicketTableService = (userId, societyId, token, params = {}) => {
  const url = `${API_URL}/softwarehelpdesk/ticket/${userId}/${societyId}`;
  console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};

export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) => {
  const url = `${API_URL}/softwarehelpdesk/ticket/${ticket_Id}`;
  console.log("API CALL:", url);
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 4. Access Management
export const getAssignableUsersService = (societyId, token) => {
  const url = `${API_URL}/softwarehelpdesk/accessmanagement/${societyId}`;
  console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
