import React, { useEffect, useState } from "react";
import { FaEye, FaTimes, FaEdit } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import UserHandler from "../../../../handlers/UserHandler";
import { useSelector } from "react-redux";
import ViewUserAllDetailsModal from "../deactivateuser/ViewUserAllDetailsModal";
import UpdateUserModal from "./UpdateUserModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApprovedUser = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    getAllApprovedUserDataHandler,
    updateUserForApprovedAndRejectHandler
  } = UserHandler();

  const token = useSelector((state) => state.auth.token);
   const societyId = useSelector((state) => state.auth.user?.societyId);

  const paths = ["User Management", "Approved Users"];
  const Heading = ["Approved Users"];

  useEffect(() => {
    if (societyId) fetchUsers();
  }, [societyId, page, pageSize]);

  const fetchUsers = async () => {
    try {
      const res = await getAllApprovedUserDataHandler(
        societyId,
        token,
        { page, pageSize }
      );

      if (res?.users) {
        setUsers(res.users);
        setTotal(res.total);
        setTotalPages(Math.ceil(res.total / pageSize));
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setViewModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModal(true);
  };


// const handleEdit = async (row) => {
//   try {
//     const res = await getUserByIdHandler(row.userId);

//     if (res?.user) {
//       setSelectedUser(res.user);   // ✅ FULL user data
//       setEditModal(true);
//     } else {
//       toast.error("User details not found");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to fetch user details");
//   }
// };



  const handleDeactivate = async (userId) => {
    try {
      const payload = {
        userId,
        societyId,
        status: "inactive",
      };

      const res = await updateUserForApprovedAndRejectHandler(payload);
      if (res?.status === 200) {
        toast.success("User deactivated");
        fetchUsers();
      }
    } catch (err) {
      toast.error("Failed to deactivate user");
    }
  };

  const columns = [
    {
      Header: "Sl No",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Role", accessor: "roleId" },
    { Header: "Unit ID", accessor: "unitId" },
    { Header: "Mobile", accessor: "mobileNumber" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="flex gap-4">
          <FaEye
            className="text-yellow-500 cursor-pointer hover:text-yellow-700"
            onClick={() => handleView(row.original)}
          />
          <FaEdit
            className="text-lg text-green-600 cursor-pointer hover:text-green-700"
            onClick={() => handleEdit(row.original)}
          />
          <FaTimes
            className="text-lg text-red-600 cursor-pointer hover:text-red-700"
            onClick={() => handleDeactivate(row.original.userId)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />

      <ReusableTable
        columns={columns}
        data={users}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={setPage}
        setPageSize={setPageSize}
      />

      {viewModal && (
        <ViewUserAllDetailsModal
          isOpen={viewModal}
          onClose={() => setViewModal(false)}
          formData={selectedUser}
        />
      )}

      {editModal && (
        <UpdateUserModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          userData={selectedUser}
          refreshList={fetchUsers}
        />
      )}
     
    </div>
  );
};

export default ApprovedUser;
