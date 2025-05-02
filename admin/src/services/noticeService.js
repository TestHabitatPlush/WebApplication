import axios from "axios";

export const CreateNoticeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getNoticeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const deleteNoticeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement/${data}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: data,
  });
};

export const updateNoticeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement/${data.noticeId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
