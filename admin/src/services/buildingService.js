
  import axios from "axios";

  export const createBuildingService = (data, token) => {
    console.log(data);
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/building`;

    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  export const getBuildingsBySocietyIdService = (societyId, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/building/${societyId}`; // Append societyId to the URL

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  export const deleteBuildingService = async (buildingId, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/building/${buildingId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err) {
      console.error("Error deleting building:", err);
      throw err;
    }
  };

export const updateBuidingService = (data, token) => {
  const url = `${process.env.REACT_APP_PUBLIC_API_URL}/building/${data.buildingId}`;
  return axios.put(
    url,
    { buildingName: data.buildingName }, // ✅ only send expected field
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
