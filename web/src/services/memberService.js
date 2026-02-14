import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Get tenant's unit
export const getMyUnitMembersService = (userId, token) => {
  if (!token) return Promise.reject("TOKEN_MISSING");
  if (!userId) return Promise.reject("USER_ID_MISSING");

  return axios.get(`${BASE_URL}/userUnit/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Get members of owner's units
export const getAllMembersService = (token) => {
  if (!token) return Promise.reject("TOKEN_MISSING");

  return axios.get(`${BASE_URL}/family/myunits/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMemberDetailsService = (unitId,token) => {
  console.log("API CALL UNIT ID 👉", unitId);

  return axios.get(`${BASE_URL}/unit/users/${unitId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};