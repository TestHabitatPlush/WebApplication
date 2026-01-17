<<<<<<< HEAD
import axios from "axios";

export const updateSocietyModeratorService = (userId, formData, token) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
=======


import axios from "axios";


export const updateSocietyModeratorService = async (userId, formData, token) => {
  if (!token || !userId) throw new Error("Missing token or user ID");

  return await axios.put(
    `${process.env.REACT_APP_PUBLIC_API_URL}/users/moderator/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
<<<<<<< HEAD
=======

>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
