import ResidentUserForm from "./components/resident/ResidentForm";
import UserHandler from "../../../../handlers/UserHandler";
import toast from "react-hot-toast";

const AddUserPage = () => {
  const { createSocietyResidentUserHandler } = UserHandler();

  const submitAdd = async (form) => {
    await createSocietyResidentUserHandler(form);
    toast.success("User added successfully");
  };

  return <ResidentUserForm mode="add" onSubmit={submitAdd} />;
};

export default AddUserPage;
