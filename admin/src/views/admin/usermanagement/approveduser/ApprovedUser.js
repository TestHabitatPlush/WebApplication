import React, { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import ViewUserAllDetailsModal from "../deactivateuser/ViewUserAllDetailsModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApprovedUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { getAllApprovedUserDataHandler, updateUserForApprovedAndRejectHandler } = UserHandler();
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);

  const paths = ["User Management", "Approved Users"];
  const Heading = ["Approved Users"];

  useEffect(() => {
    if (societyId) {
      fetchApprovedUserList();
    }
  }, [societyId, page, pageSize]);

  const fetchApprovedUserList = async () => {
    try {
      const result = await getAllApprovedUserDataHandler(societyId, token, { page, pageSize });
      if (result && result.users) {
        setTransformedData(result.users);
        setTotal(result.total);
        setTotalPages(Math.ceil(result.total / pageSize));
      } else {
        setTransformedData([]);
        setTotal(0);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("Error fetching approved users:", err);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      if (!societyId || !token) {
        console.error("Society ID or token is missing.");
        return;
      }

      const updatedUser = {
        userId,
        status: "inactive",
        societyId,
      };

      const response = await updateUserForApprovedAndRejectHandler(updatedUser);

      if (response && response.status === 200) {
        toast.success("User deactivated successfully!");
        fetchApprovedUserList();
      } else {
        toast.error("Failed to deactivate user.");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
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
          <button className="text-yellow-500 hover:text-yellow-700" onClick={() => handleView(row.original)}>
            <FaEye className="text-lg" />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(row.original.userId)}>
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
