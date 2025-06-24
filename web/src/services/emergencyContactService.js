// emergencyContactService.js
import axios from "axios";

export const getEmergencyContactByUserIdService = async (userId, token, params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/emergencyContact/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
