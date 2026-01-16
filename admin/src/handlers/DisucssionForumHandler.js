import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createDisucssionForumService,
  getDisucssionForumService,
  getDiscussionByIdService,
  updateDisucssionService,
} from "../services/disussionForumService";

const DisucssionForumHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const getDisucssionForumHandler = async () => {
    try {
      return await getDisucssionForumService(societyId, {}, token);
    } catch (err) {
      console.error("Error fetching DisucssionForum:", err);
    }
  };

  const createDisucssionForumHandler = async (formData) => {
    try {
      const res = await createDisucssionForumService(societyId, formData, token);

      if (res.status === 201) {
        toast.success("Discussion created successfully.");
        return res;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating discussion");
      console.error(err);
    }
  };

  const getDisucssionByIdHandler = async (id) => {
    try {
      const res = await getDiscussionByIdService(id, token);
      return res.data;
    } catch (err) {
      toast.error("Error fetching discussion");
    }
  };

  const updateDisucssionHandler = async (data) => {
    const formData = new FormData();

    formData.append("discussionTitle", data.discussionTitle);
    formData.append("discussionDescription", data.discussionDescription);
    formData.append("userGroupId", data.userGroupId);

    if (data.document) {
      formData.append("document", data.document);
    }

    try {
      const res = await updateDisucssionService(data.discussionId, formData, token);

      if (res.status === 200) {
        toast.success("Discussion updated successfully.");
      }
    } catch (err) {
      toast.error("Update failed.");
      console.error(err);
    }
  };

  return {
    createDisucssionForumHandler,
    getDisucssionForumHandler,
    getDisucssionByIdHandler,
    updateDisucssionHandler,
  };
};

export default DisucssionForumHandler;
