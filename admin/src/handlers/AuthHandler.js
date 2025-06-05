"use client";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { clearAuth, setToken, setUser } from "../redux/slices/authSlice";
import NavigationHandler from "./NavigationHandler";

const API_URL = process.env.REACT_APP_PUBLIC_API_URL;
const FRONTEND_URL = process.env.REACT_APP_PUBLIC_FRONTEND_URL || "http://localhost:3000";

const AuthHandler = () => {
  const dispatch = useDispatch();
  const { customNavigation } = NavigationHandler();

  const loginHandler = async (token) => {
    try {
      await axios
        .post(`${API_URL}/auth/token-signin`, { token })
        .then((res) => {
          setReduxAuthState(res.data);
          setLocalStorage(res.data);
          toast.success("Successfully logged in!");
          customNavigation('/');
        })
        .catch((err) => {
          console.error("Login failed:", err);
          toast.error("Login failed. Please check credentials.");
        });
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  const setLocalStorage = ({ user, token }) => {
    localStorage.setItem("authData", JSON.stringify({ user, token }));
  };

  const getLocalStorage = () => {
    const storageData = localStorage.getItem("authData");
    return storageData ? JSON.parse(storageData) : null;
  };

  const setReduxAuthState = ({ user, token }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
  };

  const setIntitalReduxState = () => {
    const data = getLocalStorage();
    if (data?.token && data?.user) {
      setReduxAuthState(data);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("authData");
  };

  const logoutHandler = () => {
    clearLocalStorage();
    dispatch(clearAuth());
    window.location.href = FRONTEND_URL;
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
