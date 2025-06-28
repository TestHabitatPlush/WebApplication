import axios from "axios";

export const getDisucssionForumService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/discussionForum/society/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};


export const createDisucssionForumService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/discussionForum/society/${societyId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDiscussionByIdService = (discussionId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/discussionForum/${discussionId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// services/discussionService.js
export const updateDisucssionService = (discussionId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/discussionForum/society/${discussionId}`;

  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
