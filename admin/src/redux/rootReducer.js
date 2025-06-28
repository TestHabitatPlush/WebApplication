"use client";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import customerSlice from "./slices/customerSlice";
import societySlice from "./slices/societySlice";
// import createUserSlice from "./slices/createUserSlice";
// import AddUser from "../views/admin/usermanagement/adduser/AddUser";
import addUserSlice from "./slices/addUserSlice";
import createSocietyModeratorForm from "./slices/societyModeratorFormSlice";
import buildingManagementSlice from "./slices/buildingManagementSlice";
import countryCodeSlice from "./slices/countryCodeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerSlice,
  society: societySlice,
  // createUser: createUserSlice,
  addUser: addUserSlice,
  societyModeratorForm: createSocietyModeratorForm,
  buildingManagement: buildingManagementSlice,
  countryCode: countryCodeSlice,
});

export default rootReducer;
