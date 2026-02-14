// handlers/AddressHandler.js
import axios from "axios";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const getAddressByIdHandler = async (addressId) => {
  if (!addressId) return null;

  try {
    const res = await axios.get(`${API_URL}/address/${addressId}`);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn("No address found for:", addressId);
      return null;
    }
    console.error("Error fetching address:", error);
    return null;
  }
};
