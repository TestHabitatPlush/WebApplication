import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getParkingDetailsService = async (societyId, token) => {
  const response = await axios.get(
    `${BASE_URL}/parking/${societyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { success, message, data }
};
