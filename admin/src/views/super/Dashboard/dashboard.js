import React, { useEffect, useState } from "react";
import { FaUsers, FaPlus } from "react-icons/fa";
import SubscriptionHandler from "../../../handlers/superadmin/SubscriptionHandler";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  );
  const userId = useSelector((state) => state.auth.user?.userId);

  const { createPlanHandler } = SubscriptionHandler();

  const [subscriptionCount, setSubscriptionCount] = useState(0);

  const fetchUserCounts = async () => {
    try {
      // logic to fetch subscription counts (if needed)
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  useEffect(() => {
    if (societyId && token && userId) {
      fetchUserCounts();
    } else {
      console.error(
        "Missing Society ID or Token or User ID. Please check authentication."
      );
    }
  }, [societyId, token, userId]);

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <SummaryCard
          title="Subscription Plans"
          icon={<FaUsers className="text-2xl text-gray-700" />}
          count={subscriptionCount}
          createPlanHandler={createPlanHandler}
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ title, icon, count, createPlanHandler }) => {
  const [showModal, setShowModal] = useState(false);
  const [planName, setPlanName] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [discount, setDiscount] = useState("");

  const handleAddPlan = async (e) => {
    e.preventDefault();
    const newPlan = { planName, billingCycle, price, discount };
    console.log("New Plan:", newPlan);

    try {
      await createPlanHandler(newPlan); // save to backend
      setShowModal(false);
      setPlanName("");
      setBillingCycle("");
      setPrice("");
      setDiscount("");
      setStartDate("");
    } catch (err) {
      console.error("Error creating plan:", err);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="pb-2 mb-4 text-lg font-bold text-blue-600 border-b">
        {title}
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-xl font-semibold text-green-700">{count}</h3>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          <FaPlus className="mr-1" /> Add Plan
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-blue-600">
              Create New Plan
            </h2>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Plan Name</label>
                <select
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  required
                >
                  <option value="">Select Plan</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Billing Cycle
                </label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  required
                >
                  <option value="">Select Cycle</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
                {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-lg"
                  placeholder="Enter discount %"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
