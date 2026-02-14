import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerForm: {
    customerType: "",
    customerName: "",
    societyType: "",
    societyName: "",
    establishedYear: "",
    subscriptionId: "",
    address: {
      city: "",
      state: "",
      zipCode: "",
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
  subscriptionPlans: [
    { value: "", label: "Choose Subscription Plan" },
  ],
  loading: false,
  error: null,
  customerId: "",
  formOperationType: "create",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // Update a single field (including nested address)
    setCustomerFormField: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.customerForm.address) {
        state.customerForm.address[name] = value;
      } else {
        state.customerForm[name] = value;
      }
    },
    // Set the entire form (used in Edit)
    setCustomerForm: (state, action) => {
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
  setCustomerForm,
  setSubscriptionPlans,
  setLoading,
  setError,
  resetCustomerForm,
  setCustomerId,
  setFormOperationType,
  resetCustomerFormOperationType,
} = customerSlice.actions;

export default customerSlice.reducer;