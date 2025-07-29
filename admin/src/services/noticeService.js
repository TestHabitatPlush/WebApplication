// import axios from "axios";

// export const CreateNoticeService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement`;
//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };

// export const getNoticeService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement`;

//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: data,
//   });
// };

// export const deleteNoticeService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement/${data}`;
//   return axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     // params: data,
//   });
// };

// export const updateNoticeService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/noticeAnnouncement/${data.noticeId}`;
//   return axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };


// src/services/noticeService.js


import axios from "axios";

const API = process.env.REACT_APP_PUBLIC_API_URL;

export const createNoticeBySocietyService = (formData, societyId, userId, token) => {
  const url = `${API}/noticeAnnouncement/create/${societyId}/${userId}`;
  console.log(url);
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNoticeByUserService = (formData, userId, token) => {
  const url = `${API}/noticeAnnouncement/create/${userId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNoticesBySocietyService = (societyId, userId, token) => {
  const url = `${API}/noticeAnnouncement/get/${societyId}/${userId}`;

  console.log("kjcdgik",url);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNoticesByUserService = (userId, token) => {
  const url = `${API}/noticeAnnouncement/user/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNoticeService = (noticeId, updatedData, token) => {
  const url = `${API}/noticeAnnouncement/update/${noticeId}`;
  return axios.put(url, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNoticeService = (noticeId, token) => {
  const url = `${API}/noticeAnnouncement/delete/${noticeId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
