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

const AuthHandler = () => {
  const dispatch = useDispatch();
  const { customNavigation } = NavigationHandler();

  const API_URL = process.env.REACT_APP_PUBLIC_API_URL || "http://localhost:5000/api";
const FRONTEND_URL = process.env.REACT_APP_PUBLIC_FRONTEND_URL || "http://localhost:3000";


  const loginHandler = async (token) => {
    try {
<<<<<<< HEAD
      await axios
        .post(`${process.env.REACT_APP_PUBLIC_API_URL}/auth/token-signin`, { token })
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
=======
      console.log("Sending login request...");
      const res = await axios.post(`${API_URL}/auth/token-signin`, { token });
      console.log("Login response:", res.data);
      setReduxAuthState(res.data);
      setLocalStorage(res.data);
      toast.success("Successfully logged in!");
      customNavigation('/');
>>>>>>> 6e53aa819929c428b011f7de15d4d5a737bd04a2
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
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

  const setIntitalReduxState = () => {
    const data = getLocalStorage();
    if (data?.token && data?.user) {
      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      console.log("Redux initialized from local storage.");
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("authData");
    console.log("Local storage cleared.");
  };

  const logoutHandler = () => {
    console.log("Logging out...");
    clearLocalStorage();
    dispatch(clearAuth());
<<<<<<< HEAD
    window.location.href = process.env.REACT_APP_PUBLIC_BASE_URL;
=======
    window.location.href = FRONTEND_URL;
>>>>>>> 6e53aa819929c428b011f7de15d4d5a737bd04a2
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

<<<<<<< HEAD
export default AuthHandler;
=======
export default AuthHandler;

//jek
>>>>>>> 6e53aa819929c428b011f7de15d4d5a737bd04a2
