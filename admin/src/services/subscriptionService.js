import axios from "axios";

export const getAllSubscriptionsService = (data) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/subscription-plans`;
  return axios.get(url, data);
};
