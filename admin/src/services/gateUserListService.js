
import axios from "axios";

export const gateUserListService = (data, token, societyId) => {

    const url = `${process.env.REACT_APP_PUBLIC_API_URL}/jobprofile/society/${societyId}`;

    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: data,
        })
        .then((res) => {
            // console.log("Response:", res.data);
            return res.data;
        })
        .catch((err) => {
            console.error("API Error:", err.response || err.message);
            throw err; // Propagate the error for further handling.
        });
}