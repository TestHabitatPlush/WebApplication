import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

// Helper to format the date to "YYYY-MM-DD"
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const UpdateSubscriptionDetailsModal = ({
  isOpen,
  onClose,
  formData,
  onEditHandler,
}) => {
  const [subscriptionForm, setSubscriptionForm] = useState(formData);

  useEffect(() => {
    setSubscriptionForm(formData); // sync with props
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSubscriptionForm((prev) => {
      if (name === "billingCycle" && value !== "custom") {
        return { ...prev, billingCycle: value, endDate: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    onEditHandler(subscriptionForm); // Call parent handler
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 my-5 bg-gray-100 border rounded-lg">
        <div className="flex flex-col w-full gap-5">
          {/* Plan Name */}
          <label className="text-sm font-medium text-gray-700">Plan Name</label>
          <select
            name="planName"
            value={subscriptionForm?.planName || ""}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Plan</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>

          {/* Billing Cycle */}
          <label className="mt-4 text-sm font-medium text-gray-700">
            Billing Cycle
          </label>
          <select
            name="billingCycle"
            value={subscriptionForm?.billingCycle || ""}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Billing Cycle</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={formatDate(subscriptionForm?.startDate)}
              onChange={handleInput}
            />
            {subscriptionForm?.billingCycle === "custom" && (
              <Input
                label="End Date"
                type="date"
                name="endDate"
                value={formatDate(subscriptionForm?.endDate)}
                onChange={handleInput}
              />
            )}
          </div>

          {/* Price + Discount */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Price"
              name="price"
              type="number"
              value={subscriptionForm?.price || ""}
              onChange={handleInput}
              placeholder="Enter price"
            />
            <Input
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              value={subscriptionForm?.discountPercentage || ""}
              onChange={handleInput}
              placeholder="Enter discount %"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button type="button" onClick={handleSubmit} size="lg">
              Update Plan
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateSubscriptionDetailsModal;
