import axios from "axios";

export const getManagementCommitteeService = (societyId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/management/${societyId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};