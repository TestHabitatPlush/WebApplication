import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReusableTable from "../../../../components/shared/ReusableTable";
import {
  setPage,
  setPageSize,
  setFilters,
} from "../../../../redux/slices/societySlice";
import {
  resetCustomerFormOperationType,
  setCustomerId,
  setFormOperationType,
} from "../../../../redux/slices/customerSlice";
import ViewSocietyDetailsModal from "../view_society/components/ViewSocietyDetailsModal";
import Dialog from "../../../../components/ui/Dialog";
import Button from "../../../../components/ui/Button";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";

const ActionData = ({ data, openModal, refreshList }) => {
  const dispatch = useDispatch();
  const { updateCustomerStatusHandler } = CustomerHandler();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivateClick = async () => {
    setIsLoading(true);
    const newStatus = await updateCustomerStatusHandler(data.customerId, "active");
    if (newStatus === "active") refreshList();
    setIsLoading(false);
  };

  const confirmInactivate = async () => {
    setIsLoading(true);
    const newStatus = await updateCustomerStatusHandler(data.customerId, "inactive");
    if (newStatus === "inactive") refreshList();
    setShowConfirmModal(false);
    setIsLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 text-xs text-white rounded-md bg-lime"
        onClick={() => {
          dispatch(setCustomerId(data.customerId));
          dispatch(setFormOperationType("view"));
          openModal();
        }}
      >
        View
      </button>

      <button
        className="px-2 py-1 text-xs text-white bg-gray-900 rounded-md"
        onClick={() => {
          dispatch(setCustomerId(data.customerId));
          dispatch(setFormOperationType("edit"));
          openModal();
        }}
      >
        Edit
      </button>

      {data.status !== "active" && (
        <Button
          onClick={handleActivateClick}
          className="px-2 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          Activate
        </Button>
      )}

      {data.status === "active" && (
        <>
          <Button
            onClick={() => setShowConfirmModal(true)}
            className="px-2 py-1 text-xs text-white bg-red-600 rounded hover:bg-red-700"
            disabled={isLoading}
          >
            Inactivate
          </Button>

          <Dialog isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
            <div className="p-4 bg-white">
              <h2 className="mb-2 text-lg font-bold">Confirm Inactivation</h2>
              <p>Are you sure you want to inactivate this moderator?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  className="bg-gray-400 hover:bg-gray-500"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmInactivate}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

const UserList = () => {
  const dispatch = useDispatch();
  const { getCustomerHandler } = CustomerHandler();
  const { data, page, pageSize, total, totalPages, columns, status, filters } =
    useSelector((state) => state.society);
  const [viewModal, setViewModal] = useState(false);

  const openModal = () => setViewModal(true);

  const closeModal = () => {
    setViewModal(false);
    dispatch(resetCustomerFormOperationType());
  };

  const fetchUserList = async () => {
    try {
      const result = await getCustomerHandler({
        page,
        pageSize,
        ...filters,
      });

      const transformedData = {
        data: result.data.data.map((item) => ({
          customerId: item.customerId,
          customerName: item.customerName,
          customerType: item.customerType,
          email: item.email,
          phone: item.phone,
          establishedYear: item.establishedYear,
          societyType: item.societyType,
          status: item.status,
          actions: (
            <ActionData
              data={item}
              openModal={openModal}
              refreshList={fetchUserList}
            />
          ),
        })),
        total: result.data.total,
        totalPages: result.data.totalPages,
      };

      dispatch({
        type: "society/updateData",
        payload: transformedData,
      });
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [dispatch, page, pageSize, filters]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1>society List</h1>
 <ReusableTable
        columns={columns}
        data={paginatedData}     // ✅ sliced data
        pageIndex={page}
        pageSize={pageSize}
        totalCount={totalCount} // ✅ frontend total
        totalPages={totalPages} // ✅ frontend pages
        setPageIndex={setPage}
        setPageSize={setPageSize}
        manualPagination={false}   // ✅ VERY IMPORTANT
      />

      {viewModal && (
        <ViewSocietyDetailsModal isOpen={viewModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserList;
