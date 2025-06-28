// src/views/super/society/view_society/SocietyList.js

import React, { useEffect, useState, useCallback } from "react";
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
import Button from "../../../../components/ui/Button";
import Dialog from "../../../../components/ui/Dialog";
import ViewSocietyDetailsModal from "../view_society/components/ViewSocietyDetailsModal";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";

const customerHandlerInstance = CustomerHandler();

const ActionData = ({ data, openModal, refreshList, token }) => {
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleActivateClick = async () => {
    setIsLoading(true);
    const newStatus = await customerHandlerInstance.updateCustomerStatusHandler(
      data.customerId,
      "active",
      token
    );
    if (newStatus === "active") {
      refreshList();
    }
    setIsLoading(false);
  };

  const confirmInactivate = async () => {
    setIsLoading(true);
    const newStatus = await customerHandlerInstance.updateCustomerStatusHandler(
      data.customerId,
      "inactive",
      token
    );
    if (newStatus === "inactive") {
      refreshList();
    }
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
              <p>Are you sure you want to inactivate this customer?</p>
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

const SocietyList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const {
    page,
    pageSize,
    total,
    totalPages,
    columns,
    status,
    filters,
  } = useSelector((state) => state.society);

  const [tableData, setTableData] = useState([]);
  const [viewModal, setViewModal] = useState(false);

  const openModal = () => setViewModal(true);
  const closeModal = () => {
    setViewModal(false);
    dispatch(resetCustomerFormOperationType());
  };

  const fetchUserList = useCallback(async () => {
    try {
      const result = await customerHandlerInstance.getCustomerHandler(
        { page, pageSize, ...filters },
        token
      );

      const rawData = result?.data?.data || [];

      dispatch({
        type: "society/updateData",
        payload: {
          data: rawData,
          total: result.data.total,
          totalPages: result.data.totalPages,
        },
      });

      const enrichedData = rawData.map((item) => ({
        ...item,
        actions: (
          <ActionData
            key={`action-${item.customerId}`}
            data={item}
            openModal={openModal}
            refreshList={fetchUserList}
            token={token}
          />
        ),
      }));

      setTableData(enrichedData);
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  }, [page, pageSize, filters, token, dispatch]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">User List</h1>

      <ReusableTable
        columns={columns}
        data={tableData}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={(index) => dispatch(setPage(index))}
        setPageSize={(size) => dispatch(setPageSize(size))}
      />

      {viewModal && (
        <ViewSocietyDetailsModal isOpen={viewModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default SocietyList;
