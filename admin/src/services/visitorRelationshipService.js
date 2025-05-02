import axios from "axios";

export const CreateVisitorRelationshipService = (data, token) => {
  console.log("service", data);

  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-relationship`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getVisitorRelationshipService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-relationship`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const deleteVisitorRelationService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-relationship/${data}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: data,
  });
};

export const updateVisitorRelationService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-relationship/${data.Visit_relation_Id}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};