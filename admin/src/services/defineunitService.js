import axios from "axios";

export const createDefineUnitService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unit`;
  console.log("Create Unit Data:", data);
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUnitsServices = (societyId, data, token) => {
  console.log("Get Units Params:", data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unit/${societyId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
