// "use clent"

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // 1. Ticket Status
// export const createRefTicketStatusService = (data, token) =>
//   axios.post(`${API_URL}/societyhelpdesk/refticketstatus`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getRefTicketStatusService = (token) =>
//   axios.get(`${API_URL}/societyhelpdesk/refticketstatus`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 2. Ticket Purpose
// export const createTicketPurposeService = (societyId, userId, data, token) =>
//   axios.post(
//     `${API_URL}/societyhelpdesk/ticket-purpose/${societyId}/${userId}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeService = (societyId, token, params = {}) =>
//   axios.get(`${API_URL}/societyhelpdesk/ticket-purpose/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketPurposeService = (ticket_purpose_Id, data, token) =>
//   axios.put(
//     `${API_URL}/societyhelpdesk/ticket-purpose/${ticket_purpose_Id}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeDropdownService = (societyId, token) =>
//   axios.get(
//     `${API_URL}/societyhelpdesk/ticket-purpose/dropdown/${societyId}`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// // 3. Ticket Summary
// export const createTicketService = (userId, societyId, formData, token) =>
//   axios.post(
//     `${API_URL}/societyhelpdesk/ticket/create/${userId}/${societyId}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

// export const getTicketTableService = (userId, societyId, token, params = {}) =>
//   axios.get(`${API_URL}/societyhelpdesk/ticket/${userId}/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) =>
//   axios.put(`${API_URL}/societyhelpdesk/ticket/${ticket_Id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getAssignableUsersService = (societyId, token) =>
//   axios.get(`${API_URL}/societyhelpdesk/accessmanagement/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// "use client";

// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // 1. Ticket Status
// export const createRefTicketStatusService = (data, token) =>
//   axios.post(`${API_URL}/societyhelpdesk/refticketstatus`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// export const getRefTicketStatusService = (token) =>
//   axios.get(`${API_URL}/societyhelpdesk/refticketstatus`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 2. Ticket Purpose
// export const createTicketPurposeService = (societyId, userId, data, token) =>
//   axios.post(
//     `${API_URL}/societyhelpdesk/ticket-purpose/${societyId}/${userId}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeService = (societyId, token, params = {}) =>
//   axios.get(`${API_URL}/societyhelpdesk/ticket-purpose/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketPurposeService = (ticket_purpose_Id, data, token) =>
//   axios.put(
//     `${API_URL}/societyhelpdesk/ticket-purpose/${ticket_purpose_Id}`,
//     data,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// export const getTicketPurposeDropdownService = (societyId, token) =>
//   axios.get(
//     `${API_URL}/societyhelpdesk/ticket-purpose/dropdown/${societyId}`,
//     console.log(
//       `${API_URL}/societyhelpdesk/ticket-purpose/dropdown/${societyId}`
//     ),
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

// // 3. Ticket Summary
// export const createTicketService = (userId, societyId, formData, token) =>
//   axios.post(
//     `${API_URL}/societyhelpdesk/ticket/create/${userId}/${societyId}`,
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

// export const getTicketTableService = (userId, societyId, token, params = {}) =>
//   axios.get(`${API_URL}/societyhelpdesk/ticket/${userId}/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params,
//   });

// export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) =>
//   axios.put(`${API_URL}/societyhelpdesk/ticket/${ticket_Id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // 4. Access Management
// export const getAssignableUsersService = (societyId, token) =>
//   axios.get(`${API_URL}/societyhelpdesk/accessmanagement/${societyId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });



"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Ticket Status
export const createRefTicketStatusService = (data, token) => {
  const url = `${API_URL}/societyhelpdesk/refticketstatus`;
  // console.log("API CALL:", url);
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getRefTicketStatusService = (token) => {
  const url = `${API_URL}/societyhelpdesk/refticketstatus`;
  // console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 2. Ticket Purpose
export const createTicketPurposeService = (societyId, userId, data, token) => {
  const url = `${API_URL}/societyhelpdesk/ticket-purpose/${societyId}/${userId}`;
  // console.log("API CALL:", url);
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTicketPurposeService = (societyId, token, params = {}) => {
  const url = `${API_URL}/societyhelpdesk/ticket-purpose/${societyId}`;
  // console.log("API CALL:", url);
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
  const url = `${API_URL}/societyhelpdesk/ticket-purpose/${ticket_purpose_Id}`;
  // console.log("API CALL:", url);
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getTicketPurposeDropdownService = (societyId, token) => {
  const url = `${API_URL}/societyhelpdesk/ticket-purpose/dropdown/${societyId}`;
  // console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 3. Ticket Summary
export const createTicketService = (userId, societyId, formData, token) => {
  const url = `${API_URL}/societyhelpdesk/ticket/create/${userId}/${societyId}`;
  // console.log("API CALL:", url);
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getTicketTableService = (userId, societyId, token, params = {}) => {
  const url = `${API_URL}/societyhelpdesk/ticket/${userId}/${societyId}`;
  // console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });
};

export const updateTicketStatusAndRemarksService = (ticket_Id, data, token) => {
  const url = `${API_URL}/societyhelpdesk/ticket/${ticket_Id}`;
  console.log("API CALL:", url);
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 4. Access Management
export const getAssignableUsersService = (societyId, token) => {
  const url = `${API_URL}/societyhelpdesk/accessmanagement/${societyId}`;
  // console.log("API CALL:", url);
  return axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
