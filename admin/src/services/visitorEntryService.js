import axios from "axios";

export const getvisitorEntryService = (token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/:visit_entry_Id`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: data,
  });
};

export const createvisitorEntryService = (data, token) => {
    console.log("createvisitorEntryService", data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getVisitorEntryTableService = (data, token) => {
  console.log("visitor table created");
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-list`;

  return axios.get(url, {
    headers: {
      Authorization:` Bearer ${token}`,
    },
    params: data,
  });
};


export const getvisitorEntryByIdService = (visit_entry_Id, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor/${visit_entry_Id}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteVisitorService = async (visit_entry_Id, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/visitor-list/${visit_entry_Id}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.error("Error in deleting visitor:", err);
    throw err;
  }
};

// export const getQrCodeByIdService = (visit_entry_Id, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/qrCode/${visit_entry_Id}`;  // Ensure this URL matches your backend API
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

export const getQrCodeByIdService = (visit_entry_Id, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/visitormanagement/qrCode/${visit_entry_Id}`;
    return axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
};