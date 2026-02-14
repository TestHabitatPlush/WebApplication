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
export const getUsersBySocietyIdService = (societyId, token, { page = 0, pageSize = 10, roleCategory } = {}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/society/${societyId}/users`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      page,
      pageSize,
      roleCategory, // optional query param
    },
  });
};