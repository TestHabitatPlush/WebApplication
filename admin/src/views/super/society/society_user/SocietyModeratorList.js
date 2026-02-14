import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  AdminHandler,
  UserHandler,
} from "../../../../components/common/imports";

import ReusableTable from "../../../../components/shared/ReusableTable";
import ViewSocietyModeratorModal from "./ViewSocietyModeratorModal";
import CreateUserForm from "../../../../forms/CreateUserForm";

import {
  FaEye,
  FaEdit,
  FaClock,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Dialog from "../../../../components/ui/Dialog";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";

/* -----------------------------------------
   Action component
----------------------------------------- */
const ActionDataForSocietyModerate = ({
  original,
  onView,
  onEdit,
  onStatusChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!original) return null;

  const status = (original.status || "").toLowerCase();

  const handleChange = async (newStatus) => {
    try {
      setLoading(true);
      await onStatusChange(original, newStatus);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = () => {
    if (status === "active") {
      return (
        <FaCheck
          title="Active"
          className="text-lg text-green-600 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      );
    }

    if (status === "inactive") {
      return (
        <FaTimes
          title="Inactive"
          className="text-lg text-red-600 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      );
    }

    return (
      <FaClock
        title="Pending"
        className="text-lg text-yellow-500 cursor-pointer"
        onClick={() => setOpen(true)}
      />
    );
  };

  return (
    <>
      <div className="flex items-center gap-3 pointer-events-auto">
        <FaEye
          title="View"
          className="text-lg text-orange-500 cursor-pointer hover:text-orange-800"
          onClick={() => onView(original)}
        />

        <FaEdit
          title="Edit"
          className="text-lg text-green-500 cursor-pointer hover:text-green-800"
          onClick={() => onEdit(original)}
        />

        <StatusIcon />
      </div>

<Dialog
  isOpen={open}
  onClose={() => !loading && setOpen(false)}
  className="fixed inset-0 z-50 flex items-center justify-center"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  contentClassName="relative w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
>
  <h3 className="mb-4 text-lg font-semibold text-gray-800">
    Change Status
  </h3>

  <div className="flex flex-col gap-3">
    {status === "pending" && (
      <div className="flex gap-3">
        <button
          disabled={loading}
          onClick={() => handleChange("active")}
          className="flex-1 px-4 py-2 text-white transition bg-green-600 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
        >
          Activate
        </button>

        <button
          disabled={loading}
          onClick={() => handleChange("inactive")}
          className="flex-1 px-4 py-2 text-white transition bg-red-600 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          Inactivate
        </button>
      </div>
    )}

    {status === "active" && (
      <button
        disabled={loading}
        onClick={() => handleChange("inactive")}
        className="w-full px-4 py-2 text-white transition bg-red-600 rounded shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
      >
        Inactivate
      </button>
    )}

    {status === "inactive" && (
      <button
        disabled={loading}
        onClick={() => handleChange("active")}
        className="w-full px-4 py-2 text-white transition bg-green-600 rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
      >
        Activate
      </button>
    )}
  </div>

  <button
    type="button"
    onClick={() => setOpen(false)}
    disabled={loading}
    className="w-full px-4 py-2 mt-4 text-gray-700 transition bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
  >
    Cancel
  </button>
</Dialog>
    </>
  );
};

const SocietyModeratorList = () => {
  const token = useSelector((state) => state.auth?.token || null);

  const selectOptions = useSelector(
    (state) => state.societyModeratorForm?.selectOptions
  );
 const paths = ["Society Management","Society Moderators List/User List"];
  const Heading = ["Society Moderators List/User List"];
  const { getAllSuperAdminItAndModeratorHandler } = AdminHandler();
  const { updateUserIdStatusHandler } = UserHandler();

  const [allModerators, setAllModerators] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");

  /* ---------------- fetch all data once ---------------- */
  const fetchModerators = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // IMPORTANT : no search here (frontend search only)
      const res = await getAllSuperAdminItAndModeratorHandler();

      const users = res?.users || res?.data || res || [];

      const mapped = users.map((u) => ({
        ...u,
        userId: u.userId || u._id,
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
        email: u.email,
        mobileNumber: u.mobileNumber,
        roleId: u.roleId,
        roleCategory: u.userRole?.roleCategory || u.roleCategory,
        status: u.status,
        managementDesignation: u.managementDesignation,
      }));

      setAllModerators(mapped);
    } catch (err) {
      console.error("Error fetching moderators:", err);
      setError(err?.response?.data?.message || "Failed to fetch moderators");
    } finally {
      setLoading(false);
    }
  }, [getAllSuperAdminItAndModeratorHandler]);

  useEffect(() => {
    fetchModerators();
  }, [fetchModerators]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  /* ---------------- frontend filter only ---------------- */
  const filteredData = useMemo(() => {
    if (!search) return allModerators;

    const q = search.toLowerCase();

    return allModerators.filter((u) =>
      [
        u.name,
        u.email,
        u.mobileNumber,
        u.roleCategory,
        u.managementDesignation,
        u.status,
      ]
        .filter(Boolean)
        .some((val) => String(val).toLowerCase().includes(q))
    );
  }, [allModerators, search]);

  const total = filteredData.length;
  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleStatusChange = async (user, status) => {
    try {
      const id = user?.userId;
      if (!id) return;

      await updateUserIdStatusHandler(id, token, { status });
      fetchModerators();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleView = (user) => {
    setViewUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const columns = [
    { Header: "Sl No", accessor: "slNo" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile", accessor: "mobileNumber" },
    { Header: "Role", accessor: "roleCategory" },
    { Header: "Management Designation", accessor: "managementDesignation" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      id: "actions",
      Cell: (cellProps) => {
        const rowData =
          cellProps?.row?.original ||
          cellProps?.original ||
          cellProps?.data;

        return (
          <ActionDataForSocietyModerate
            original={rowData}
            onView={handleView}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        );
      },
    },
  ];

  return (
    <div>
       <UrlPath paths={paths} />
      <PageHeading heading={Heading} />

      <div className="mt-3 mb-3 text-lg font-medium text-gray-700">
        TOTAL {total} Society Moderators List
      </div>
      

     <ReusableTable
        columns={columns}
        data={filteredData}     // or just data
        fullData={filteredData} // optional, but still supported
        pageIndex={page}
        pageSize={pageSize}
        setPageIndex={setPage}
        setPageSize={setPageSize}
        onSearchChange={setSearch}
        searchValue={search}
        fileName="society-moderators"
      />

      <ViewSocietyModeratorModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        data={viewUser}
        selectOptions={selectOptions}
      />

      <Dialog
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        closable
        className="w-full h-full p-10"
        contentClassName="w-full bg-white lg:max-w-4xl rounded-lg p-0"
        overlayClassName="backdrop-blur"
      >
        <div className="flex flex-col h-[85vh]">
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="p-2 text-gray-600 rounded hover:bg-gray-100 hover:text-red-600"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <CreateUserForm
              key={editUser?.userId}
              isEdit
              editData={editUser}
              onClose={() => setShowEditModal(false)}
              onSuccess={fetchModerators}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SocietyModeratorList;