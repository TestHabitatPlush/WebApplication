// import axios from "axios";

// export const createvisitorEntryService = (data, token) => {
//     console.log("createvisitorEntryService", data);
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;
//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };

// import axios from "axios";

// export const createvisitorEntryService = (data, token) => {
//   console.log("createvisitorEntryService Data:", data);

//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;
//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };



// import axios from "axios";

// export const createvisitorEntryService = (data, token) => {
//   // console.log("Payload Sent to API:", JSON.stringify(data, null, 2));
//   const url = ${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry;

//   return axios.post(url, data, {
//     headers: {
//       Authorization: Bearer ${token},
//       "Content-Type": "application/json",
//     },
//   });
// };
import axios from "axios";

export const getVisitorRelationshipService = (data, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-relationship`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

// export const createVisitorEntryService = (data, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;

//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };

// export const createVisitorEntryService = async (data, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;
//   console.log("Sending request to:", url);
//   console.log("Request Data:", data);
//   console.log("Token:", token);

//   return axios.post(url, data, {
//       headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//       },
//   });
// };


export const createVisitorEntryService = async (data, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("API Response:", response.data);
    return response;
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    throw error;
  }
};


export const getVisitorEntryByIdService = (visit_entry_Id, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor/${visit_entry_Id}`;
  
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVisitorEntryTableService = (data, token) => {
  console.log("visitor table created");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-list`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const deleteVisitorService = async (visit_entry_Id, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-list/${visit_entry_Id}`;
  
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

export const getQrCodeByIdService = (visit_entry_Id, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/qrCode/${visit_entry_Id}`;
  
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVisitorListForResidentService = (senderId, data, token) => {
  console.log("visitor table created");
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/${senderId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
