import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import SubscriptionHandler from "../../../handlers/superadmin/SubscriptionHandler";
import DashboardCard from "../../../components/shared/DashboardCard";
import ReusableTable from "../../../components/shared/ReusableTable"; 



import ViewSocietyDetailsModal from "../society/view_society/components/ViewSocietyDetailsModal";
import CustomerHandler from "../../../handlers/superadmin/CustomerHandler";
import {   setPage,setPageSize } from "../../../redux/slices/societySlice";
import { resetCustomerFormOperationType,
  setCustomerId,
  setFormOperationType, } from "../../../redux/slices/customerSlice";

// Action buttons for each row
const ActionData = ({ data, openModal }) => {
  const dispatch = useDispatch();

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
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );
  const userId = useSelector((state) => state.auth.user?.userId);

  const page = useSelector((state) => state.society.page);
  const pageSize = useSelector((state) => state.society.pageSize);
  const filters = useSelector((state) => state.society.filters);
  const { data, total, totalPages, columns } = useSelector(
    (state) => state.society
  );

  const { getSubscriptionStatsHandler } = SubscriptionHandler();
  const { getCustomerHandler } = CustomerHandler(); // ✅ now available here

  const [subscriptionStats, setSubscriptionStats] = useState({
    active: 0,
    inactive: 0,
  });
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
          subscriptionId:item.subscriptionId,
          email:item.email,
          phone:item.phone,
          establishedYear: item.establishedYear,
          societyType: item.societyType,
          status: item.status,
          actions: (
            <ActionData
              data={item}
              openModal={openModal}
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

  const fetchSubscriptionStats = async () => {
    try {
      const res = await getSubscriptionStatsHandler(societyId, token);
      if (res.data) {
        setSubscriptionStats({
          active: res.data.active || 0,
          inactive: res.data.inactive || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching subscription stats:", error);
    }
  };

  useEffect(() => {
    if (societyId && token && userId) {
      fetchSubscriptionStats();
    }
  }, [societyId, token, userId]);

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      {/* Subscription Tracker */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <DashboardCard
          title="Subscription Tracker"
          count={subscriptionStats.active + subscriptionStats.inactive}
          description="Total Subscriptions"
          subItems={[
            {
              label: "Active",
              value: subscriptionStats.active,
              icon: <FaCheckCircle className="text-green-500" />,
            },
          ]}
          rightItem={{
            label: "Inactive",
            value: subscriptionStats.inactive,
            icon: <FaTimesCircle className="text-red-500" />,
          }}
        />
      </div>

      {/* User List */}
      <div>
        <h1 className="mb-4 text-xl font-bold">Customer Overview</h1>
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
    </div>
  );
};

export default Dashboard;
