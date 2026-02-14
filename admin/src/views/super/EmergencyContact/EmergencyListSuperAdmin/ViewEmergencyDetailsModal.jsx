import React from "react";
import Dialog from "../../../../components/ui/Dialog";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFlag,
  FaCity,
  FaHashtag,
  FaExclamationTriangle,
} from "react-icons/fa";

const ViewEmergencyDetailsModal = ({ isOpen, onClose, formData }) => {
  if (!formData) return null;

  const details = [
    { icon: <FaUser />, label: "Name", value: formData.name },
    { icon: <FaPhoneAlt />, label: "Primary Contact Number", value: formData.econtactNo1 },
    { icon: <FaPhoneAlt />, label: "Secondary Contact Number", value: formData.econtactNo2 },
    {
      icon: <FaExclamationTriangle className="text-red-600" />,
      label: "Type",
      value: formData.emergencyContactType,
    },
    { icon: <FaMapMarkerAlt />, label: "Address", value: formData.address },
    { icon: <FaFlag />, label: "State", value: formData.state },
    { icon: <FaCity />, label: "City", value: formData.city },
    { icon: <FaHashtag />, label: "Pin Code", value: formData.pin },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      closable={false}
      className="w-full h-full p-10"
      contentClassName="w-full bg-white lg:max-w-4xl rounded-lg max-h-[85vh] h-[85vh] overflow-hidden p-0"

      overlayClassName="backdrop-blur"
    >
      <div className="flex flex-col h-full bg-gray-100 rounded-lg">

        {/* Header (fixed) */}
       <div className="sticky top-0 z-20 flex items-center justify-between px-10 py-5 bg-gray-100 border-b rounded-t-lg">

          <h2 className="text-2xl font-semibold text-gray-800">
            Emergency Contact Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-red-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 px-10 py-6 overflow-y-auto">
          <ul className="space-y-6">
            {details.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm"
              >
                <span className="mt-1 text-xl text-blue-600">
                  {item.icon}
                </span>
                <div>
                  <h4 className="text-sm text-gray-500">
                    {item.label}
                  </h4>
                  <p className="font-medium text-gray-800">
                    {item.value || "—"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Dialog>
  );
};

export default ViewEmergencyDetailsModal;
