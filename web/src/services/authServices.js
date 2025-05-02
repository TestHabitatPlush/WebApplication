import axios from "axios";

export const loginService = (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    return axios.post(url, data);
};
