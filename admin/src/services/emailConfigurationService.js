import axios from "axios";

export const createEmailConfigurationService = (data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/emailconfugaration`;

  console.log(data);
  return axios.post(url, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};
