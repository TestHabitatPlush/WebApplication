import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchTenantFamily = async (token) => {
  try {
    const res = await axios.get("`${BASE_URL}/family/myunits/members", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success) {
      // Filter tenant family
      const tenantFamilies = res.data.data.filter(
        (member) => member.userRole.roleCategory === "society_tenant_family"
      );
      return tenantFamilies;
    }
    return [];
  } catch (error) {
    console.error("Error fetching tenant family:", error);
    return [];
  }
};
