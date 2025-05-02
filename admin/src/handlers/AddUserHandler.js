import toast from "react-hot-toast";
import { adduserService } from "../services/adduserService";

const AddUserHandler = () => {
  const CreateAddUserHandler = async (data) => {
    return await adduserService(data).then((res) => {
      if (res.status === 201) {
        toast.success("User Created successfully.");
      }
    });
  };

  return {
    CreateAddUserHandler,
  };
};

export default AddUserHandler;
