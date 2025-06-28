import axios from "axios";
import toast from "react-hot-toast";

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


export const gateAllocationListService = async(data, token) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/gateallocation`;

    return axios
    .get(url, {
        headers: {
            Authorization: `Beare ${token}`,
        },
        params: data,
    })
    .then((res) => {
        return res.data;
    })
    .catch((err)=>{
        console.error("API Error:", err.response || err.message);
        throw err;
    })
}