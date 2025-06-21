
// import axios from "axios";

// export const createDocumentBySocietyService = (formData, societyId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${societyId}`;
//   return axios.post(url, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const createDocumentByUserService = (formData, userId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${userId}`;
//   return axios.post(url, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const getDocumentBySocietyService = (societyId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${societyId}`;
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const getDocumentByUserService = (userId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${userId}`;
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const updateDocumentBySocietyService = (formData, documentId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${documentId}`;
//   return axios.put(url, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const updateDocumentByUserService = (formData, documentId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${documentId}`;
//   return axios.put(url, formData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const deleteDocumentService = (documentId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}`;
//   return axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };



import axios from "axios";

export const createDocumentBySocietyService = (formData, societyId, userId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${societyId}/${userId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createDocumentByUserService = (formData, userId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${userId}`;
  console.log("urlhlfglrgfrgrghguhtulhv", url); 
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDocumentBySocietyService = (societyId, userId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${societyId}/${userId}`;
  // console.log("url ------------------", url);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDocumentByUserService = (userId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/list/${userId}`;
  console.log("url hvfhkgfye", url);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDocumentBySocietyService = (formData, documentId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/society/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateDocumentByUserService = (formData, documentId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDocumentService = (documentId, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/documents/${documentId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
