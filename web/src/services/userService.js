

import axios from "axios";


export const updateSocietyModeratorService = async (userId, formData, token) => {
  if (!token || !userId) throw new Error("Missing token or user ID");

  return await axios.put(
    `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

