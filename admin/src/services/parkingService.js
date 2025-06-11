import axios from "axios";

const BASE_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const parkingBookedService = (societyId, token, parkingData) => {
  if (!BASE_URL) {
    console.error("Error: API base URL is missing in environment variables.");
    return Promise.reject("API base URL is not defined.");
  }

  if (!societyId) {
    console.error("Error: Society ID is undefined.");
    return Promise.reject("Society ID is required.");
  }

  const url = `${BASE_URL}/parking/${societyId}`;
  console.log("POST URL:", url);

  return axios
    .post(url, parkingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    });
};

export const getParkingStatusService = (societyId, token) => {
  if (!BASE_URL) {
    console.error("Error: API base URL is missing in environment variables.");
    return Promise.reject("API base URL is not defined.");
  }

  if (!societyId) {
    console.error("Error: Society ID is undefined.");
    return Promise.reject("Society ID is required.");
  }

  const url = `${BASE_URL}/parking/${societyId}`;
  console.log("GET URL:", url);

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  });
};

export const getParkingDataByIdService = (parkingId, token) => {
  const url = `${BASE_URL}/${parkingId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const updateParkingService = (data, token) => {
  const url = `${BASE_URL}/parking/${data.societyId}/${data.parkingId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const createVehicleBySocietyService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/vehicle/${societyId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getVehicleService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/society/${societyId}/vehicles`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};
export const getVehicleDataByIdService = (vehicleId, token) => {
  const url = `${BASE_URL}/vehicleData/${vehicleId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
