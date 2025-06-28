import axios from "axios";

export const userGroupNoticeService = (token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/refusergroup`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
