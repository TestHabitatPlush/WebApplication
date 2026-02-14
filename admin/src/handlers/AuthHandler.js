// "use client";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { clearAuth, setToken, setUser } from "../redux/slices/authSlice";
// import NavigationHandler from "./NavigationHandler";

// const AuthHandler = () => {
//   const dispatch = useDispatch();
//   const { customNavigation } = NavigationHandler();

//   const loginHandler = async (token) => {
//     try {
//       await axios
//         .post("http://localhost:5000/api/auth/token-signin", { token })
//         .then((res) => {
//           console.log(res);
//           setReduxAuthState(res.data);
//           setLocalStorage(res.data);
//           toast.success("Successfully logged in!");
//           customNavigation('/');
//           return;
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       console.log("end f catch block");
//     } catch (error) {
//       console.log(error.message);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const setLocalStorage = ({ user, token }) => {
//     console.log("set local storage!");
//     const storageData = { token, user };
//     localStorage.setItem("authData", JSON.stringify(storageData));
//   };

//   const setReduxAuthState = ({ user, token }) => {
//     console.log("set redux storage!");
//     dispatch(setUser(user));
//     dispatch(setToken(token));
//   };

//   const getLocalStorage = () => {
//     const storageData = localStorage.getItem("authData");
//     if (storageData) return JSON.parse(storageData);
//     else return null;
//   };

//   const setIntitalReduxState = () => {
//     const data = getLocalStorage();
//     if (data?.token && data?.user) {
//       dispatch(setUser(data.user));
//       dispatch(setToken(data.token));
//     }
//   };

//   const clearLocalStorage = () => {
//     localStorage.removeItem("authData");
//   };

//   const logoutHandler = () => {
//     clearLocalStorage();
//     dispatch(clearAuth());
//     window.location.href = 'http://localhost:3000';
//   };

//   return {
//     loginHandler,
//     setLocalStorage,
//     getLocalStorage,
//     setReduxAuthState,
//     setIntitalReduxState,
//     logoutHandler,
//   };
// };

// export default AuthHandler;

"use client";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { clearAuth, setToken, setUser } from "../redux/slices/authSlice";
import NavigationHandler from "./NavigationHandler";

const API_URL =
  process.env.REACT_APP_PUBLIC_API_URL || "http://localhost:5000/api";
const FRONTEND_URL =
  process.env.REACT_APP_PUBLIC_FRONTEND_URL || "http://localhost:3001";

const AuthHandler = () => {
  const dispatch = useDispatch();
  const { customNavigation } = NavigationHandler();

  /* ---------------- TOKEN LOGIN (REDIRECT FLOW) ---------------- */
  const loginHandler = async (token) => {
    try {
      //  decode token payload (frontend only)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const endpoint = payload.profileId
        ? "/auth/login-token"
        : "/auth/token-signin";

      const res = await axios.post(`${API_URL}${endpoint}`, { token });

      const { user, profile, token: newToken } = res.data;
      const authUser = user || profile;

      dispatch(setUser(authUser));
      dispatch(setToken(newToken));

      localStorage.setItem(
        "authData",
        JSON.stringify({ user: authUser, token: newToken })
      );

      toast.success("Successfully logged in!");
      customNavigation("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  /* ---------------- INIT REDUX FROM LOCAL STORAGE ---------------- */
  const setInitialReduxState = () => {
    const data = localStorage.getItem("authData");
    if (!data) return;

    const { user, token } = JSON.parse(data);
    dispatch(setUser(user));
    dispatch(setToken(token));
  };



  /* ---------------- LOGOUT ---------------- */
  const logoutHandler = () => {
    console.log("Logging out...");
    clearLocalStorage();
    dispatch(clearAuth());
    window.location.href = FRONTEND_URL;
  };
  const setLocalStorage = ({ user, token }) => {
    localStorage.setItem("authData", JSON.stringify({ token, user }));
    console.log("Local storage set:", { user, token });
  };

  const setReduxAuthState = ({ user, token }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));
    console.log("Redux state set.");
  };

  const getLocalStorage = () => {
    const storageData = localStorage.getItem("authData");
    return storageData ? JSON.parse(storageData) : null;
  };

 

  const clearLocalStorage = () => {
    localStorage.removeItem("authData");
    console.log("Local storage cleared.");
  };

  return {
     loginHandler,
     logoutHandler,
     setInitialReduxState,
     setLocalStorage,
     getLocalStorage,
     setReduxAuthState,
   
  };
};

export default AuthHandler;
