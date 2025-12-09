"use client";

import axios from "axios";
export const createVehicleByUserService = (userId, data, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/vehicle/user/${userId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
// export const getVehicleDataService = (userId, data, token) => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`;

//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: data,
//   });
// };
