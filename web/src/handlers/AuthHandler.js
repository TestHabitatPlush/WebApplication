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


// "use client";
// import { useDispatch } from "react-redux";
// import { toast } from "react-hot-toast";
// import {
//   loginService,
//   jobProfileLoginService,
// } from "@/services/authServices";
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
//       } else if (result?.status === 200) {
//         const authData = { user, token };
//         setReduxAuthState(authData);
//         setLocalStorage(authData);
//         toast.success("Successfully logged in!");
//       }
//     } catch (error) {
//       handleAuthError(error);
//     }
//   };

//   const jobProfileLoginHandler = async (data) => {
//     try {
//       const result = await jobProfileLoginService(data);
//       const { token, redirectUrl = null, profile } = result.data;

//       if (redirectUrl) {
//         toast.success("Redirecting...");
//         window.location.href = redirectUrl;
//         return;
//       }

//       if (result.status === 200) {
//         const authData = { user: profile, token };
//         setReduxAuthState(authData);
//         setLocalStorage(authData);
//         toast.success("Successfully logged in!");
//       }
//     } catch (error) {
//       handleAuthError(error);
//     }
//   };
  

//   const handleAuthError = (error) => {
//     if (error?.response?.data?.message) {
//       toast.error(error.response.data.message);
//     } else {
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   const setLocalStorage = ({ user, token }) => {
//     localStorage.setItem("authData", JSON.stringify({ user, token }));
//   };

//   const setReduxAuthState = ({ user, token }) => {
//     dispatch(setUser(user));
//     dispatch(setToken(token));

//     if (user?.societyId) {
//       dispatch(setSelectedSociety(user.societyId));
//     } else if (user?.Customer?.customerId) {
//       dispatch(setSelectedSociety(user.Customer.customerId));
//     }
//   };

//   const getLocalStorage = () => {
//     const storageData = localStorage.getItem("authData");
//     return storageData ? JSON.parse(storageData) : null;
//   };

//   const setIntitalReduxState = () => {
//     const data = getLocalStorage();
//     if (data?.token && data?.user) {
//       setReduxAuthState(data);
//     }
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("authData");
//     dispatch(clearAuth());
//     dispatch(setSelectedSociety(null));
//   };

//   return {
//     loginHandler,
//     jobProfileLoginHandler, 
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
  tokenSignInService,
  loginTokenService,
} from "@/services/authServices";
import { setUser, setToken, clearAuth } from "@/redux/slices/authSlice";
import { setSelectedSociety } from "@/redux/slices/societySlice";
import NavigationHandler from "./NavigationHandler";

const AuthHandler = () => {
  const { navigateToHomePage } = NavigationHandler();
  const dispatch = useDispatch();

  /* ---------------- NORMAL LOGIN ---------------- */
  const loginHandler = async (data) => {
    try {
      const result = await loginService(data);
      const { token, redirectUrl = null, user } = result.data;

      if (redirectUrl) {
        toast.success("Redirecting to admin login...");
        window.location.href = redirectUrl;
        return;
      }

      if (result.status === 200) {
        const authData = { user, token };
        setReduxAuthState(authData);
        setLocalStorage(authData);
        toast.success("Successfully logged in!");
      }
    } catch (error) {
      handleAuthError(error);
      console.error("Login error:", error);
    }
  };

  /* ---------------- JOB PROFILE LOGIN ---------------- */
  const jobProfileLoginHandler = async (data) => {
    try {
      const result = await jobProfileLoginService(data);
      const { token, redirectUrl = null, profile } = result.data;

      if (redirectUrl) {
        // Redirect user to frontend token login screen
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
      console.error("Job Profile Login error:", error);
    }
  };

  /* ---------------- TOKEN SIGN-IN (Society Users) ---------------- */
  const tokenSignInHandler = async (token) => {
    try {
      const result = await tokenSignInService(token);
      const { token: newToken, user } = result.data;
      setReduxAuthState({ user, token: newToken });
      setLocalStorage({ user, token: newToken });
      toast.success("Admin login successful via token!");
      return result.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  };

  /* ---------------- LOGIN TOKEN (Job Profiles / Staff) ---------------- */
  const loginTokenHandler = async (token) => {
    try {
      const result = await loginTokenService(token);
      const { token: newToken, profile } = result.data;
      setReduxAuthState({ user: profile, token: newToken });
      setLocalStorage({ user: profile, token: newToken });
      toast.success("Staff/Partner login successful via token!");
      return result.data;
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  };

  /* ---------------- REDUX & LOCAL STORAGE ---------------- */
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

    if (user?.societyId) {
      dispatch(setSelectedSociety(user.societyId));
    } else if (user?.Customer?.customerId) {
      dispatch(setSelectedSociety(user.Customer.customerId));
    }
  };

  const setIntitalReduxState = () => {
    const data = getLocalStorage();
    if (data?.token && data?.user) {
      setReduxAuthState(data);
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const logoutHandler = () => {
    localStorage.removeItem("authData");
    dispatch(clearAuth());
    dispatch(setSelectedSociety(null));
    toast.success("Logged out successfully!");
  };

  /* ---------------- ERROR HANDLER ---------------- */
  const handleAuthError = (error) => {
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  return {
    loginHandler,
    jobProfileLoginHandler,
    tokenSignInHandler,
    loginTokenHandler,
    setLocalStorage,
    getLocalStorage,
    setReduxAuthState,
    setIntitalReduxState,
    logoutHandler,
  };
};

export default AuthHandler;
