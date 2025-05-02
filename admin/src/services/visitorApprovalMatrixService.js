import axios from "axios";

export const getVisitorAprrovalMatrixService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitorapprovalmatrix`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
