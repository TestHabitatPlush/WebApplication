import axios from "axios";




export const getNeighbourService = (societyId, token, { page, pageSize }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/resident/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      page,      
      pageSize,  
    },
  });
};
