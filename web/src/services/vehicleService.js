"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// CREATE VEHICLE
export const createVehicleByUserService = (
  userId,
  unitId,
  data,
  token
) => {
  return axios.post(
    `${BASE_URL}/vehicle/user/${userId}/unit/${unitId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// GET VEHICLES BY USER
export const getVehicleByUserService = (userId, token) => {
  return axios.get(`${BASE_URL}/vehicle/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

<<<<<<< HEAD
// DELETE VEHICLE
export const deleteVehicleByIdService = (vehicleId, token) => {
  return axios.delete(`${BASE_URL}/vehicle/${vehicleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
=======
//   return axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     params: data,
//   });
// };
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
