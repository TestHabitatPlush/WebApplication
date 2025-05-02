import axios from "axios";

export const getUserRolesService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/role`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
