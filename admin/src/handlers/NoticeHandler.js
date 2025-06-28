import toast from "react-hot-toast";
import {
  CreateNoticeService,
  deleteNoticeService,
  getNoticeService,
  updateNoticeService,
  userGroupNoticeService,
} from "../services/noticeService";
import { useSelector } from "react-redux";

const NoticeHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);

  const createNoticeHandler = async (data) => {
    console.log(senderId);
    return await CreateNoticeService(
      { ...data, societyId, senderId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Notice created successfully.");
      }
    });
  };

  const getNoticeHandler = async (data) => {
    console.log("notice data", data);

    return await getNoticeService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNoticeByIdHandler = async (data) => {
    console.log("delete", data);
    return await deleteNoticeService(data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateNoticeHandler = async (data) => {
    console.log("update Notice Handler", data);
    return await updateNoticeService(
      { ...data, societyId, senderId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Notice Updated successfully.");
      }
    });
  };

  return {
    createNoticeHandler,
    getNoticeHandler,
    deleteNoticeByIdHandler,
    updateNoticeHandler,
  };
};
export default NoticeHandler;
