import axios from "axios";

export const approveGateServices = (data, token) => {
  console.log(data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gateallocation`;
  console.log(data);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
