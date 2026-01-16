"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import ReusableTable from "@/components/shared/ReusableTable";
import JobProfileHandler from "@/handlers/JobProfileHandler";
import ViewStaffModal from "./ViewStaffModal";
import toast from "react-hot-toast";

const StaffList = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.society.selectedSocietyId);

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  // SPA-friendly refresh key
  const [refreshKey, setRefreshKey] = useState(0);

  // Increment this to refresh staff list without full page reload
  const refreshStaff = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (societyId && token) {
      fetchStaff();
    }
  }, [societyId, token, refreshKey]); // ✅ refreshKey triggers re-fetch

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await JobProfileHandler.getStaffBySociety({ societyId, token });
      setStaffList(data || []);
    } catch (error) {
      console.error("Failed to fetch staff:", error);
      toast.error("Failed to fetch staff.");
    }
    setLoading(false);
  };

  const handleView = (staff) => {
    if (!staff) return;
    setSelectedStaff(staff);
    setIsViewMode(true);
    setShowModal(true);
  };

  const handleAddStaff = (newStaff) => {
    setStaffList((prev) => [
      ...prev,
      { ...newStaff, id: Date.now(), profileId: Date.now(), status: "active" },
    ]);
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "profileId" },
      { Header: "Name", accessor: (row) => `${row.firstName} ${row.lastName}` },
      { Header: "Mobile", accessor: "mobileNumber" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "roleCategory" },
      { Header: "Document", accessor: "documentType" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 text-xs rounded ${
              value === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {value || "-"}
          </span>
        ),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleView(row.original)}
          >
            <FaEye />
          </button>
        ),
      },
    ],
    []
  );

  const totalPages = Math.ceil(staffList.length / pageSize);
  const paginatedData = staffList.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Staff List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading staff...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={paginatedData}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalPages={totalPages}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      )}

      {showModal && (
        <ViewStaffModal
          onClose={() => setShowModal(false)}
          onAddStaff={handleAddStaff}
          staffData={selectedStaff}
          isView={isViewMode}
        />
      )}
    </div>
  );
};

export default StaffList;
export { StaffList };
