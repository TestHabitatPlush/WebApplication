// import axios from "axios";

// export const createCustomerService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

//   return axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const getCustomerService = (data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: data,
//   });
// };
// export const getCustomerDetailsByIdService = (id, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const updateCustomerDetailsByIdService = (id, data, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

//   return axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

// export const updateCustomerStatusService = async (id, status, token) => {
//   const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/Status/${id}`;
//   const payload = { status }; 

//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };

//   console.log("Sending status update:", payload); 
//   const response = await axios.put(url, payload, { headers });
//   return response.data;
// };
import axios from "axios";

/**
 * CREATE CUSTOMER (FormData supported)
 */
export const createCustomerService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT set Content-Type manually for FormData
    },
  });
};

/**
 * GET CUSTOMER LIST
 */
export const getCustomerService = (params, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};

/**
 * GET CUSTOMER DETAILS BY ID
 */
export const getCustomerDetailsByIdService = (id, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * UPDATE CUSTOMER DETAILS
 */
export const updateCustomerDetailsByIdService = (id, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/${id}`;

  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * UPDATE CUSTOMER STATUS
 */
export const updateCustomerStatusService = (id, status, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/customers/status/${id}`;

  return axios.put(
    url,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
