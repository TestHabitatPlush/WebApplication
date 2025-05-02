import React, { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTimes } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import ViewUserAllDetailsModal from "../deactivateuser/ViewUserAllDetailsModal"; // Ensure correct import path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const ApprovedUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const { getAllApprovedUserDataHandler, rejectUserHandler } = UserHandler();
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const paths = ["User", "Approved Users"];
  const Heading = ["Approved Users"];

  useEffect(() => {
    if (societyId && page >= 0 && pageSize > 0) {
      fetchApprovedUserList();
    } else {
      console.error("Invalid parameters: Ensure societyId, page, and pageSize are valid.");
    }
  }, [societyId, page, pageSize, searchQuery]); // Added searchQuery dependency

  const fetchApprovedUserList = async () => {
    try {
      if (!societyId || !token) {
        console.error("Missing societyId or token");
        return;
      }

      const result = await getAllApprovedUserDataHandler(societyId, token, { page, pageSize });

      // Log the entire result to inspect its structure
      console.log("API Response:", result);

      // If result is an array, set it directly
      if (Array.isArray(result)) {
        const filteredUsers = result.filter(user =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTransformedData(filteredUsers);
        setTotal(filteredUsers.length); // Assuming the length of the array is the total
        setTotalPages(Math.ceil(filteredUsers.length / pageSize));
      } else {
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      console.error("Error fetching approved users:", err);
    }
  };

  const columns = [
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
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
            onClick={() => handleView(row.original)} // Passing user object directly
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() =>handleDelete(row.original.userId)}  // Passing user ID to handleDelete
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

const handleDelete = async (userId) => {
  console.log("Rejecting user with ID:", userId);
  
  try {
    await rejectUserHandler(userId);
    toast.success("User rejected successfully!"); 
    fetchApprovedUserList(); 
  } catch (error) {
    console.error("Error rejecting user:", error);
    toast.error("Error rejecting user: " + (error.response?.data?.message || error.message));
  }
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

          <div className="flex flex-row mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-4 border w-full border-gray-300 rounded-md focus:outline-none mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
              />
              <FaSearch className="absolute right-7 top-5 text-lg text-gray-500" />
            </div>
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

      {isModalOpen && selectedUser && (
        <ViewUserAllDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={selectedUser}
        />
      )}
    </div>
  );
};

export default ApprovedUser;
