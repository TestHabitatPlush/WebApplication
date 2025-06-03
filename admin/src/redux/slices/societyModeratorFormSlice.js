// import { createSlice } from "@reduxjs/toolkit";
// import CountryCodesJSON from "../../json/country.code.json";

// const initialState = {
//   formData: {
//     salutation: "",
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//     alternateNumber: "",
//     email: "",
//     address: {
//       addressLine1: "",
//       addressLine2: "",
//       state: "",
//       city: "",
//       zipCode: "",
//       country: "",
//     },
//     roleId: "",
//     profilePhoto: "",
//     remark: "",
//     societyId: "",
//   },
//   selectOptions: {
//     salutation: [
//       { label: "Select Salutation", value: "" },
//       { label: "Mr", value: "mr" },
//       { label: "Mrs", value: "mrs" },
//       { label: "Miss", value: "miss" },
//       { label: "Dr", value: "dr" },
//       { label: "Prof", value: "prof" },
//     ],
//     userRoles: [{ label: "Select User Role", value: "" }],
//     countryCodes: [
//       { label: "Select Country Code", value: "" },
//       ...CountryCodesJSON.map((data) => ({
//         label: `${data.dial_code}`,
//         value: data.dial_code,
//       })),
//     ],
//     societyLists: [{ label: "Select Society", value: "" }],
//   },

//   formOperationType: "create",
// };

// const createSocietyModeratorForm = createSlice({
//   name: "societyModeratorForm",
//   initialState,
//   reducers: {
//     setOnChangeFormField: (state, action) => {
//       const { name, value } = action.payload;
//       if (name in state.formData.address) {
//         state.formData.address[name] = value;
//       } else {
//         state.formData[name] = value;
//       }
//     },
//     resetFormData: (state, action) => {
//       state.formData = initialState;
//     },
//     setUser: (state, action) => {
//       state.formData = action.payload;
//     },
//     setUserRoleOptions: (state, action) => {
//       state.selectOptions.userRoles = [
//         ...state.selectOptions.userRoles,
//         ...action.payload,
//       ];
//     },
//     setSocietyLists: (state, action) => {
//       state.selectOptions.societyLists = [
//         ...state.selectOptions.societyLists,
//         ...action.payload,
//       ];
//     },
//   },
// });

// // export const { setOnChangeFormField, setUser } = createSocietyModeratorForm.actions;

// export default createSocietyModeratorForm.reducer;
import { createSlice } from "@reduxjs/toolkit";
import CountryCodesJSON from "../../json/country.code.json";

const initialState = {
  formData: {
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
      zipCode: "",
      country: "",
    },
    roleId: "",
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
    userRoles: [{ label: "Select User Role", value: "" }],
    countryCodes: [
      { label: "Select Country Code", value: "" },
      ...CountryCodesJSON.map((data) => ({
        label: `${data.dial_code}`,
        value: data.dial_code,
      })),
    ],
    societyLists: [{ label: "Select Society", value: "" }],
  },
  formOperationType: "create",
};

const createSocietyModeratorForm = createSlice({
  name: "societyModeratorForm",
  initialState,
  reducers: {
    setOnChangeFormField: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.formData.address) {
        state.formData.address[name] = value;
      } else {
        state.formData[name] = value;
      }
    },
    resetFormData: (state) => {
      state.formData = {
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
          zipCode: "",
          country: "",
        },
        roleId: "",
        profilePhoto: "",
        remark: "",
        societyId: "",
      };
    },
    setUser: (state, action) => {
      state.formData = action.payload;
    },
    setUserRoleOptions: (state, action) => {
      const uniqueRoles = Array.from(
        new Map(action.payload.map((item) => [item.value, item])).values()
      );
      state.selectOptions.userRoles = [
        { label: "Select User Role", value: "" },
        ...uniqueRoles,
      ];
    },
    setSocietyLists: (state, action) => {
      const uniqueSocieties = Array.from(
        new Map(action.payload.map((item) => [item.value, item])).values()
      );
      state.selectOptions.societyLists = [
        { label: "Select Society", value: "" },
        ...uniqueSocieties,
      ];
    },
  },
});

export const {
  setOnChangeFormField,
  resetFormData,
  setUser,
  setUserRoleOptions,
  setSocietyLists,
} = createSocietyModeratorForm.actions;

export default createSocietyModeratorForm.reducer;
