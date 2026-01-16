import React, { useEffect, useState } from "react";
import MemberHandler from "@/handlers/MemberHandler";
import MemberSummaryTable from "./MemberSummaryTable";
import MemberDetailTable from "./MemberDetailTable";

const AddMember = () => {
  const [units, setUnits] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { fetchUserUnits, fetchAllMembers } = MemberHandler();

  useEffect(() => {
    loadMemberData();
  }, []);

  // ✅ LOAD UNIT + FAMILY ON LOGIN
  const loadMemberData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch units
      const unitData = await fetchUserUnits();
      setUnits(unitData || []);

      if (unitData?.length > 0) {
        const unitId = unitData[0].unitId;
        setSelectedUnitId(unitId);

        // 2️⃣ Fetch all members
        const allMembers = await fetchAllMembers();

        const family = allMembers.filter(
          (m) => Number(m.unitId) === Number(unitId)
        );

        setMembersData(family);
      }
    } catch (err) {
      console.error("Failed to load member data", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CLICK UNIT → LOAD FAMILY
  const handleUnitClick = async (unitId) => {
    setSelectedUnitId(unitId);

    const allMembers = await fetchAllMembers();

    const filtered = allMembers.filter(
      (m) => Number(m.unitId) === Number(unitId)
    );

    setMembersData(filtered);
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-bold">My Unit</h2>

      <MemberSummaryTable
        loading={loading}
        units={units}
        onUnitClick={handleUnitClick}
        selectedUnitId={selectedUnitId}
      />

      {/* ✅ MEMBERS SHOWN BY DEFAULT */}
      {selectedUnitId && (
        <MemberDetailTable
          unitId={selectedUnitId}
          members={membersData}
        />
      )}
    </div>
  );
};

export default AddMember;
