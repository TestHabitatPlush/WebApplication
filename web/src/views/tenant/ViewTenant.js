import React, { useEffect, useState } from "react";
import TenantHandler from "@/handlers/TenantHandler";
import TenantSummaryTable from "./TenantSummaryTable";
import TenantDetailTable from "./TenantDetailTable";

const ViewTenant = () => {
   const [members, setMembers] = useState([]);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchTenantFamilyData } = TenantHandler();

  useEffect(() => {
    setLoading(true);
    const { units, members } = fetchTenantFamilyData();
    setUnits(units);
    setMembers(members);
    setLoading(false);
  }, []);

  if (loading) return <p>Loading tenant family...</p>;

  return (
    <div>
      <h2>Tenant Family Members</h2>
      {members.length === 0 ? (
        <p>No tenant family members found.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.userId}>
                <td>{member.firstName} {member.lastName}</td>
                <td>{member.email}</td>
                <td>{member.mobileNumber}</td>
                <td>{units.find(u => u.unitId === member.unitId)?.unitName || member.unitId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ViewTenant;
