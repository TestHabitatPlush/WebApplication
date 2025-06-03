


import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import {
  FaIdBadge,
  FaBuilding,
  FaLayerGroup,
  FaClipboardList,
  FaRupeeSign,
  FaCalendarAlt,
} from "react-icons/fa";

const ViewFacilityDetailsModal = ({ isOpen, onClose, formData }) => {
  const [facilityViewForm, setFacilityViewForm] = useState(formData);

  useEffect(() => {
    if (formData) {
      setFacilityViewForm(formData);
    }
  }, [formData]);

  const facilityDetails = [
    {
      icon: <FaIdBadge className="text-xl text-blue-600" />,
      label: "Facility ID",
      value: facilityViewForm?.facilityId || "—",
    },
    {
      icon: <FaBuilding className="text-xl text-blue-600" />,
      label: "Facility Name",
      value: facilityViewForm?.facilityName || "—",
    },
    {
      icon: <FaLayerGroup className="text-xl text-blue-600" />,
      label: "Facility Type",
      value: facilityViewForm?.facilityType || "—",
    },
    {
      icon: <FaClipboardList className="text-xl text-blue-600" />,
      label: "Facility Usage",
      value: facilityViewForm?.facilityUsage || "—",
    },
    {
      icon: <FaRupeeSign className="text-xl text-blue-600" />,
      label: "Facility Charge",
      value: facilityViewForm?.facilityCharge || "—",
    },
    {
      icon: <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking From",
      value: facilityViewForm?.bookingFrom?.slice(0, 10) || "—",
    },
    {
      icon: <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking To",
      value: facilityViewForm?.bookingTo?.slice(0, 10) || "—",
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
        <h2 className="text-2xl font-semibold text-gray-800">Facility Details</h2>
      </div>

      {/* Facility Details List */}
      <ul className="space-y-4">
        {facilityDetails.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-medium text-gray-600">{item.label}</h4>
              <p className="text-sm text-gray-800">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default ViewFacilityDetailsModal;
