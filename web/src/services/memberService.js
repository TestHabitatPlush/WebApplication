import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/family`;

export const createMemberService = async (data, token) => {
  return axios.post(`${BASE_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
