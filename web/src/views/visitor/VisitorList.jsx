"use client";
import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { FaEye, FaTrashAlt, FaQrcode } from "react-icons/fa";
import VisitHandler from "@/handlers/VisitorHandler";
import toast from "react-hot-toast";
import ViewVisitorModal from "./ViewVisitorModal";

const VisitorList = () => {
  const { getVisitorListBySenderId, handleViewQRCodeById, getVisitorById, deleteVisitorById } =
    VisitHandler();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [transformedData, setTransformedData] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

const handleView = async (row) => {
  try {
    const response = await getVisitorById(row.visit_entry_Id);

    // ✅ FIX: extract actual visitor object
    const visitorData = response?.data || response;

    if (visitorData) {
      setSelectedVisitor(visitorData);
      setIsViewModalOpen(true);
    }
  } catch (error) {
    console.error("Error fetching visitor details:", error);
  }
};


  // Fetch visitor list
  const fetchVisitorList = async () => {
    try {
      const result = await getVisitorListBySenderId();
      console.log("Visitor API result:", result); // Debug
      if (Array.isArray(result)) {
        setTransformedData(result);
        setFilteredData(result);
      } else {
        setTransformedData([]);
        setFilteredData([]);
      }
    } catch (err) {
      console.error("Error fetching visitor list:", err);
      setTransformedData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchVisitorList();
  }, []);

  // Handle view QR code
  const handleViewQRCode = async (row) => {
    try {
      const qrCode = await handleViewQRCodeById(row.visit_entry_Id);
      if (qrCode) {
        setQrCodeData({ id: row.visit_entry_Id, qrCode });
        toast.success("QR Code fetched successfully.");
      } else {
        toast.error("Failed to fetch QR Code.");
      }
    } catch (err) {
      toast.error("Error fetching QR Code.");
    }
  };

  // Handle delete visitor
  const handleDelete = async (row) => {
    try {
      await deleteVisitorById(row.visit_entry_Id);
      toast.success("Visitor deleted successfully.");
      fetchVisitorList();
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  // Handle view visitor details
  // const handleView = async (row) => {
  //   try {
  //     const viewData = await getVisitorById(row.visit_entry_Id);
  //     if (viewData) {
  //       console.log("Visitor Details:", viewData);
  //       toast.success("Visitor details fetched successfully.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching visitor details:", error);
  //   }
  // };

  // Handle search
  const handleSearch = () => {
    const filtered = transformedData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Table columns
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "visit_entry_Id" },
      { Header: "Name", accessor: "visit_name" },
      { Header: "Phone", accessor: "visit_mobileno" },
      { Header: "Purpose", accessor: "visit_purpose" },
      { Header: "Address", accessor: "visit_location" },
      {
          Header: "Entry Date",
          accessor: "visit_expect_date_of_entry_date",
          Cell: ({ value }) => {
            if (!value) return "-";
            return new Date(value).toLocaleDateString("en-IN"); // DD/MM/YYYY
          },
        },

      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => handleView(row.original)} className="text-blue-500 hover:text-blue-700">
              <FaEye />
            </button>
            <button onClick={() => handleViewQRCode(row.original)} className="text-black-500 hover:text-green-700">
              <FaQrcode />
            </button>
            <button onClick={() => handleDelete(row.original)} className="text-red-500 hover:text-red-700">
              <FaTrashAlt />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Table setup
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: filteredData },
    useSortBy
  );

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-bold">Visitor List</h3>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200 table-auto" {...getTableProps()}>
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    key={colIndex}
                    className="px-4 py-2 text-left border border-gray-200"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original.visit_entry_Id}>
                  {row.cells.map((cell, idx) => (
                    <td key={idx} className="px-4 py-2 border border-gray-200" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
{isViewModalOpen && (
  <ViewVisitorModal
    visitor={selectedVisitor}
    onClose={() => {
      setIsViewModalOpen(false);
      setSelectedVisitor(null);
    }}
  />
)}

      {/* QR Code Display */}
      {qrCodeData && (
        <div className="mt-4">
          <h4>QR Code for ID: {qrCodeData.id}</h4>
          <img src={qrCodeData.qrCode} alt="QR Code" className="w-32 h-32" />
        </div>
      )}
    </div>
  );
};

export default VisitorList;
