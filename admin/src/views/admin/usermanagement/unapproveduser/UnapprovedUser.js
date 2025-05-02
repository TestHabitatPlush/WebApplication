import React, { useEffect, useState } from "react";
import { FaCheck, FaSearch, FaEye, FaTimes } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Input from "../../../../components/shared/Input";
import ViewUserAllDetailsModal from "../deactivateuser/ViewUserAllDetailsModal";

const UnapprovedUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUnApprovedModalOpen, setUnApprovedModal] = useState(false);

  const { getResidentBySocietyIdHandler, approveUserHandler, rejectUserHandler } = UserHandler();
  const [formData, setFormData] = useState({
    userId: "",
  });

  const paths = ["User", "Unapproved Users"];
  const Heading = ["Unapproved Users"];

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
   const userId = useSelector((state) => state.auth.user?.userId);

  useEffect(() => {
    if (societyId) {
      fetchUnapprovedUserList();
    } else {
      console.error("Society ID not found. Please check authentication state.");
    }
  }, [societyId, page, pageSize]);

  const fetchUnapprovedUserList = async () => {
    try {
      if (!societyId || !token) {
        console.error("Missing societyId or token");
        return;
      }

      const result = await getResidentBySocietyIdHandler(societyId, token, { page, pageSize });
      if (result?.residents) {
        setTransformedData(result.residents);
        setTotal(result.residents.length);
        setTotalPages(Math.ceil(result.residents.length / pageSize));
      } else {
        console.error("Unexpected API response structure:", result);
      }
    } catch (err) {
      console.error("Error fetching unapproved users:", err);
    }
  };



  const handleUnapproveUserDelete = async (userId) => {
    try {
      await rejectUserHandler(userId);
      //toast.success("User rejected successfully!");
      fetchUnapprovedUserList();
    } catch (error) {
      console.error("Error rejecting user:", error);
     // toast.error("Error rejecting user: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUnapproveUserApprove = async (userId) => {
    try {
      await approveUserHandler(userId);
      //toast.success("User approved successfully!");
      fetchUnapprovedUserList();
    } catch (error) {
      console.error("Error approving user:", error);
      //toast.error("Error approving user: " + (error.response?.data?.message || error.message));
    }
  };

  const viewUnapprovedData = (type, user) => {
    setUnApprovedModal(type);
    setSelectedUser(user);
  };

  const closeViewModal = () => {
    setUnApprovedModal(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
    { Header: "Email", accessor: "email" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
       <button
  className="text-green-600 hover:text-green-700"
  onClick={() => handleUnapproveUserApprove(row.original.userId)}
>
  <FaCheck className="text-lg" />
</button>

          <button
            className="text-yellow-500 hover:text-yellow-700"
            onClick={() => viewUnapprovedData("view", row.original)}
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleUnapproveUserDelete(row.original.userId)}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

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

          {/* View Unapproved User Details Modal */}
          {isUnApprovedModalOpen && (
            <ViewUserAllDetailsModal
              isOpen={isUnApprovedModalOpen}
              onClose={closeViewModal}
              formData={selectedUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnapprovedUser;
