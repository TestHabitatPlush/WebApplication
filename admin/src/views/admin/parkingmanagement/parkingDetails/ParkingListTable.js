import React, { useEffect, useState } from "react";
import { format } from "date-fns"; 
import ReusableTable from "../../../../components/shared/ReusableTable";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import { FaEye, FaTrashAlt,FaEdit } from "react-icons/fa";
import ViewParkingDetailsModal from "./ViewParkingDetailsModal";
import UpdateParkingDetailsModal from "./UpdateParkingDetailsModal";
import toast from "react-hot-toast";


const ParkingListTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const { getParkingHandler,updateParkingHandler,getParkingDataByIdHandler,deleteParkingByIdHandler} = ParkingHandler();

 

  const fetchParkingList = async () => {
    try {
      const result = await getParkingHandler({ page, pageSize });
      console.log("Fetched Data:", result);  // Debugging the API response

      if (result?.data) {
        setTransformedData(result.data || []);
        setTotal(result.data.total || 0);
        setTotalPages(result.data.totalPages || 0);
      } else {
        setTransformedData([]);
      }
    } catch (err) {
      console.error("Error fetching facility list:", err);
      setTransformedData([]);
    }
  }; useEffect(() => {
    fetchParkingList();
  }, [page, pageSize]);

  const handleViewParking = async (id) => {
    try {
      console.log("Fetching Parking details for ID:", id); // Debugging
      const viewData = await getParkingDataByIdHandler(id);
      console.log("API Response:", viewData);  // Debugging the response

      if (viewData) {
        setShowViewFormData(viewData);  // Set the fetched data to show in modal
        setViewModal(true);  // Open the modal
        console.log("Modal should now open with data:", viewData); // Debugging
      } else {
        toast.error("Parking data not found.");
      }
    } catch (error) {
      console.error("Error fetching Parking details:", error);
      toast.error("Error fetching Parking details.");
    }
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);

  
  const toggleUpdateParkingDetailModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const handleEditParking = (parkingId) => {
    const findParkingData = transformedData.find(
      (element) => element.parkingId === parkingId
    );
    if (findParkingData) {
      setUpdateFormData(findParkingData);
      toggleUpdateParkingDetailModal();
    } else {
      toast.error("Parking data not found!");
    }
  };
  
  
  
  const onSubmitEdit = (formData) => {
    updateParkingHandler(formData);
    toggleUpdateParkingDetailModal();
  };

  const handleDeleteParking = async (id) => {
    try {
      const response = await deleteParkingByIdHandler(id);
      if (response) {
        setTransformedData((prev) => prev.filter((el) => el.facilityId !== id));
        toast.success("Parking deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting Parking:", err);
      toast.error("Failed to delete Parking.");
    }
  };

  const columns = [
    { Header: "Sl. No", accessor: "serialNumber", Cell: ({ row }) => page * pageSize + row.index + 1 },
    { Header: "Parking Id", accessor: "parkingId" },
    { Header: "Name", accessor: "parkingSlotName" },
    { Header: "Type", accessor: "parkingSlotType" },
    { Header: "Usage", accessor: "parkingUsage" },
    {
      Header: "Booking From",
      accessor: "bookingFrom",
      Cell: ({ value }) => (value ? format(new Date(value), "dd-MM-yyyy") : "N/A"),
    },
    {
      Header: "Booking To",
      accessor: "bookingTo",
      Cell: ({ value }) => (value ? format(new Date(value), "dd-MM-yyyy") : "N/A"),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
          {/* View Icon */}
          <button className="text-yellow-600 hover:text-yellow-700" onClick={() => handleViewParking(row.original.parkingId)}>
            <FaEye className="text-lg" />
          </button>
          
           {/* Edit Icon */}
           <button className="text-green-500 hover:text-green-700" onClick={() => handleEditParking(row.original.parkingId)}>
            <FaEdit className="text-lg" />
          </button>

          {/* Delete Icon */}
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteParking(row.original.parkingyId)}>
            <FaTrashAlt className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <strong>Parking List</strong>

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

      {/* Render Modal if viewModal is true */}
      <ViewParkingDetailsModal isOpen={viewModal} onClose={() => setViewModal(false)} formData={showViewFormData} />


      {showUpdateModal && (
        <UpdateParkingDetailsModal
          isOpen={showUpdateModal}
          onClose={toggleUpdateParkingDetailModal}
          formData={updateFormData}
          handleEditParking={onSubmitEdit}
        />
      )}

    </div>
  );
};

export default ParkingListTable;
