import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getJobProfilesBySocietyService = (societyId, token) => {
  return axios.get(
    `${BASE_URL}/jobProfile/society/${societyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } 
  );
};
