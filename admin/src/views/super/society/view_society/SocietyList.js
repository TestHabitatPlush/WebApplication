import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReusableTable from "../../../../components/shared/ReusableTable";
import {
  setPage,
  setPageSize,
  setFilters,
} from "../../../../redux/slices/societySlice";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";
import ViewSocietyDetailsModal from "./components/ViewSocietyDetailsModal";
import {
  resetCustomerFormOperationType,
  setCustomerId,
  setFormOperationType,
} from "../../../../redux/slices/customerSlice";

const ActionData = ({ data, openModal }) => {
  const dispatch = useDispatch();

  const viewButtonClickHandler = () => {
    dispatch(setCustomerId(data.customerId));
    dispatch(setFormOperationType("view"));
    openModal();
  };
  const updateButtonClickHandler = () => {
    dispatch(setCustomerId(data.customerId));
    dispatch(setFormOperationType("edit"));
    openModal();
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 text-xs bg-lime text-white rounded-md hover:bg-opacity-90"
        onClick={viewButtonClickHandler}
      >
        View
      </button>
      <button
        className="px-2 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-opacity-90"
        onClick={updateButtonClickHandler}
      >
        Edit
      </button>
    </div>
  );
};

const SocietyList = () => {
  const dispatch = useDispatch();
  const { getCustomerHandler } = CustomerHandler();
  const { data, page, pageSize, total, totalPages, columns, status, filters } =
    useSelector((state) => state.society);
  const societyTypeOptions = useSelector(
    (state) => state.customer.societyTypeOptions
  );
  const [viewModal, setViewModal] = useState(false);

  const openModal = () => {
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal((prev) => !prev);
    dispatch(resetCustomerFormOperationType());
  };

  const fetchSocietiesData = async () => {
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
          actions: <ActionData data={item} openModal={openModal} />,
        })),
        total: result.data.total,
        totalPages: result.data.totalPages,
      };

      dispatch({
        type: "society/updateData",
        payload: transformedData,
      });
    } catch (error) {
      console.error("Failed to fetch societies data:", error);
    }
  };

  useEffect(() => {
    fetchSocietiesData();
  }, [dispatch, page, pageSize, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer List</h1>

      <ReusableTable
        columns={columns}
        data={data}
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
