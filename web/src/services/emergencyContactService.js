import axios from "axios";

export const getEmergencyContactByUserIdService = async (societyId, userId, token, params = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/emergencyContact/${societyId}/${userId}`;
  console.log("Calling API:", url); // ✅ confirm it's correct

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  console.log("API Response:", response.data); // ✅ debug response
  return response;
};
