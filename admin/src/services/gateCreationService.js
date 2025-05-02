import axios from "axios";

export const CreateGateService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gate/create`;
  console.log("Submitting data to:", url, "Payload:", data);

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


