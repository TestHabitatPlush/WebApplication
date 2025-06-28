import React, { useEffect, useState } from "react";
import { FaCheck, FaEye } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import ViewUserAllDetailsModal from "./ViewUserAllDetailsModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DeactivateUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user data

  const { getAllDeactiveUserDataHandler ,updateUserForApprovedAndRejectHandler} = UserHandler();
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);


  const paths = ["User Management", "Deactivate Users"];
  const Heading = ["Deactivate Users"];

  useEffect(() => {
    if (societyId && page >= 0 && pageSize > 0) {
      fetchAllDeactiveUserList();
    } else {
      console.error("Invalid parameters: Ensure societyId, page, and pageSize are valid.");
    }
  }, [societyId, page, pageSize]);

  const fetchAllDeactiveUserList = async () => {
    try {
      if (!societyId || !token) {
        console.error("Missing societyId or token");
        return;
      }

      const result = await getAllDeactiveUserDataHandler(societyId, token, { page, pageSize });

      if (result && Array.isArray(result.users)) {
        setTransformedData(result.users);
        setTotal(result.total || result.users.length);
        setTotalPages(Math.ceil((result.total || result.users.length) / pageSize));
      } else {
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      console.error("Error fetching deactivate users:", err);
    }
  };

  const columns = [
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
     { Header: "User Id", accessor: "userId" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Role", accessor: "roleId" },
    { Header: "Mobile No.", accessor: "mobileNumber" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
          <button
            className="text-yellow-500 hover:text-yellow-700"
            onClick={() => handleView(row.original)}
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => handleActivate(row.original.userId)}
          >
            <FaCheck className="text-lg" />
          </button>
        </div>
      ),
    },
  ];
  const handleActivate = async (userId) => { // Expect only userId
    try {
      if (!societyId || !token) {
        console.error("Society ID or token is missing.");
        return;
      }
  
      const updatedUser = {
        userId,  // Ensure only userId is passed
        status: "active",
        societyId,
      };
  
      console.log("Activating user:", updatedUser);
  
      const response = await updateUserForApprovedAndRejectHandler(updatedUser);
      
      if (response && response.status === 200) { // Ensure response is successful
        toast.success("User activated successfully!");
        fetchAllDeactiveUserList(); // Refresh list
      } else {
        console.error("Activation failed:", response);
        toast.error("Failed to activate user.");
      }
    } catch (error) {
      console.error("Error activating user:", error);
      toast.error("Error activating user: " + (error.response?.data?.message || error.message));
    }
  };
  
  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <UrlPath paths={paths} />
      <div className="flex">
        <div className="w-full">
          <PageHeading heading={Heading} />
          <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL {total} USERS
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
        </div>
      </div>

      {/* Modal for Viewing User Details */}
      {isModalOpen && (
        <ViewUserAllDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={selectedUser}
        />
      )}
    </div>
  );
};

export default DeactivateUser;
