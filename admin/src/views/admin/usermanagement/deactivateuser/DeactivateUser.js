import React, { useEffect, useState } from "react";
import { FaCheck, FaSearch, FaEye } from "react-icons/fa";
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

  const { getAllDeactiveUserDataHandler ,approveUserHandler} = UserHandler();
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);


  const paths = ["User", "Deactivate Users"];
  const Heading = ["Deactivate Users"];

  useEffect(() => {
    if (societyId && page >= 0 && pageSize > 0) {
      fetchDeactiveUserList();
    } else {
      console.error("Invalid parameters: Ensure societyId, page, and pageSize are valid.");
    }
  }, [societyId, page, pageSize]);

  const fetchDeactiveUserList = async () => {
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
            onClick={() => handleApproveUser(row.original.userId)}
          >
            <FaCheck className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  const handleApproveUser = async (userId) => {
    try {
       await approveUserHandler(userId);
        toast.success("User rejected successfully!"); 
      fetchDeactiveUserList(); // Refresh the user list
   } catch (error) {
       console.error("Error rejecting user:", error);
       toast.error("Error rejecting user: " + (error.response?.data?.message || error.message));
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
          <div className="flex flex-row mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-4 border w-full border-gray-300 rounded-md focus:outline-none mb-4"
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
