import axios from "axios";

export const defineTicketPurpousService = (data, token) => {
  console.log("services", data);

  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getDefineTicketPurpousService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const getTicketListService = (data, token) => {
  // console.log("getTicketListService", data);

  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/ticketlistview`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const getTicketStatusService = (token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/refticketstatus`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: data,
  });
};

export const createTicketService = (data, token) => {
  console.log("create ticket Service", data);

  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/createTicket`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // params: data,
  });
};

export const updateTicketPurposeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/updateTicketPurpous/${data.ticket_purpose_Id}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getTicketTableService = (data, token) => {
  console.log("ticket table service", data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/getTicketTable`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: data,
  });
};

export const getTypeCatagorisationService = (token) => {
  console.log("ticket catagorisation");
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/typeofrequest`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // params: data,
  });
};

export const getAccessManagementService = (data, token) => {
  console.log("get Access Management Service", data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/accessmanagement`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: data,
  });
};

export const sendAccessManagementService = (data, token) => {
  console.log("serice data", data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/softwarehelpdesk/socityaccessmanagementcreate`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
