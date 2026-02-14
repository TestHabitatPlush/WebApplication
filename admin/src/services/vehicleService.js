import axios from "axios";

const BASE_URL = process.env.REACT_APP_PUBLIC_API_URL;

/* ================= ADMIN ================= */

export const createVehicleBySocietyService = (societyId, data, token) => {
  const url = `${BASE_URL}/vehicle/society/${societyId}`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateVehicleBySocietyService = (
  societyId,
  vehicleId,
  data,
  token
) => {
  const url = `${BASE_URL}/vehicle/society/${societyId}/${vehicleId}`;

  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getVehicleBySocietyService = (societyId, token) => {
  const url = `${BASE_URL}/vehicle/society/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



/* ================= COMMON ================= */

export const getVehicleDataByIdService = (vehicleId, token) => {
  const url = `${BASE_URL}/vehicle/${vehicleId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
