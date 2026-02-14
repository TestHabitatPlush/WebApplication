import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberHandler from "@/handlers/MemberHandler";
import MemberSummaryTable from "./MemberSummaryTable";
import MemberDetailTable from "./MemberDetailTable";
import BackButton from "@/components/shared/BackButton";

const ViewMember = () => {
  const user = useSelector((state) => state.auth?.user);

  const roleCategory = user?.role?.roleCategory;
  const unitIdFromUser = user?.unitId;

  const [units, setUnits] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    fetchUserUnits,
    fetchAllMembers,
    getMemberDetailsHandler,
  } = MemberHandler();

  useEffect(() => {
    if (!roleCategory) return;

    if (roleCategory === "society_owner") {
      loadOwnerData();
    } else {
      loadNonOwnerData();
    }
  }, [roleCategory]);

  // ================= OWNER FLOW =================
  const loadOwnerData = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch owner units (token-based)
      const unitData = await fetchUserUnits();
      setUnits(unitData || []);

      if (unitData?.length > 0) {
        const firstUnitId = unitData[0].unitId;
        setSelectedUnitId(firstUnitId);

        // 2️⃣ Fetch all members (token-based)
        const allMembers = await fetchAllMembers();

        const filtered = allMembers.filter(
          (m) => Number(m.unitId) === Number(firstUnitId)
        );

        setMembersData(filtered);
      }
    } catch (err) {
      console.error("Owner data load failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitClick = async (unitId) => {
    setSelectedUnitId(unitId);

    const allMembers = await fetchAllMembers();

    const filtered = allMembers.filter(
      (m) => Number(m.unitId) === Number(unitId)
    );

    setMembersData(filtered);
  };

  // ================= NON-OWNER FLOW =================
  const loadNonOwnerData = async () => {
    try {
      setLoading(true);

      if (!unitIdFromUser) return;

      const members = await getMemberDetailsHandler(unitIdFromUser);
      setMembersData(members);
    } catch (err) {
      console.error("Member load failed", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="p-5 space-y-6">
      <BackButton />
      <h2 className="text-xl font-bold">My Unit Members</h2>

      {/* ✅ OWNER → TWO TABLES */}
      {roleCategory === "society_owner" && (
        <>
          <MemberSummaryTable
            loading={loading}
            units={units}
            onUnitClick={handleUnitClick}
            selectedUnitId={selectedUnitId}
          />

          {selectedUnitId && (
            <MemberDetailTable
              members={membersData}
              loading={loading}
            />
          )}
        </>
      )}

      {/* ✅ NON-OWNER → ONE TABLE */}
      {roleCategory !== "society_owner" && (
        <MemberDetailTable
          members={membersData}
          loading={loading}
        />
      )}
    </div>
  );
};

export default ViewMember;
