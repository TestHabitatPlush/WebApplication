import axios from "axios"; 


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const getEmergencyContactByUserIdService = async (
  societyId,
  userId,
  token
) => {
  const response = await axios.get(
    `${BASE_URL}/emergencyContacts/society/${societyId}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
