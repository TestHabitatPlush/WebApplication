"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import ReusableTable from "@/components/shared/ReusableTable";
import FacilityHandler from "@/handlers/FacilityHandler";
import toast from "react-hot-toast";
import ViewFacilityModal from "./ViewFacilityModal";

const ViewFacility = () => {
  const { getFacilityDetailsHandler, societyId, token } = FacilityHandler();

  const [facilityList, setFacilityList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    if (societyId && token) {
      fetchFacilities();
    }
  }, [societyId, token]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const data = await getFacilityDetailsHandler();
      setFacilityList(data);
    } catch (error) {
      toast.error("Failed to fetch facilities");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "facilityId" },
      { Header: "Facility Name", accessor: "facilityName" },
      { Header: "Type", accessor: "facilityType" },
      { Header: "Usage", accessor: "facilityUsage" },
      { Header: "Charge Type", accessor: "facilityCharge" },
      {
        Header: "Amount",
        accessor: "chargeAmount",
        Cell: ({ value }) => (value > 0 ? `₹${value}` : "Free"),
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedFacility(row.original);
              setShowModal(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEye />
          </button>
        ),
      },
    ],
    []
  );

  const totalPages = Math.ceil(facilityList.length / pageSize);
  const paginatedData = facilityList.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Facility List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading facilities...</p>
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

      {/* ✅ VIEW MODAL */}
      {showModal && (
        <ViewFacilityModal
          facilityData={selectedFacility}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ViewFacility;
