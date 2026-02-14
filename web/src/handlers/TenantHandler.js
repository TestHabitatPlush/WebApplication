import { useSelector } from "react-redux";

const TenantHandler = () => {
  // Get logged-in user from Redux
  const loggedInUser = useSelector((state) => state.auth?.user);
  const allMembers = useSelector((state) => state.members?.allMembers || []); // Assuming you store members in Redux

  const fetchTenantFamilyData = () => {
    if (!loggedInUser) return { units: [], members: [] };

    const loggedInRole = loggedInUser.userRole?.roleCategory;
    const tenantUnitId = loggedInUser.unitId;

    // 🔹 Units (unique)
    const unitsMap = {};
    allMembers.forEach((m) => {
      if (m.unitId && !unitsMap[m.unitId]) {
        unitsMap[m.unitId] = {
          unitId: m.unitId,
          unitName: m.unit?.unitName || `Unit ${m.unitId}`,
        };
      }
    });

    const units = Object.values(unitsMap);

    // 🔹 Filter tenant family members of the same unit
    let members = [];
    if (loggedInRole === "society_tenant") {
      members = allMembers.filter(
        (m) =>
          m.userRole?.roleCategory === "society_tenant_family" &&
          Number(m.unitId) === Number(tenantUnitId)
      );
    }

    return { units, members, tenantUnitId };
  };

  return {
    fetchTenantFamilyData,
  };
};

export default TenantHandler;
