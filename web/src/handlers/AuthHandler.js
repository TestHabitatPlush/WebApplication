"use client";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { loginService } from "@/services/authServices";
import { setUser, setToken, clearAuth } from "@/redux/slices/authSlice";
import NavigationHandler from "./NavigationHandler";

const AuthHandler = () => {
  const { navigateToHomePage } = NavigationHandler();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    try {
      const result = await loginService(data);
      const { token, redirectUrl = null, user } = result.data;

      if (redirectUrl) {
        toast.success("Going to redirect!");
        window.location.href = redirectUrl;
      } else {
        if (result?.status === 200) {
          const data = { user, token };
          setReduxAuthState(data);
          setLocalStorage(data);
          toast.success("Successfully logged in!");
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const setLocalStorage = ({ user, token }) => {
    console.log("set local storage!");
    const storageData = { token, user };
    localStorage.setItem("authData", JSON.stringify(storageData));
  };

  const setReduxAuthState = ({ user, token }) => {
    console.log("set redux storage!");
    dispatch(setUser(user));
    dispatch(setToken(token));
  };

  const getLocalStorage = () => {
    const storageData = localStorage.getItem("authData");
    if (storageData) return JSON.parse(storageData);
    else return null;
  };

  const setIntitalReduxState = () => {
    const data = getLocalStorage();
    if (data?.token && data?.user) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("authData");
  };

  const logoutHandler = () => {
    clearLocalStorage();
    dispatch(clearAuth());
  };

  return {
    loginHandler,
    setLocalStorage,
    getLocalStorage,
    setReduxAuthState,
    setIntitalReduxState,
    logoutHandler,
  };
};

export default AuthHandler;
