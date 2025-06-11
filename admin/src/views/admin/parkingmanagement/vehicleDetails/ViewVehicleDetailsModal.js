import React from "react";
import Dialog from "../../../../components/ui/Dialog";
import {
  FaIdCard,
  FaUserAlt,
  FaPhoneAlt,
  FaCarSide,
  FaTachometerAlt,
} from "react-icons/fa";

const ViewVehicleDetailsModal = ({ isOpen, onClose, formData }) => {
  if (!formData) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Vehicle Details</h2>
      </div>

      <div className="p-8 bg-gray-100 border rounded-lg">
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-4 p-4 bg-white rounded shadow-sm">
            <FaIdCard className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Vehicle ID</h4>
              <p className="text-gray-800">{formData.vehicleId || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded shadow-sm">
            <FaUserAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Owner Name</h4>
              <p className="text-gray-800">{formData.ownerName || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded shadow-sm">
            <FaPhoneAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Owner Contact</h4>
              <p className="text-gray-800">{formData.ownerContact || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded shadow-sm">
            <FaCarSide className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Vehicle Number</h4>
              <p className="text-gray-800">{formData.vehicleNumber || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded shadow-sm">
            <FaTachometerAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Fastag Number</h4>
              <p className="text-gray-800">{formData.fastagNumber || "—"}</p>
            </div>
          </li>
        </ul>
      </div>
    </Dialog>
  );
};

export default ViewVehicleDetailsModal;
