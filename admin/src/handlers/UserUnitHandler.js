import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUserUnitService } from "../services/userUnitService";

const UserUnitHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);

  // Handler to assign a unit to a user
const handleAddUserUnit = async ({ userId, unitId }) => {
  try {
    const response = await addUserUnitService(userId, unitId, token);
    return response;
  } catch (error) {
    console.error("Add UserUnit Error:", error);
    throw error;
  }
};

  return {
    handleAddUserUnit,
  }
};

export default UserUnitHandler;