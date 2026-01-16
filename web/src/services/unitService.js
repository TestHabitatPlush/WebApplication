"use client";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUnitsServices = (societyId, token) => {
  return axios.get(`${BASE_URL}/unit/${societyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
