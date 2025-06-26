import axios from "axios";


export const createDocumentBySocietyService = (formData, societyId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/society/${societyId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const createDocumentByUserService = (formData, userId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/user/${userId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getDocumentBySocietyService = (societyId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/society/${societyId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDocumentByUserService = (userId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/user/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateDocumentBySocietyService = (formData, documentId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/society/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateDocumentByUserService = (formData, documentId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/user/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deleteDocumentService = (documentId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/${documentId}`;
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getDocumentByIdService = (documentId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/document/${documentId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
