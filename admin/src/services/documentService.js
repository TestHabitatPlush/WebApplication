import axios from "axios";

const API = process.env.REACT_APP_PUBLIC_API_URL;

export const createDocumentBySocietyService = (formData, societyId, userId, token) => {
  const url = `${API}/document/society/${societyId}/${userId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createDocumentByUserService = (formData, userId, token) => {
  const url = `${API}/document/user/${userId}`;
  return axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDocumentBySocietyService = (societyId, userId, token) => {
  const url = `${API}/document/society/${societyId}/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDocumentByUserService = (userId, token) => {
  const url = `${API}/document/user/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ?? This endpoint expects a userId, not a documentId
export const getAllDocumentsService = (userId, token) => {
  const url = `${API}/document/${userId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDocumentBySocietyService = (formData, documentId, token) => {
  const url = `${API}/document/society/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateDocumentByUserService = (formData, documentId, token) => {
  const url = `${API}/document/user/${documentId}`;
  return axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deleteDocumentService = (documentId, token) => {
  const url = `${API}/document/${documentId}`;
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
