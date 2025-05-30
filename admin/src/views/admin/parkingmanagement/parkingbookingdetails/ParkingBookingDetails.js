
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import React, { useEffect, useState } from "react";
import { format } from "date-fns"; 
import ReusableTable from "../../../../components/shared/ReusableTable";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import { FaEye, FaTrashAlt,FaEdit } from "react-icons/fa";
import ViewParkingDetailsModal from "../parkingDetails/ViewParkingDetailsModal";
import UpdateParkingDetailsModal from "../parkingDetails/UpdateParkingDetailsModal";
import toast from "react-hot-toast";

const ParkingBookingDetails = () => {
  const paths = ["Parking Managemen", "Parking Booking Details"];
  const Heading = ["Parking Booking Details"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <ParkingBookingDetailSearch />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <ParkingBookingDetailsTable />
      </div>
    </div>
    
  
  );
};

export default ParkingBookingDetails;

const ParkingBookingDetailSearch = () => {
  return (
    <div className="px-10 py-5 my-5 bg-gray-100 border rounded-lg">
      <div className="font-sans text-xl font-semibold text-lime">
        Search Parking Booking Request
      </div>
      <div className="grid items-center grid-cols-4 gap-3 py-4">
        <Input
          label={<div>Select Date And Time</div>}
          type="date"
          placeholder={"Serch Vendor ID"}
          size={"lg"}
        />
      </div>
    </div>
  );
};

const ParkingBookingDetailsTable = () => {
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
        console.log("Parking ID:", parkingId); // Debugging
        const findParkingData = transformedData.find(
          (element) => element.parkingId === parkingId
        );
        console.log("Found Parking Data:", findParkingData); // Debugging
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
