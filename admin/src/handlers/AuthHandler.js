"use client";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { clearAuth, setToken, setUser } from "../redux/slices/authSlice";
import NavigationHandler from "./NavigationHandler";

const AuthHandler = () => {
  const dispatch = useDispatch();
  const { customNavigation } = NavigationHandler();

  const loginHandler = async (token) => {
    try {
      await axios
        .post("http://localhost:5000/api/auth/token-signin", { token })
        .then((res) => {
          console.log(res);
          setReduxAuthState(res.data);
          setLocalStorage(res.data);
          toast.success("Successfully logged in!");
          customNavigation('/');
          return;
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("end f catch block");
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred. Please try again.");
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
    window.location.href = 'http://localhost:3000';
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
