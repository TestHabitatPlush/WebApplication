import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserHandler from "../../../../handlers/UserHandler";
import ReusableTable from "../../../../components/shared/ReusableTable";
import {
  setPage as setReduxPage,
  setPageSize as setReduxPageSize,
} from "../../../../redux/slices/societySlice";
import Dialog from "../../../../components/ui/Dialog";
import Button from "../../../../components/ui/Button";
import { CheckCircle, XCircle } from "lucide-react";

const SocietyModeratorList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth?.token || null);

  const {
    getAllSuperAdminItAndModeratorHandler,
    updateUserIdStatusHandler,
  } = UserHandler();

  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchModerators = async () => {
    try {
      setLoading(true);

      const res = await getAllSuperAdminItAndModeratorHandler(token, {
        page,
        pageSize,
      });

      if (res && Array.isArray(res.users)) {
        const transformed = res.users.map((m, index) => ({
          userId: m._id || m.userId,
          slNo: (page - 1) * pageSize + index + 1,
          title: `${m.firstName || ""} ${m.lastName || ""}`.trim(),
          firstName: m.firstName || "",
          lastName: m.lastName || "",
          email: m.email || "",
          mobileNumber: m.mobileNumber || "",
          roleId: m.roleId || "",
          status: m.status || "",
        }));

        setModerators(transformed);
        setTotal(res.total || transformed.length);
        setTotalPages(res.totalPages || 1);
      } else {
        setModerators([]);
        setTotal(0);
        setTotalPages(0);
      }
    } catch (err) {
      console.error("Error fetching moderators:", err);
      setError("Failed to load moderators");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchModerators();
    }
  }, [page, pageSize, token]);

  const handleStatusChange = async () => {
    if (!selectedUser) return;
    try {
      setIsLoading(true);

      const updated = await updateUserIdStatusHandler(
        selectedUser.userId,
        token,
        { status: newStatus } // ✅ send as object
      );

      if (updated?.user?.status === newStatus) {
        fetchModerators();
      }
      setShowConfirmModal(false);
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { Header: "Sl No", accessor: "slNo" },
    { Header: "Title", accessor: "title" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile", accessor: "mobileNumber" },
    { Header: "Role", accessor: "roleId" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <>
          {row.original.status !== "active" ? (
            <Button
              onClick={() => {
                setSelectedUser(row.original);
                setNewStatus("active");
                setShowConfirmModal(true);
              }}
              className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
              disabled={isLoading}
            >
              Activate
            </Button>
          ) : (
            <Button
              onClick={() => {
                setSelectedUser(row.original);
                setNewStatus("inactive");
                setShowConfirmModal(true);
              }}
              className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
              disabled={isLoading}
            >
              Inactivate
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Society Moderators</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ReusableTable
        columns={columns}
        data={moderators}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={(index) => {
          setPage(index);
          dispatch(setReduxPage(index));
        }}
        setPageSize={(size) => {
          setPageSize(size);
          dispatch(setReduxPageSize(size));
        }}
      />

      {/* Confirmation Modal */}
      <Dialog isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div className="p-6 bg-white rounded shadow">
          {newStatus === "active" ? (
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
          ) : (
            <XCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
          )}

          <h2 className="mb-2 text-lg font-bold text-center">
            {newStatus === "active" ? "Activate User" : "Inactivate User"}
          </h2>
          <p className="text-center">
            Are you sure you want to{" "}
            <strong>{newStatus === "active" ? "activate" : "inactivate"}</strong>{" "}
            this moderator?
          </p>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              className="bg-gray-400 hover:bg-gray-500"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              className={
                newStatus === "active"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
              disabled={isLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SocietyModeratorList;
