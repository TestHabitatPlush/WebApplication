import axios from "axios";

export const loginService = (data) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`; 
    // const url = "https://test.habitatplush.com/api/auth/login";

    return axios.post(url, data);
};
