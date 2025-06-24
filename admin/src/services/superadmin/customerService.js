import axios from "axios";

export const createCustomerService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCustomerService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
export const getCustomerDetailsByIdService = (id, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCustomerDetailsByIdService = (id, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCustomerStatusService = async (id, status, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;
  const payload = { status }; 

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.put(url, payload, { headers });
  return response.data;
};