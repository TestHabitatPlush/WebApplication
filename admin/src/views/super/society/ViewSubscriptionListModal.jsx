import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import {
  FaIdBadge,
  FaBuilding,
  FaLayerGroup,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPercentage,
} from "react-icons/fa";
import { format } from "date-fns";

const ViewSubscriptionListModal = ({ isOpen, onClose, formData }) => {
  const [subscriptionViewForm, setSubscriptionViewForm] = useState(null);

  useEffect(() => {
    if (formData) {
      setSubscriptionViewForm(formData);
    }
  }, [formData]);

  const subscriptionDetails = [
    {
      icon: <FaIdBadge className="text-xl text-blue-600" />,
      label: "Subscription ID",
      value: subscriptionViewForm?.subscriptionId || "—",
    },
    {
      icon: <FaBuilding className="text-xl text-blue-600" />,
      label: "Subscription Name",
      value: subscriptionViewForm?.planName || "—",
    },
    {
      icon: <FaLayerGroup className="text-xl text-blue-600" />,
      label: "Billing Cycle",
      value: subscriptionViewForm?.billingCycle || "—",
    },
    {
      icon: <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking From",
      value: subscriptionViewForm?.startDate
        ? format(new Date(subscriptionViewForm.startDate), "dd-MM-yyyy")
        : "—",
    },
    {
      icon: <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking To",
      value: subscriptionViewForm?.endDate
        ? format(new Date(subscriptionViewForm.endDate), "dd-MM-yyyy")
        : "—",
    },
    {
  icon: <FaMoneyBillWave className="text-xl text-blue-600" />,
  label: "Price",
  value: subscriptionViewForm?.price
    ? `₹${subscriptionViewForm.price}`
    : "—",
},
{
  icon: <FaPercentage className="text-xl text-blue-600" />,
  label: "Discount (%)",
  value: subscriptionViewForm?.discountPercentage ?? "—",
},
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto p-5"
      overlayClassName="backdrop-blur"
    >
      {/* Header */}
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">
          Subscription Details
        </h2>
      </div>

      {/* Subscription Details List */}
      <ul className="space-y-4">
        {subscriptionDetails.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-medium text-gray-600">
                {item.label}
              </h4>
              <p className="text-sm text-gray-800">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default ViewSubscriptionListModal;
