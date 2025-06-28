


import React, { useEffect, useState } from "react";
import {
  FaParking,
  FaIdBadge,
  FaLayerGroup,
  FaClipboardList,
  FaRupeeSign,
  FaCalendarAlt,
  FaMoneyBillAlt
} from "react-icons/fa";
import Dialog from "../../../../components/ui/Dialog";

const ViewParkingModal = ({ isOpen, onClose, formData }) => {
  const [parkingViewForm, setParkingViewForm] = useState(formData);

  useEffect(() => {
    if (formData) {
      setParkingViewForm(formData);
    }
  }, [formData]);

  const parkingDetails = [
    {
      icon: () => <FaIdBadge className="text-xl text-blue-600" />,
      label: "Parking ID",
      value: parkingViewForm?.parkingId || "—",
    },
    {
      icon: () => <FaParking className="text-xl text-blue-600" />,
      label: "Parking Name",
      value: parkingViewForm?.parkingSlotName || "—",
    },
    {
      icon: () => <FaLayerGroup className="text-xl text-blue-600" />,
      label: "Parking Type",
      value: parkingViewForm?.parkingSlotType || "—",
    },
    {
      icon: () => <FaClipboardList className="text-xl text-blue-600" />,
      label: "Parking Usage",
      value: parkingViewForm?.parkingUsage || "—",
    },
    {
      icon: () => <FaRupeeSign className="text-xl text-blue-600" />,
      label: "Parking Charge",
      value: parkingViewForm?.parkingCharges || "—",
    },
    {
      icon: () => <FaMoneyBillAlt className="text-xl text-blue-600" />,
      label: "Charge Amount",
      value: parkingViewForm?.chargeAmount || "—",
    },
    {
      icon: () => <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking From",
      value: parkingViewForm?.bookingFrom?.slice(0, 10) || "—",
    },
    {
      icon: () => <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Booking To",
      value: parkingViewForm?.bookingTo?.slice(0, 10) || "—",
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800"> Parking Details</h2>
      </div>

      <div className="p-6 bg-gray-100 border rounded-lg">
        <ul className="space-y-4">
          {parkingDetails.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm"
            >
              <div className="flex-shrink-0">{item.icon()}</div>
              <div className="flex-1">
                <h4 className="mb-1 text-sm font-medium text-gray-600">{item.label}</h4>
                <p className="text-sm text-gray-800">{item.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};

export default ViewParkingModal;
