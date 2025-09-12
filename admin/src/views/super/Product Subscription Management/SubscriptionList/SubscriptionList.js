// src/views/admin/subscription/PlanList/SubscriptionList.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import UpdateSubscriptionDetailsModal from "../../Product Subscription Management/SubscriptionList/UpdateSubscriptionDetailsModal";
import ViewSubscriptionListModal from "../../Product Subscription Management/SubscriptionList/ViewSubscriptionListModal";
import ReusableTable from "../../../../components/shared/ReusableTable";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { format } from "date-fns";
import { toast } from "react-toastify";
import SubscriptionHandler from "../../../../handlers/superadmin/SubscriptionHandler";

const SubscriptionList = () => {
  const paths = ["Subscription Plan", "Subscription Plan List"];
  const Heading = ["Subscription Plan List"];

  const token = useSelector((state) => state.auth.token);
  const [subscription, setSubscription] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalSubscription, setTotalSubscription] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const {
    getAllSubscriptionsHandler,
    deleteSubscriptionByIdHandler,
    getSubscriptionByIdHandler,
    updateSubscriptionHandler ,
  } = SubscriptionHandler();

  const fetchSubscription = async () => {
    try {
      const result = await getAllSubscriptionsHandler(token);
      const items = Array.isArray(result) ? result : [];
      setSubscription(items);
      setTotalSubscription(items.length);
    } catch (err) {
      console.error("Failed to fetch Subscription:", err.message);
      toast.error("Failed to fetch subscriptions!");
    }
  };

  useEffect(() => {
    fetchSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDelete = async (row) => {
    if (!row || !row.subscriptionId) {
      toast.error("Invalid subscription data!");
      return;
    }

    const success = await deleteSubscriptionByIdHandler(
      row.subscriptionId,
      token
    );

    if (success) {
      setSubscription((prev) =>
        prev.filter((el) => el.subscriptionId !== row.subscriptionId)
      );
      setTotalSubscription((prev) => prev - 1);
      toast.success("Subscription deleted successfully!");
    } else {
      toast.error("Failed to delete subscription!");
    }
  };

  const handleView = async (row) => {
    const subscription = await getSubscriptionByIdHandler(
      row.subscriptionId,
      token
    );
    if (subscription) {
      setSelectedSubscription(subscription);
      setShowViewModal(true);
    }
  };

  const handleEdit = (row) => {
    if (!row) {
      toast.error("Subscription data not found!");
      return;
    }
    setSelectedSubscription(row);
    setShowUpdateModal(true);
  };

  // ✅ Update handler
  const handleUpdateSubscription = async (updatedData) => {
    try {
      if (!updatedData?.subscriptionId) {
        toast.error("Subscription ID missing!");
        return;
      }
      await updateSubscriptionHandler(
        updatedData.subscriptionId,
        token,
        updatedData
      );
      toast.success("Subscription updated successfully!");
      fetchSubscription();
    } catch (err) {
      console.error("Error updating subscription:", err);
      toast.error("Failed to update subscription!");
    }
  };

  const columns = [
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => (page - 1) * pageSize + (row.index + 1),
    },
    { Header: "Name", accessor: "planName" },
    { Header: "Billing Cycle", accessor: "billingCycle" },
    { Header: "Status", accessor: "status" },
    {
      Header: "Booking From",
      accessor: "startDate",
      Cell: ({ value }) =>
        value ? format(new Date(value), "dd-MM-yyyy") : "N/A",
    },
    {
      Header: "Booking To",
      accessor: "endDate",
      Cell: ({ value }) =>
        value ? format(new Date(value), "dd-MM-yyyy") : "N/A",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
          <button
            className="text-yellow-600 hover:text-yellow-700"
            onClick={() => handleView(row.original)}
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => handleEdit(row.original)}
          >
            <FaEdit className="text-lg" />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(row.original)}
          >
            <FaTrashAlt className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="relative p-5">
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />

      <div className="mt-2 text-lg font-medium text-gray-700">
        TOTAL {totalSubscription} Subscription
      </div>

      <div className="flex flex-row mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or keyword..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <ReusableTable
        columns={columns}
        data={subscription}
        page={page}
        pageSize={pageSize}
        totalItems={totalSubscription}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />

      {/* Update Modal */}
      {showUpdateModal && selectedSubscription && (
        <UpdateSubscriptionDetailsModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          formData={selectedSubscription}
          onEditHandler={handleUpdateSubscription} // ✅ correct handler
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedSubscription && (
        <ViewSubscriptionListModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          formData={selectedSubscription}
        />
      )}
    </div>
  );
};

export default SubscriptionList;
