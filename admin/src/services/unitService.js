import axios from "axios";


export const getAllUnitBySocietyIdService = (societyId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unit/${societyId}`; // Append societyId to the URL

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteUnitByIdService = async(unitId, token) => {
  console.log(unitId);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unit/units/${unitId}`;


  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.error("Error in deleting unit:", err);
    throw err;
  }
};

export const updateUnitService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unit/units/${data.unitId}`;
  return axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
