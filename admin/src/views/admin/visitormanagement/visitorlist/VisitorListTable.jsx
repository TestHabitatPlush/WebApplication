import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import ReusableTable from "../../../../components/shared/ReusableTable";
import VisitEntryHandler from "../../../../handlers/VisitorEntryHandler";
import { FaEye, FaTrashAlt, FaQrcode } from "react-icons/fa";
import ViewVisitorDetailsModal from "./ViewVisitorDetailsModal";
import toast from "react-hot-toast";

const VisitorListTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [visitorsearch, setVisitorSearch] = useState({
    startdate: "",
    enddate: "",
    status: "",
    mobileno: "",
  });

  const [selectedRows, setSelectedRows] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const { getNewVisitorEntryTable, getVisitorById, deleteVisitorById, handleViewQRCodeById } =
    VisitEntryHandler();

  const [qrCodeData, setQrCodeData] = useState(null);
  const [viewmodal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  useEffect(() => {
    fetchVisitorList();
  }, [page, pageSize]);

  const fetchVisitorList = async () => {
    try {
      const result = await getNewVisitorEntryTable({ page, pageSize });
      if (result && result.data) {
        const data = result.data.data || [];
        setTransformedData(data);
        setTotal(result.data.total || 0);
        setTotalPages(result.data.totalPages || 0);
        setSelectedRows({});
        setSelectAll(false);
      } else {
        setTransformedData([]);
      }
    } catch (err) {
      console.error("Error fetching visitor list:", err);
      setTransformedData([]);
    }
  };

  const handleView = async (id) => {
    try {
      const viewData = await getVisitorById(id);
      if (viewData?.data) {
        setShowViewFormData(viewData.data);
        setViewModal(true);
      }
    } catch (error) {
      console.error("Error fetching visitor details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteVisitorById(id);
      if (response) {
        setTransformedData((prev) => prev.filter((el) => el.visit_entry_Id !== id));
      }
    } catch (err) {
      console.error("Error deleting visitor:", err);
    }
  };

  const handleViewQRCode = async (visitEntryId) => {
    try {
      const response = await handleViewQRCodeById(visitEntryId);
      if (response && response.data && response.data.qrCode) {
        setQrCodeData({ id: visitEntryId, qrCode: response.data.qrCode });
      } else {
        toast.error("QR Code could not be retrieved.");
      }
    } catch (err) {
      console.error("Error in handleViewQRCode:", err);
      toast.error("An error occurred while fetching the QR Code.");
    }
  };

  const handleDownloadQRCode = () => {
    if (qrCodeData && qrCodeData.qrCode) {
      const a = document.createElement("a");
      a.href = qrCodeData.qrCode;
      a.download = `Visitor_QR_${qrCodeData.id}.png`;
      a.click();
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setVisitorSearch({ ...visitorsearch, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await getNewVisitorEntryTable(visitorsearch);
      setTransformedData(result.data.data || []);
    } catch (err) {
      console.error("Error during search:", err);
    }
  };

  const toggleViewNoticeDetailModal = () => {
    setViewModal((prev) => !prev);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newSelectedRows = {};
    if (newSelectAll) {
      transformedData.forEach((row) => {
        newSelectedRows[row.visit_entry_Id] = true;
      });
    }
    setSelectAll(newSelectAll);
    setSelectedRows(newSelectedRows);
  };

  const columns = [
    {
      id: "selection",
      Header: () => (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
        />
      ),
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={!!selectedRows[row.original.visit_entry_Id]}
          onChange={() => toggleRowSelection(row.original.visit_entry_Id)}
        />
      ),
    },
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
    { Header: "Visitor Id", accessor: "visit_entry_Id" },
    { Header: "Name", accessor: "visit_name" },
    {
      Header: "Date of Entry",
      accessor: "visit_expect_date_of_entry_date",
      Cell: ({ value }) => value ? format(new Date(value), 'dd-MM-yyyy') : '',
    },
    { Header: "Mobile No.", accessor: "visit_mobileno" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-6">
          <div className="relative group">
            <button
              className="text-yellow-600 hover:text-yellow-700"
              onClick={() => handleView(row.original.visit_entry_Id)}
            >
              <FaEye className="text-lg" />
            </button>
            <span className="absolute px-3 py-1 text-xs text-white transition transform -translate-x-1/2 bg-blue-500 rounded opacity-0 pointer-events-none bottom-6 left-1/2 group-hover:opacity-100">
              View
            </span>
          </div>

          <div className="relative group">
            <button
              className="text-black-600 hover:text-black-700"
              onClick={() => handleViewQRCode(row.original.visit_entry_Id)}
            >
              <FaQrcode className="text-lg" />
            </button>
            <span className="absolute px-3 py-1 text-xs text-white transition transform -translate-x-1/2 bg-green-500 rounded opacity-0 pointer-events-none bottom-6 left-1/2 group-hover:opacity-100">
              QR Code
            </span>
          </div>

          <div className="relative group">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(row.original.visit_entry_Id)}
            >
              <FaTrashAlt className="text-lg" />
            </button>
            <span className="absolute px-3 py-1 text-xs text-white transition transform -translate-x-1/2 bg-red-500 rounded opacity-0 pointer-events-none bottom-6 left-1/2 group-hover:opacity-100">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
          
      <div className="flex">
        <div className="w-full">
       
          <div classNametotal="flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL {total} USERS
          </div>

      <div className="grid items-center grid-cols-5 gap-5 mt-5">
        <Input label="Start Date" type="date" name="startdate" onChange={handleSearchChange} />
        <Input label="End Date" type="date" name="enddate" onChange={handleSearchChange} />
        <Input label="Search By Status" type="text" name="status" onChange={handleSearchChange} />
        <Input label="Mobile No." type="number" name="mobileno" onChange={handleSearchChange} />
        <Button onClick={handleSubmit}>Search</Button>
      </div>

      <ReusableTable
        columns={columns}
        data={transformedData}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={setPage}
        setPageSize={setPageSize}
      />

      {viewmodal && (
        <ViewVisitorDetailsModal
          isOpen={viewmodal}
          onClose={toggleViewNoticeDetailModal}
          formData={showViewFormData}
        />
      )}

      {qrCodeData && (
        <div className="mt-4">
          <h3>QR Code for ID: {qrCodeData.id}</h3>
          <img src={qrCodeData.qrCode} alt="QR Code" className="w-40 h-40" />
          <button
            className="px-4 py-2 mt-2 text-white bg-green-500 rounded"
            onClick={handleDownloadQRCode}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default VisitorListTable;
