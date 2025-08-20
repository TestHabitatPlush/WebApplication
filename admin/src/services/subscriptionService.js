


import axios from "axios";

const API_URL = `${process.env.REACT_APP_PUBLIC_API_URL}/subscription-plans`;

export const createPlanService = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllSubscriptionsService = (data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/subscription-plans`;
  return axios.get(url, data);
};

export const deleteSubscriptionService = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; 
  } catch (error) {
    console.error("Delete subscription error:", error.response?.data || error.message);
    throw error;
  }
};
export const getSubscriptionByIdService = async (id, token) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const updateSubscriptionService = async (id, token, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};