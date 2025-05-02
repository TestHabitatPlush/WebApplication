import axios from "axios";

export const adduserService = (data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/users`;

  console.log(data);
  return axios.post(url, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};
