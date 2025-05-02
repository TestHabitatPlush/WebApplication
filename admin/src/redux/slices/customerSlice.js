// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   customerForm: {
//     customerType: "",
//     customerName: "",
//     societyType: "",
//     societyName: "",
//     establishedYear: "",
//     builderDetails: "",
//     subscriptionId: "",
//     address: {
//       city: "",
//       state: "",
//       zipCode: "",
//       street: "",
//       address1: "",
//     },
//     phone: "",
//     email: "",
//     subscriptionId: "",
//     builderSocialLink : "",
//     builderName : "",
//   },
//   societyTypeOptions: [
//     { value: "", label: "Choose Society Type" },
//     { value: "colive", label: "Co Live" },
//     { value: "residential", label: "Residential" },
//   ],
//   customerTypeOptions: [
//     { value: "", label: "Choose Customer Type" },
//     { value: "society", label: "Society" },
//     { value: "vendor", label: "Vendor" },
//   ],
//   subscriptionPlans: [
//     { value: "", label: "Choose Subscription Plan" },
//   ],
//   loading: false,
//   error: null,
//   // others
//   customerId: "",
//   formOperationType:"create",
// };

// const customerSlice = createSlice({
//   name: "customer",
//   initialState,
//   reducers: {
//     setCustomerFormField: (state, action) => {
//       const { name, value } = action.payload;
//       if (name in state.customerForm.address) {
//         state.customerForm.address[name] = value;
//       } else {
//         state.customerForm[name] = value;
//       }
//     },
//     setCustomerFormData : (state,action) => {
//       state.customerForm = action.payload
//     },

//     setSubscriptionPlans: (state, action) => {
//       state.subscriptionPlans = [...state.subscriptionPlans, ...action.payload];
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     resetCustomerForm: (state) => {
//       state.customerForm = initialState.customerForm;
//     },
//     setCustomerId :(state,action)=>{
//       state.customerId = action.payload;
//     },
//     setFormOperationType :(state, action)=>{
//       state.formOperationType = action.payload;
//     },
//     resetCustomerFormOperationType : (state, action)=>{
//       state.formOperationType = "create";

//     }
//   },
// });

// export const {
//   setCustomerFormField,
//   setSubscriptionPlans,
//   setLoading,
//   setError,
//   resetCustomerForm,
//   setCustomerId,
//   setCustomerFormData,
//   setFormOperationType,
//   resetCustomerFormOperationType
// } = customerSlice.actions;
// export default customerSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerForm: {
    customerType: "",
    customerName: "",
    societyType: "",
    societyName: "",
    establishedYear: "",
    builderDetails: "",
    subscriptionId: "",
    address: {
      city: "",
      state: "",
      zipCode: "", // Ensure this is initialized as an empty string
      street: "",
      address1: "",
    },
    phone: "",
    email: "",
    builderSocialLink: "",
    builderName: "",
  },
  societyTypeOptions: [
    { value: "", label: "Choose Society Type" },
    { value: "colive", label: "Co Live" },
    { value: "residential", label: "Residential" },
  ],
  customerTypeOptions: [
    { value: "", label: "Choose Customer Type" },
    { value: "society", label: "Society" },
    { value: "vendor", label: "Vendor" },
  ],
  subscriptionPlans: [{ value: "", label: "Choose Subscription Plan" }],
  loading: false,
  error: null,
  customerId: "",
  formOperationType: "create",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerFormField: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.customerForm.address) {
        state.customerForm.address[name] = value;
      } else {
        state.customerForm[name] = value;
      }
    },
    setCustomerFormData: (state, action) => {
      state.customerForm = action.payload;
    },
    setSubscriptionPlans: (state, action) => {
      state.subscriptionPlans = [...state.subscriptionPlans, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCustomerForm: (state) => {
      state.customerForm = initialState.customerForm;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setFormOperationType: (state, action) => {
      state.formOperationType = action.payload;
    },
    resetCustomerFormOperationType: (state) => {
      state.formOperationType = "create";
    },
  
  },
});

export const {
  setCustomerFormField,
  setSubscriptionPlans,
  setLoading,
  setError,
  resetCustomerForm,
  setCustomerId,
  setCustomerFormData,
  setFormOperationType,
  resetCustomerFormOperationType,
} = customerSlice.actions;

export default customerSlice.reducer;
