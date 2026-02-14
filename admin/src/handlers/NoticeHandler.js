

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
    return res; 
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
    return res; 
  } catch (err) {
    toast.error("Failed to fetch user notices.");
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
