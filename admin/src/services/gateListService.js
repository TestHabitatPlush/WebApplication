import axios from "axios";

export const gateListServices = (data, token) => {
  console.log("Gate List Data:::",data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gate/gates`;
  console.log(data);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
