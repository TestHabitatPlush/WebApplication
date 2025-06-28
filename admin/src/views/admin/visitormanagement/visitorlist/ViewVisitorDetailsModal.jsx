



import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import { FaUser, FaPhone, FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaClipboard } from "react-icons/fa";

const ViewVisitorDetailsModal = ({ isOpen, onClose, formData }) => {
  const [visitorViewForm, setVisitorViewForm] = useState(formData);

  useEffect(() => {
    setVisitorViewForm(formData);
  }, [formData]);

  const visitorDetails = [
    {
      icon: <FaCalendarAlt className="text-xl text-blue-600" />,
      label: "Date of Entry",
      value: visitorViewForm?.visit_expect_date_of_entry_date?.slice(0, 10) || "—",
    },
    {
      icon: <FaUser className="text-xl text-blue-600" />,
      label: "Name of Visitor",
      value: visitorViewForm?.visit_name || "—",
    },
    {
      icon: <FaPhone className="text-xl text-blue-600" />,
      label: "Mobile No.",
      value: visitorViewForm?.visit_mobileno || "—",
    },
    {
      icon: <FaUsers className="text-xl text-blue-600" />,
      label: "Relationship",
      value: visitorViewForm?.relationship || "—",
    },
    {
      icon: <FaClipboard className="text-xl text-blue-600" />,
      label: "Purpose of Visit",
      value: visitorViewForm?.visit_porpous || "—",
    },
    {
      icon: <FaMapMarkerAlt className="text-xl text-blue-600" />,
      label: "Coming From",
      value: visitorViewForm?.visit_location || "—",
      multiline: true,
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
        <h2 className="text-2xl font-semibold text-gray-800"> Visitor Details</h2>
      </div>

      {/* List of Details */}
      <ul className="space-y-4">
        {visitorDetails.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1">
              <h4 className="mb-1 text-sm font-medium text-gray-600">{item.label}</h4>
              <div
                className={`text-gray-800 text-sm ${
                  item.multiline ? "whitespace-pre-line" : ""
                }`}
              >
                {item.value}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default ViewVisitorDetailsModal;
