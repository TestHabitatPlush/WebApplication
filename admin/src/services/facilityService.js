import axios from "axios";

export const getFacilityService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/facilityManagement/facility/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: data,
  });
};

export const createFacilityService = (societyId, data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/facilityManagement/facility/${societyId}`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const deleteFacilityService = async (facilityId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/facilityManagement/facility_management/${facilityId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.error("Error in deleting facility:", err);
    throw err;
  }
};

export const updateFacilityService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/facilitymanagement/${data.societyId}/${data.facilityId}`;
  return axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getFacilityByIdService = (facilityId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/facilitymanagement/${facilityId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};