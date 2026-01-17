// import toast from "react-hot-toast";
// import {
//   CreateNoticeService,
//   deleteNoticeService,
//   getNoticeService,
//   updateNoticeService,
//   userGroupNoticeService,
// } from "../services/noticeService";
// import { useSelector } from "react-redux";

// const NoticeHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const societyId = useSelector((state) => state.auth.user.Customer.customerId);
//   const senderId = useSelector((state) => state.auth.user.userId);

//   const createNoticeHandler = async (data) => {
//     console.log(senderId);
//     return await CreateNoticeService(
//       { ...data, societyId, senderId },
//       token
//     ).then((res) => {
//       if (res.status === 201) {
//         toast.success("Notice created successfully.");
//       }
//     });
//   };

//   const getNoticeHandler = async (data) => {
//     console.log("notice data", data);

//     return await getNoticeService({ ...data, societyId }, token)
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const deleteNoticeByIdHandler = async (data) => {
//     console.log("delete", data);
//     return await deleteNoticeService(data, token)
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const updateNoticeHandler = async (data) => {
//     console.log("update Notice Handler", data);
//     return await updateNoticeService(
//       { ...data, societyId, senderId },
//       token
//     ).then((res) => {
//       if (res.status === 201) {
//         toast.success("Notice Updated successfully.");
//       }
//     });
//   };

//   return {
//     createNoticeHandler,
//     getNoticeHandler,
//     deleteNoticeByIdHandler,
//     updateNoticeHandler,
//   };
// };
// export default NoticeHandler;



// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import {
//   createNoticeBySocietyService,
//   createNoticeByUserService,
//   getNoticesBySocietyService,
//   getNoticesByUserService,
//   updateNoticeService,
//   deleteNoticeService,
// } from "../services/noticeService";

// const NoticeHandler = () => {
//   const token = useSelector((state) => state.auth.token);
//   const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
//   const userId = useSelector((state) => state.auth.user?.userId);

//   const buildFormData = (data) => {
//     const formData = new FormData();
//     if (data.noticeHeading) formData.append("noticeHeading", data.noticeHeading);
//     if (data.noticeDescription) formData.append("noticeDescription", data.noticeDescription);
//     if (data.noticeExpireDate) formData.append("noticeExpireDate", data.noticeExpireDate);
//     if (data.visibilityOption) formData.append("visibilityOption", data.visibilityOption);
//     return formData;
//   };

//   // ===== SOCIETY NOTICE HANDLER =====
//   const createNoticeBySocietyHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createNoticeBySocietyService(formData, societyId, userId, token);

//       if (res.status === 201) {
//         toast.success("Notice created for society.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to create society notice.");
//       console.error(err);
//     }
//   };

//   const getNoticesBySocietyHandler = async () => {
//     try {
//       const res = await getNoticesBySocietyService(societyId, userId, token);
//       if (res.status === 200) return res.data;
//     } catch (err) {
//       toast.error("Failed to fetch society notices.");
//       console.error(err);
//     }
//   };

//   // ===== USER NOTICE HANDLER =====
//   const createNoticeByUserHandler = async (data) => {
//     try {
//       const formData = buildFormData(data);
//       const res = await createNoticeByUserService(formData, userId, token);

//       if (res.status === 201) {
//         toast.success("User notice created successfully.");
//       }

//       return res;
//     } catch (err) {
//       toast.error("Failed to create user notice.");
//       console.error(err);
//     }
//   };

//   const getNoticesByUserHandler = async () => {
//     try {
//       const res = await getNoticesByUserService(userId, token);
//       if (res.status === 200) return res.data;
//     } catch (err) {
//       toast.error("Failed to fetch user notices.");
//       console.error(err);
//     }
//   };

//   // ===== COMMON NOTICE HANDLER =====
//   const updateNoticeHandler = async (noticeId, data) => {
//     try {
//       const res = await updateNoticeService(noticeId, data, token);
//       if (res.status === 200) {
//         toast.success("Notice updated successfully.");
//       }
//       return res;
//     } catch (err) {
//       toast.error("Failed to update notice.");
//       console.error(err);
//     }
//   };

//   const deleteNoticeHandler = async (noticeId) => {
//     try {
//       const res = await deleteNoticeService(noticeId, token);
//       if (res.status === 200) {
//         toast.success("Notice deleted successfully.");
//       }
//       return res;
//     } catch (err) {
//       toast.error("Failed to delete notice.");
//       console.error(err);
//     }
//   };

//   return {
//     createNoticeBySocietyHandler,
//     getNoticesBySocietyHandler,
//     createNoticeByUserHandler,
//     getNoticesByUserHandler,
//     updateNoticeHandler,
//     deleteNoticeHandler,
//   };
// };

// export default NoticeHandler;


import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createNoticeBySocietyService,
  createNoticeByUserService,
  getNoticesBySocietyService,
  getNoticesByUserService,
  updateNoticeService,
  deleteNoticeService,
} from "../services/noticeService";

const NoticeHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
  const userId = useSelector((state) => state.auth.user?.userId);

  // ===== SOCIETY NOTICE HANDLER =====
  const createNoticeBySocietyHandler = async (data) => {
    try {
      const res = await createNoticeBySocietyService(data, societyId, userId, token);
      if (res.status === 201) {
        toast.success("Notice created for society.");
      }
      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create society notice.");
      console.error(err);
    }
  };

  const getNoticesBySocietyHandler = async () => {
    try {
      const res = await getNoticesBySocietyService(societyId, userId, token);
      if (res.status === 200) return res.data;
    } catch (err) {
      toast.error("Failed to fetch society notices.");
      console.error(err);
    }
  };

  // ===== USER NOTICE HANDLER =====
  const createNoticeByUserHandler = async (data) => {
    try {
      const res = await createNoticeByUserService(data, userId, token);
      if (res.status === 201) {
        toast.success("User notice created successfully.");
      }
      return res;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create user notice.");
      console.error(err);
    }
  };

  const getNoticesByUserHandler = async () => {
    try {
      const res = await getNoticesByUserService(userId, token);
      if (res.status === 200) return res.data;
    } catch (err) {
<<<<<<< HEAD
     //toast.error("Failed to fetch user notices.");
=======
      toast.error("Failed to fetch user notices.");
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
      console.error(err);
    }
  };

  // ===== COMMON NOTICE HANDLER =====
  const updateNoticeHandler = async (noticeId, data) => {
    try {
      const res = await updateNoticeService(noticeId, data, token);
      if (res.status === 200) {
        toast.success("Notice updated successfully.");
      }
      return res;
    } catch (err) {
      toast.error("Failed to update notice.");
      console.error(err);
    }
  };

  const deleteNoticeHandler = async (noticeId) => {
    try {
      const res = await deleteNoticeService(noticeId, token);
      if (res.status === 200) {
        toast.success("Notice deleted successfully.");
      }
      return res;
    } catch (err) {
      toast.error("Failed to delete notice.");
      console.error(err);
    }
  };

  return {
    createNoticeBySocietyHandler,
    getNoticesBySocietyHandler,
    createNoticeByUserHandler,
    getNoticesByUserHandler,
    updateNoticeHandler,
    deleteNoticeHandler,
  };
};

export default NoticeHandler;
