
import axios from "axios";

export const createFloorService = async (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/floor`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const getFloorBySocietyIdService = (societyId, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/floor/${societyId}`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // query: { data },
  });
};

  export const deleteFloorService = async (floorId, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/floor/${floorId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      console.error("Error deleting floor:", err);
      throw err;
    }
  };

export const updateFloorService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/floor/${data.floorId}`;
  return axios.put(
    url,
    { floorName: data.floorName,
      shortForm:data.shortForm }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
