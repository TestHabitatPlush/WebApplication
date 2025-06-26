import { createSlice } from "@reduxjs/toolkit";
import CountryCodesJSON from "../../../src/json/country.code.json";

const initialState = {
  addUserForm: {
    salutation: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      state: "",
      city: "",
      pin: "",
      country: "",
    },
    unitallocation: {
      towerno: "",
      floorno: "",
      unitno: "",
      selectunitno: "",
    },
    owner: "", // Radio button (e.g., "true" or "false")
    ownerFamily: "", // Radio button
    tenant: "", // Radio button
    tenantfamily: "", // Radio button
    liveshere: false, // Checkbox (boolean)
    primarycontact: false, // Checkbox (boolean)
    ismaemberofassociationcommite: false, // Checkbox (boolean)
    membertype: "",
    profilePhoto: "",
    remark: "",
    societyId: "",
  },
  selectOptions: {
    salutation: [
      { label: "Select Salutation", value: "" },
      { label: "Mr", value: "mr" },
      { label: "Mrs", value: "mrs" },
      { label: "Miss", value: "miss" },
      { label: "Dr", value: "dr" },
      { label: "Prof", value: "prof" },
    ],
    userRoles: [],
    countryCodes: [
      { label: "Select Country Code", value: "" },
      ...CountryCodesJSON.map((data) => ({
        label: `${data.dial_code}`,
        value: data.dial_code,
      })),
    ],
    societyLists: [],
  },
  formOperationType: "create",
};

const addUserForm = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;

      // For checkboxes (which should hold boolean values)
      if (
        name === "liveshere" ||
        name === "primarycontact" ||
        name === "ismaemberofassociationcommite"
      ) {
        state.addUserForm[name] = value === "true" || value === true;
      }
      // For radio buttons (which usually have string values)
      else if (
        name === "owner" ||
        name === "ownerFamily" ||
        name === "tenant" ||
        name === "tenantfamily"
      ) {
        state.addUserForm[name] = value;
      }
      // For other input fields
      else if (name in state.addUserForm.address) {
        state.addUserForm.address[name] = value;
      } else if (name in state.addUserForm.unitallocation) {
        state.addUserForm.unitallocation[name] = value;
      } else {
        state.addUserForm[name] = value;
      }
    },
  },
});

export const { setFormData } = addUserForm.actions;
export default addUserForm.reducer;
