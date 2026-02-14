import React, { useEffect, useState } from "react";
import TenantHandler from "@/handlers/TenantHandler";
import MemberDetailTable from "./MemberDetailTable";

const TenantMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchTenantFamilyMembers } = TenantHandler();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    const data = await fetchTenantFamilyMembers();
    setMembers(data);
    setLoading(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <MemberDetailTable
      unitId="Tenant Family"
      members={members}
    />
  );
};

export default TenantMembers;
