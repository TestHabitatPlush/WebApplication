// React & hooks
import React, { useEffect, useState, useRef, useCallback } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// UI Components
import Input from "../shared/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Dialog from "../ui/Dialog";
import CountryStateCitySelector from "../shared/CountryStateCitySelector";
import ReusableTable from "../shared/ReusableTable";
import ActionData from "../shared/ActionData";

// Redux actions
import {
  setCustomerFormField,
  setCustomerForm,setFormOperationType,        // ✅ use this instead
  setSubscriptionPlans,
  resetCustomerFormOperationType,
} from "../../redux/slices/customerSlice";
import {
  setPage as setReduxPage,
  setPageSize as setReduxPageSize,
} from "../../redux/slices/societySlice";

// Icons
import { FaCamera } from "react-icons/fa";

import UrlPath from "../shared/UrlPath";
import PageHeading from "../shared/PageHeading";

// Handlers
import UserHandler from "../../handlers/UserHandler";
import UserRoleHandler from "../../handlers/UserRoleHandler";
import CustomerHandler from "../../handlers/superadmin/CustomerHandler";
import SubscriptionHandler from "../../handlers/superadmin/SubscriptionHandler";
import AdminHandler from "../../handlers/superadmin/AdminHandler"
export {
  React,
  useEffect,
  useState,
  useRef,
  useCallback,
  useDispatch,
  useSelector,

  Input,
  Select,
  Button,
  Dialog,
  CountryStateCitySelector,
  ReusableTable,
  ActionData,

  setCustomerFormField,
  setCustomerForm,
  setSubscriptionPlans,
  resetCustomerFormOperationType,
  setFormOperationType,

  setReduxPage,
  setReduxPageSize,

  FaCamera,

  UrlPath,
  PageHeading,

  UserHandler,
  UserRoleHandler,
  CustomerHandler,
  SubscriptionHandler,
  AdminHandler
};
