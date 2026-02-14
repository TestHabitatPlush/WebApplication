import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch a single address by ID
export const getAddressByIdService = (addressId) => api.get(`/address/${addressId}`);
