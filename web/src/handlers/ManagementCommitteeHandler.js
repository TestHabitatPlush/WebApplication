// handlers/ManagementCommitteeHandler.js
import { getManagementCommitteeService } from "@/services/managementCommitteeService";
import { useSelector } from "react-redux";

const ManagementCommitteeHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.society?.societyId) || 2;
 


  const getAllCommitteeHandler = async () => {
    try {
      const response = await getManagementCommitteeService(societyId, token);
      console.log("API Response:", response);
      return {
        success: true,
        data: response.data?.members || [],
      };
    } catch (error) {
      console.error("Error fetching management committee:", error);
      return {
        success: false,
        data: [],
      };
    }
  };

  return { getAllCommitteeHandler };
};

export default ManagementCommitteeHandler;
