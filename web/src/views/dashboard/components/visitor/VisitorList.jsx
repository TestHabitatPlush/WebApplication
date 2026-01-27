"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import ReusableTable from "@/components/shared/ReusableTable";
import VisitorHandler from "@/handlers/VisitorHandler";
import toast from "react-hot-toast";
import ViewVisitorModal from "./ViewVisitorModal";

const VisitorList = () => {
  const { getVisitorListBySenderId, getVisitorById } = VisitorHandler();

  const [visitorList, setVisitorList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const response = await getVisitorListBySenderId();
      setVisitorList(response || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch visitors");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FETCH VISITOR BY ID ON EYE CLICK
  const handleViewVisitor = async (visitEntryId) => {
    setModalLoading(true);
    try {
      const data = await getVisitorById(visitEntryId);
      if (!data) return;

      setSelectedVisitor(data);
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to load visitor details");
    } finally {
      setModalLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Visitor Name", accessor: "visitorName" },
      { Header: "Mobile", accessor: "mobileNumber" },
      { Header: "Role", accessor: "visitorRole" },
      {
        Header: "Entry Time",
        accessor: "entryTime",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleString() : "-",
      },
      {
        Header: "Exit Time",
        accessor: "exitTime",
        Cell: ({ value }) =>
          value ? new Date(value).toLocaleString() : "Inside",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <button
            type="button"
            onClick={() =>
              handleViewVisitor(row.original.visit_entry_Id)
            }
            className="text-blue-600 hover:text-blue-800"
          >
            <FaEye />
          </button>
        ),
      },
    ],
    []
  );

  const totalPages = Math.ceil(visitorList.length / pageSize);
  const paginatedData = visitorList.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  return (
    <div className="p-5">
      <h2 className="mb-4 text-xl font-bold">Visitor List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading visitors...</p>
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

      {/* ✅ MODAL */}
      {showModal && (
        <ViewVisitorModal
          visitorData={selectedVisitor}
          loading={modalLoading}
          onClose={() => {
            setShowModal(false);
            setSelectedVisitor(null);
          }}
        />
      )}
    </div>
  );
};

export default VisitorList;
