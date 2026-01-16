import { getManagementCommitteeService } from "@/services/managementCommitteeService";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const ManagementCommitteeHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const society = useSelector((state) => state.society.selectedSocietyId);

  const societyId = society?.id;

  const getAllCommitteeHandler = useCallback(async () => {
    if (!token || !societyId) {
      console.warn("Missing token or societyId", { token, societyId });
      return { success: false, members: [] };
    }

    try {
      const response = await getManagementCommitteeService(
        societyId,
        token
      );

      return {
        success: true,
        members: response?.data?.members || [],
      };
    } catch (error) {
      console.error("Management committee error:", error);
      return { success: false, members: [] };
    }
  }, [token, societyId]);

  return { getAllCommitteeHandler };
};

export default ManagementCommitteeHandler;
