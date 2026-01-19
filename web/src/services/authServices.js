import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginService = (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const jobProfileLoginService = (data) => {
  return axios.post(`${API_URL}/auth/job-profile-login`, data);
};


