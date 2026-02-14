import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

import {
  resetCustomerFormOperationType,
  setCustomerId,
  setFormOperationType,
} from "../../../../redux/slices/customerSlice";

import { setPage, setPageSize } from "../../../../redux/slices/societySlice";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";

import ReusableTable from "../../../../components/shared/ReusableTable";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ViewSocietyDetailsModal from "./components/ViewSocietyDetailsModal";

const SocietyList = () => {
  const dispatch = useDispatch();
  const { getCustomerHandler, updateCustomerStatus } = CustomerHandler();

  const { data, page, pageSize, columns, status, filters } = useSelector(
    (state) => state.society
  );

  const [search, setSearch] = useState("");
  const [selectedSociety, setSelectedSociety] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // view | edit
  const [visibleCount, setVisibleCount] = useState(0);

  // Fetch society list
  const fetchSocieties = useCallback(async () => {
    try {
      const result = await getCustomerHandler({ page, pageSize, ...filters });
      if (!result?.data?.data) return;

      const transformed = {
        data: result.data.data.map((item) => ({
          ...item,
          address: item.address || {},
        })),
        total: result.data.total,
        totalPages: result.data.totalPages,
      };

      dispatch({ type: "society/updateData", payload: transformed });
    } catch (err) {
      console.error("Failed to fetch societies:", err);
    }
  }, [page, pageSize, filters, getCustomerHandler, dispatch]);

  useEffect(() => {
    fetchSocieties();
  }, [fetchSocieties]);

  // Open view modal
  const handleView = (item) => {
    dispatch(setCustomerId(item.customerId));
    dispatch(setFormOperationType("view"));
    setSelectedSociety(item);
    setModalMode("view");
  };

  // Open edit modal
  const handleEdit = (item) => {
    dispatch(setCustomerId(item.customerId));
    dispatch(setFormOperationType("edit"));
    setSelectedSociety(item);
    setModalMode("edit");
  };

  // Status change
  const handleStatusChange = async (item) => {
    try {
      const newStatus =
        item.status === "active"
          ? "inactive"
          : item.status === "inactive"
          ? "active"
          : "pending";

      await updateCustomerStatus(item.customerId, newStatus);
      fetchSocieties();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedSociety(null);
    dispatch(resetCustomerFormOperationType());
  };

  if (status === "loading") return <div>Loading...</div>;

  // Add Actions column
  const columnsWithActions = columns.map((col) => {
    if (col.accessor === "actions") {
      return {
        ...col,
        Cell: ({ row }) => {
          const item = row.original;
          const statusLower = item.status?.toLowerCase();

          return (
            <div className="flex items-center justify-center gap-2">
              <button
                title="View"
                className="text-orange-500 hover:text-orange-800"
                onClick={() => handleView(item)}
              >
                <FaEye />
              </button>

              <button
                title="Edit"
                className="text-green-600 hover:text-green-800"
                onClick={() => handleEdit(item)}
              >
                <FaEdit />
              </button>

              <button
                title={
                  statusLower === "pending"
                    ? "Pending"
                    : statusLower === "active"
                    ? "Deactivate"
                    : "Activate"
                }
                className={`cursor-pointer ${
                  statusLower === "active"
                    ? "text-green-500 hover:text-green-800"
                    : statusLower === "inactive"
                    ? "text-red-500 hover:text-red-800"
                    : "text-yellow-500 hover:text-yellow-600"
                }`}
                onClick={() => handleStatusChange(item)}
              >
                {statusLower === "pending" && <FaTimes />}
                {statusLower === "active" && <FaCheck />}
                {statusLower === "inactive" && <FaTimes />}
              </button>
            </div>
          );
        },
      };
    }
    return col;
  });

  return (
    <div>
      <UrlPath paths={["Society Management", "Societies List"]} />
      <PageHeading heading={["Societies List"]} />

      <div className="mt-3 mb-3 text-lg font-medium text-gray-700">
        TOTAL {visibleCount} Society List
      </div>

      <ReusableTable
        columns={columnsWithActions}
        data={data}
        fullData={data}
        pageIndex={page}
        pageSize={pageSize}
        setPageIndex={(p) => dispatch(setPage(p))}
        setPageSize={(s) => dispatch(setPageSize(s))}
        onSearchChange={setSearch}
        searchValue={search}
        fileName="society"
        onVisibleCountChange={setVisibleCount}
      />

      {/* Always render modal; visibility controlled via isOpen */}
      <ViewSocietyDetailsModal
        isOpen={!!selectedSociety}
        onClose={closeModal}
        society={selectedSociety}
        mode={modalMode}
      />
    </div>
  );
};

export default SocietyList;