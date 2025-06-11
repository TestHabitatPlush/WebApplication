import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createDisucssionForumService, getDisucssionForumService,getDiscussionByIdService,updateDisucssionService} from "../services/disussionForumService";

const DisucssionForumHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);
  
  const getDisucssionForumHandler = async () => {
    try {
      return await getDisucssionForumService(societyId, {}, token);
    } catch (err) {
      console.error("Error fetching DisucssionForum:", err);
    }
  };

  const createDisucssionForumHandler = async (data) => {
    try {
      const res = await createDisucssionForumService(societyId, data, token);
      if (res.status === 201) {
        toast.success("DisucssionForum created successfully.");
        return res;
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Error creating DisucssionForum.");
      }
      console.error(err);
    }
  }


  const getDisucssionByIdHandler = async (id) => {
      try {
        const response = await getDiscussionByIdService(id, token);
        console.log(response);
        return response.data;  
      } catch (err) {
        console.error("Error Disucssion by ID:", err);
        toast.error("Error Disucssion details.");
      }
    };

  
// handlers/DisucssionForumHandler.js
const updateDisucssionHandler = async (data) => {
  const { discussionId, ...rest } = data;

  try {
    const res = await updateDisucssionService(discussionId, rest, token);
    if (res.status === 200) {
      toast.success("Discussion updated successfully.");
    }
  } catch (err) {
    toast.error("Failed to update discussion.");
    console.error("Update error:", err);
  }
};

  
  return { createDisucssionForumHandler, getDisucssionForumHandler ,getDisucssionByIdHandler,updateDisucssionHandler};
};

export default DisucssionForumHandler;