import axios from "axios";

export const updateSocietyModeratorService = (userId, formData, token) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
