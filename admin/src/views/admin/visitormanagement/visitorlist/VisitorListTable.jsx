import React, { useEffect, useState } from "react";
import { format } from 'date-fns'; // Import date-fns or any other date formatting library
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

  const { getNewVisitorEntryTable, getVisitorById, deleteVisitorById, handleViewQRCodeById  } =
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
        setTransformedData(result.data.data || []);
        setTotal(result.data.total || 0);
        setTotalPages(result.data.totalPages || 0);
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
    console.log("Fetching QR Code for ID:", visitEntryId);
    const response = await handleViewQRCodeById(visitEntryId);
    console.log("API Response:", response);

    // Ensure the response has the expected structure
    if (response && response.data && response.data.qrCode) {
      setQrCodeData({ id: visitEntryId, qrCode: response.data.qrCode });
    } else {
      console.error("Invalid response:", response);
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

  const columns = [
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
    Cell: ({ value }) => {
      // Ensure the value is a valid date before formatting
      return value ? format(new Date(value), 'dd-MM-yyyy') : '';
    }
  },
    { Header: "Mobile No.", accessor: "visit_mobileno" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-6">
          {/* View Icon */}
          <div className="relative group">
            <button
              className="text-yellow-600 hover:text-yellow-700"
              onClick={() => handleView(row.original.visit_entry_Id)}
            >
              <FaEye className="text-lg" />
            </button>
            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-blue-500 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              View
            </span>
          </div>

          {/* QR Code Icon */}
          <div className="relative group">
            <button
              className="text-black-600 hover:text-black-700"
              onClick={() => handleViewQRCode(row.original.visit_entry_Id)}
            >
              <FaQrcode className="text-lg" />
            </button>
            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-green-500 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              QR Code
            </span>
          </div>

          {/* Delete Icon */}
          <div className="relative group">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(row.original.visit_entry_Id)}
            >
              <FaTrashAlt className="text-lg" />
            </button>
            <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-red-500 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <strong>Approved Visitor List</strong>
      <div className="grid grid-cols-5 gap-5 mt-5 items-center">
        <Input
          label="Start Date"
          type="date"
          name="startdate"
          onChange={handleSearchChange}
        />
        <Input
          label="End Date"
          type="date"
          name="enddate"
          onChange={handleSearchChange}
        />
        <Input
          label="Search By Status"
          type="text"
          name="status"
          onChange={handleSearchChange}
        />
        <Input
          label="Mobile No."
          type="number"
          name="mobileno"
          onChange={handleSearchChange}
        />
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

      {/* {qrCodeData && (
        <div className="mt-4">
          <h3>QR Code for ID: {qrCodeData.id}</h3>
          <img src={qrCodeData.qrCode} alt="QR Code" className="w-40 h-40" />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            onClick={handleDownloadQRCode}
          >
            Download QR Code
          </button>
        </div>
      )} */}

        <div>
  
    {qrCodeData && (
      <div className="mt-4">
        <h3>QR Code for ID: {qrCodeData.id}</h3>
        <img src={qrCodeData.qrCode} alt="QR Code" className="w-40 h-40" />
        <button
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          onClick={handleDownloadQRCode}
        >
          Download QR Code
        </button>
      </div>
    )}
  </div>
    </div>
  );
};

export default VisitorListTable;
