import { createSlice } from "@reduxjs/toolkit";
import CountryCodesJSON from "../../../src/json/country.code.json";

const initialState = {
  countryCodes: [
    { label: "Select Country Code", value: "" },
    ...CountryCodesJSON.map((data) => ({
      label: `${data.dial_code} ${data.name} `,
      value: data.dial_code,
    })),
  ],
};

const countryCodes = createSlice({
  name: "countryCode",
  initialState,

});

export default countryCodes.reducer;

