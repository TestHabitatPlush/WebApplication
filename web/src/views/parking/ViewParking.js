"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import ReusableTable from "@/components/shared/ReusableTable";
import ParkingHandler from "@/handlers/ParkingHandler";
import toast from "react-hot-toast";
import ViewParkingModal from "./ViewParkingModal";

const ViewParking = () => {
  const { getParkingDetailsHandler, societyId, token } = ParkingHandler();

  const [parkingList, setParkingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);

  useEffect(() => {
    if (societyId && token) fetchParking();
  }, [societyId, token]);

  const fetchParking = async () => {
    setLoading(true);
    try {
      const data = await getParkingDetailsHandler();
      setParkingList(data);
    } catch {
      toast.error("Failed to fetch parking slots");
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(() => [
    { Header: "ID", accessor: "parkingId" },
    { Header: "Slot Name", accessor: "parkingSlotName" },
    { Header: "Slot Type", accessor: "parkingSlotType" },
    { Header: "Usage", accessor: "parkingUsage" },
    { Header: "Charge Type", accessor: "parkingCharges" },
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
            setSelectedParking(row.original);
            setShowModal(true);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaEye />
        </button>
      ),
    },
  ], []);

  const totalPages = Math.ceil(parkingList.length / pageSize);
  const paginatedData = parkingList.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Parking Slots</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading parking slots...</p>
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
        <ViewParkingModal
          parkingData={selectedParking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ViewParking;
