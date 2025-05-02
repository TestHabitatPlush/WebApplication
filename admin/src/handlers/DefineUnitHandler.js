import toast from "react-hot-toast";
import { createDefineUnitService, getUnitsServices } from "../services/defineunitService";
import { useSelector } from "react-redux";

const DefineUnitHandler = () => {
  // Safely accessing Redux state using optional chaining (?.) to avoid errors
  const token = useSelector((state) => state.auth?.token);
  const societyId = useSelector((state) => state.auth?.user?.Customer?.customerId);

  // Debugging logs to check Redux state
  const userState = useSelector((state) => state.auth?.user);
  console.log("User State:", userState);

  const CreateDefineUnitHandler = async (data) => {
    const requiredFields = ["unitName", "buildingId", "floorId", "unitTypeId", "unitNumber", "unitsize"];
    const missingField = requiredFields.find((field) => !data[field]);

    if (missingField) {
      return toast.error(`${missingField} is missing`);
    }

    if (!societyId) {
      return toast.error("Invalid society ID. Please check your login status.");
    }

    try {
      const response = await createDefineUnitService({ societyId, ...data }, token);
      if (response.status === 201) {
        toast.success(`Unit ${data.unitName} created successfully.`);
      }
      return response;
    } catch (error) {
      console.error("Create Unit Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred while creating the unit.");
    }
  };

  const getUnitsHandler = async (filters = {}) => {
    if (!societyId) {
      toast.error("Invalid society ID. Cannot fetch units.");
      return null;
    }

    try {
      const response = await getUnitsServices(societyId, { ...filters }, token);
      return response.data;
    } catch (error) {
      console.error("Get Units Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred while fetching units.");
      return null;
    }
  };

  return {
    CreateDefineUnitHandler,
    getUnitsHandler,
  };
};

export default DefineUnitHandler;
