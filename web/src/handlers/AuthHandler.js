// "use client";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { loginService } from "@/services/authServices";
// import { setUser, setToken, clearAuth } from "@/redux/slices/authSlice";
// import NavigationHandler from "./NavigationHandler";

// const AuthHandler = () => {
//   const { navigateToHomePage } = NavigationHandler();
//   const dispatch = useDispatch();

//   const loginHandler = async (data) => {
//     try {
//       const result = await loginService(data);
//       const { token, redirectUrl = null, user } = result.data;

//       if (redirectUrl) {
//         toast.success("Going to redirect!");
//         window.location.href = redirectUrl;
//       } else {
//         if (result?.status === 200) {
//           const data = { user, token };
//           setReduxAuthState(data);
//           setLocalStorage(data);
//           toast.success("Successfully logged in!");
//         } else {
//           toast.error("Login failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
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


// "use client";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import { loginService } from "@/services/authServices";
// import { setUser, setToken, clearAuth } from "@/redux/slices/authSlice";
// import { setSelectedSociety } from "@/redux/slices/societySlice"; 
// import NavigationHandler from "./NavigationHandler";

// const AuthHandler = () => {
//   const { navigateToHomePage } = NavigationHandler();
//   const dispatch = useDispatch();

//   const loginHandler = async (data) => {
//     try {
//       const result = await loginService(data);
//       const { token, redirectUrl = null, user } = result.data;

//       if (redirectUrl) {
//         toast.success("Going to redirect!");
//         window.location.href = redirectUrl;
//       } else {
//         if (result?.status === 200) {
//           const data = { user, token };
//           setReduxAuthState(data);
//           setLocalStorage(data);
//           toast.success("Successfully logged in!");
//         } else {
//           toast.error("Login failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     }
//   };

//   const setLocalStorage = ({ user, token }) => {
//     const storageData = { token, user };
//     localStorage.setItem("authData", JSON.stringify(storageData));
//   };

//   const setReduxAuthState = ({ user, token }) => {
//     dispatch(setUser(user));
//     dispatch(setToken(token));

//     if (user?.societyId) {
//       dispatch(setSelectedSociety(user.societyId));
//     }
//     else if (user?.Customer?.customerId) {
//       dispatch(setSelectedSociety(user.Customer.customerId));
//     }
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

//       if (data.user?.societyId) {
//         dispatch(setSelectedSociety(data.user.societyId));
//       } else if (data.user?.Customer?.customerId) {
//         dispatch(setSelectedSociety(data.user.Customer.customerId));
//       }
//     }
//   };

//   const clearLocalStorage = () => {
//     localStorage.removeItem("authData");
//   };

//   const logoutHandler = () => {
//     clearLocalStorage();
//     dispatch(clearAuth());
//     dispatch(setSelectedSociety(null)); t
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
import {
  loginService,
  jobProfileLoginService,
} from "@/services/authServices";
import { setUser, setToken, clearAuth } from "@/redux/slices/authSlice";
import { setSelectedSociety } from "@/redux/slices/societySlice";
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
      } else if (result?.status === 200) {
        const authData = { user, token };
        setReduxAuthState(authData);
        setLocalStorage(authData);
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const jobProfileLoginHandler = async (data) => {
    try {
      const result = await jobProfileLoginService(data);
      const { token, redirectUrl = null, profile } = result.data;

      if (redirectUrl) {
        toast.success("Redirecting...");
        window.location.href = redirectUrl;
        return;
      }

      if (result.status === 200) {
        const authData = { user: profile, token };
        setReduxAuthState(authData);
        setLocalStorage(authData);
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      handleAuthError(error);
    }
  };
  

  const handleAuthError = (error) => {
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  const setLocalStorage = ({ user, token }) => {
    localStorage.setItem("authData", JSON.stringify({ user, token }));
  };

  const setReduxAuthState = ({ user, token }) => {
    dispatch(setUser(user));
    dispatch(setToken(token));

    if (user?.societyId) {
      dispatch(setSelectedSociety(user.societyId));
    } else if (user?.Customer?.customerId) {
      dispatch(setSelectedSociety(user.Customer.customerId));
    }
  };

  const getLocalStorage = () => {
    const storageData = localStorage.getItem("authData");
    return storageData ? JSON.parse(storageData) : null;
  };

  const setIntitalReduxState = () => {
    const data = getLocalStorage();
    if (data?.token && data?.user) {
      setReduxAuthState(data);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("authData");
    dispatch(clearAuth());
    dispatch(setSelectedSociety(null));
  };

  return {
    loginHandler,
    jobProfileLoginHandler, 
    setLocalStorage,
    getLocalStorage,
    setReduxAuthState,
    setIntitalReduxState,
    logoutHandler,
  };
};

export default AuthHandler;
