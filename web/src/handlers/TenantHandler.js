import { getMemberDetailsService } from "@/services/memberService";
import toast from "react-hot-toast";

const TenantHandler = () => {
  const handleError = () => {
    toast.error("Failed to fetch tenant members");
  };

  // const getMemberDetailsHandler = async (unitId) => {
  //   try {
  //     if (!unitId) return [];

  //     const res = await getMemberDetailsService(unitId);

  //     const members = res.data?.data || [];

  //     // ✅ FILTER REQUIRED ROLES
  //     const filteredMembers = members.filter((m) =>
  //       ["tenant", "tenant_family", "owner_family"].includes(
  //         m.role?.roleCategory
  //       )
  //     );
      

  //     return filteredMembers;
  //   } catch (error) {
  //     handleError(error);
  //     return [];
  //   }
  // };
  const getMemberDetailsHandler = async (unitId) => {
    try {
      if (!unitId) return [];

      const res = await getMemberDetailsService(unitId);
      const members = res.data?.data || [];

      // ✅ If Society Owner → show ALL
      if (loggedInRole === "society_owner") {
        return members;
      }

      // ✅ Others → limited roles only
      const allowedRoles = [
        "tenant",
        "tenant_family",
        "owner_family",
      ];

      return members.filter((m) =>
        allowedRoles.includes(m.role?.roleCategory)
      );
    } catch (error) {
      handleError(error);
      return [];
    }
  };
  return { getMemberDetailsHandler };
};

export default TenantHandler;
