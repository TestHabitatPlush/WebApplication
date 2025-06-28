import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const gateAllocationService = async (data, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gateallocation/`;

    console.log("Submitting Data to:", url, "Payload: ", data);


    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }); 

        return response;
        
    } catch (error) {
        if(error){
            // console.error("Error Response:", error.response.data.message);
            toast.error(error.response.data.message);
        }
    }
};


export const gateAllocationListService = async(data, token, societyId) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gateAllocation/list/${societyId}`;

    return axios
    .get(url, {
        headers: {
            Authorization: `Beare ${token}`,
        },
        params: data,
    })
    .then((res) => {
        // console.log("Allocated Gate: ", res.data.data);
        return res.data.data;
    })
    .catch((err)=>{
        console.error("API Error:", err.response || err.message);
        throw err;
    })
};

export const gateListServices = (data, token) => {
    let societyId = data.societyId;
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gate/gate/${societyId}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    });
  };
  

  export const CreateGateService = (data, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gate/create`;
    console.log("Submitting data to:", url, "Payload:", data);
  
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };


  export const ChangeGateNameService = (data, token, gateId) => {
    
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gate/gate/${gateId}}`;
    return axios.put(url, data, {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    })
  }