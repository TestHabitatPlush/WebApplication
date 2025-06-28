import React, { useEffect, useState } from "react";
import { format } from "date-fns"; 
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import FacilityHandler from "../../../../handlers/FacilityHandler";
import { FaEye, FaTrashAlt,FaEdit } from "react-icons/fa";
import ViewFacilityDetailsModal from "../facility/ViewFacilityDetailsModal";
import UpdateFacilityDetailsModal from "../facility/UpdateFacilityDetailsModal ";
import toast from "react-hot-toast";


const FacilityBookingDetails = () => {
  const paths = ["Facility Management", "Facility Booking Details"];
  const Heading = ["Facility Booking Details"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <FacilityBookingDetailSearch />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
         <FacilityBookingDetailsTable />
      </div>
     
    </div>
  );
};

export default FacilityBookingDetails;

const FacilityBookingDetailSearch = () => {
  return (
    <div className="px-10 py-5 my-5 bg-gray-100 border rounded-lg">
      <div className="font-sans text-xl font-semibold text-lime">
        Search Facility Booking Request
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

const FacilityBookingDetailsTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const { getFacilityHandler, deleteFacilityByIdHandler, getFacilityDataByIdHandler ,updateFacilityHandler} = FacilityHandler();

  useEffect(() => {
    fetchFacilityList();
  }, [page, pageSize]);

  const fetchFacilityList = async () => {
    try {
      const result = await getFacilityHandler({ page, pageSize });
      console.log("Fetched Data:", result);  // Debugging the API response

      if (result?.data) {
        setTransformedData(result.data.data || []);
        setTotal(result.data.total || 0);
        setTotalPages(result.data.totalPages || 0);
      } else {
        setTransformedData([]);
      }
    } catch (err) {
      console.error("Error fetching facility list:", err);
      setTransformedData([]);
    }
  };

  const handleViewFacility = async (id) => {
    try {
      console.log("Fetching facility details for ID:", id); // Debugging
      const viewData = await getFacilityDataByIdHandler(id);
      console.log("API Response:", viewData);  // Debugging the response

      if (viewData) {
        setShowViewFormData(viewData);  // Set the fetched data to show in modal
        setViewModal(true);  // Open the modal
        console.log("Modal should now open with data:", viewData); // Debugging
      } else {
        toast.error("Facility data not found.");
      }
    } catch (error) {
      console.error("Error fetching facility details:", error);
      toast.error("Error fetching facility details.");
    }
  };

  // const handleEditFacility =async(id)=>{
  //   alert("sdds");
  // }
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  
  

  const toggleUpdateFacilityDetailModal = () => {
    setShowUpdateModal((prev) => !prev);
  };
  // const handleEditFacility = (facilityId) => {
  //   const findFacilityData = facility.find(
  //     (element) => element.facilityId === facilityId
  //   );
  //   setUpdateFormData(findFacilityData);
  //   toggleUpdateFacilityDetailModal();
  // };
  const handleEditFacility = (facilityId) => {
    console.log("Facility ID:", facilityId); // Debugging
    const findFacilityData = transformedData.find(
      (element) => element.facilityId === facilityId
    );
    console.log("Found Facility Data:", findFacilityData); // Debugging
    if (findFacilityData) {
      setUpdateFormData(findFacilityData);
      toggleUpdateFacilityDetailModal();
    } else {
      toast.error("Facility data not found!");
    }
  };
  
  const onSubmitEdit = (formData) => {
    updateFacilityHandler(formData);
    toggleUpdateFacilityDetailModal();
  };

  const handleDeleteFacility = async (id) => {
    try {
      const response = await deleteFacilityByIdHandler(id);
      if (response) {
        setTransformedData((prev) => prev.filter((el) => el.facilityId !== id));
        //toast.success("Facility deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting facility:", err);
      //toast.error("Failed to delete facility.");
    }
  };

  const columns = [
    { Header: "Sl. No", accessor: "serialNumber", Cell: ({ row }) => page * pageSize + row.index + 1 },
    { Header: "Facility Id", accessor: "facilityId" },
    { Header: "Name", accessor: "facilityName" },
    { Header: "Type", accessor: "facilityType" },
    { Header: "Usage", accessor: "facilityUsage" },
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
          <button className="text-yellow-600 hover:text-yellow-700" onClick={() => handleViewFacility(row.original.facilityId)}>
            <FaEye className="text-lg" />
          </button>
          
           {/* Edit Icon */}
           <button className="text-green-500 hover:text-green-700" onClick={() => handleEditFacility(row.original.facilityId)}>
            <FaEdit className="text-lg" />
          </button>

          {/* Delete Icon */}
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteFacility(row.original.facilityId)}>
            <FaTrashAlt className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <strong>Facility List</strong>

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
      <ViewFacilityDetailsModal isOpen={viewModal} onClose={() => setViewModal(false)} formData={showViewFormData} />


      {showUpdateModal && (
        <UpdateFacilityDetailsModal
          isOpen={showUpdateModal}
          onClose={toggleUpdateFacilityDetailModal}
          formData={updateFormData}
          handleEditFacility={onSubmitEdit}
        />
      )}

    </div>
  );
};
