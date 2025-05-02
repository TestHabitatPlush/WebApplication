import axios from "axios";

export const createCalenderSettingService = (data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/calender`;

  console.log(data);
  return axios.post(url, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });
};
