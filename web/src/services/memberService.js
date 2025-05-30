// // services/memberService.js
// import axios from "axios";

// export const createMemberService = (data, token) => {
//   console.log("Calling API with token:", token); // debug

//   const url = `${process.env.NEXT_PUBLIC_API_URL}/family/create`;

//   return axios.post(url, data, {
//     headers: {
//    Authorization: `Bearer ${localStorage.getItem('token')}`,

//       "Content-Type": "application/json",
//     },
//   });
// };
// services/memberService.js
import axios from "axios";

export const createMemberService = (data, token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/family/create`;

  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ use passed token
      "Content-Type": "application/json",
    },
  });
};
