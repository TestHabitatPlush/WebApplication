
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

export const createvisitorEntryService = (data, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/new-visit-entry`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getvisitorEntryByIdService = (visit_entry_Id, token) => {
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
      Authorization:` Bearer ${token}`,
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
      headers: { Authorization: `Bearer ${token}` },
  });
};



// export const getVisitorListForResidentService = (senderId, token) => {
 
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-entries/sender/${senderId}`;

//   return axios.get(url, {
//     headers: {
//       Authorization:` Bearer ${token}`,
//     },
//   });
// };

// export const getVisitorListForResidentService = (senderId, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-entries/sender/${senderId}`;
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
export const getVisitorListForResidentService = (senderId, token, params) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/visitormanagement/visitor-entries/sender/${senderId}`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params, // Include pagination or filters
  });
};
