<<<<<<< HEAD
import axios from "axios";

export const getEmergencyContactByUserIdService = async (societyId, userId, token, params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/emergencyContact/${societyId}/${userId}`;
  console.log("Calling API:", url); // ✅ confirm it's correct

  const response = await axios.get(url, {
=======
// emergencyContactService.js
import axios from "axios";

export const getEmergencyContactByUserIdService = async (userId, token, params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/emergencyContact/${userId}`;
  return axios.get(url, {
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
<<<<<<< HEAD

  console.log("API Response:", response.data); // ✅ debug response
  return response;
=======
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47
};
