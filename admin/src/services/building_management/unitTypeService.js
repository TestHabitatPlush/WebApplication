import axios from "axios";

export const createUnitTypeService = (data, token) => {
  console.log(data);
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unitType`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const getUnitTypeBySocietyIdService = (societyId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unitType/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // query: { data },
  });
};
 export const deleteUnitTypeService = async (unitTypeId, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unitType/${unitTypeId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      console.error("Error deleting unitType:", err);
      throw err;
    }
  };
export const updateUnitTypeService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/unitType/${data.unitTypeId}`;
  return axios.put(
    url,
    { unitTypeName: data.unitTypeName }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
