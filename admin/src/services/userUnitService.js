import axios from "axios";



export const addUserUnitService = async (userId, unitId, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_PUBLIC_API_URL}/userUnit`,
    { userId, unitId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
