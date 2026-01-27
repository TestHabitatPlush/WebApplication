// services/facilityService.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFacilityDetailsService = async (societyId, token) => {
  const response = await axios.get(
    `${BASE_URL}/facilityManagement/facility/${societyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
