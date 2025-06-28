import axios from "axios";

export const gateUserListService = (data, token, societyId) => {

    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/jobProfile/society/${societyId}`;

    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: data,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.error("API Error:", err.response || err.message);
            throw err; // Propagate the error for further handling.
        });
};


export const GuardUserCreationService = (data, token, societyId) =>{
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/jobProfile/create/${societyId}`
    return axios.post(url, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
};

export const RemoveGuardProfile = (data, profileId, token) =>{
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/jobProfile/update/${profileId}`
    return axios.put(url, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
};


export const EditGuardUser = (data, token, profileId) => {
    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/jobProfile/update/${profileId}`;
    return axios.put(url, data, {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })
    
}