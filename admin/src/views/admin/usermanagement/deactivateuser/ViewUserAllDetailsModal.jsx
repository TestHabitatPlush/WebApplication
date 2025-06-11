
import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import { FaUser, FaPhone, FaIdBadge, FaUserTag } from "react-icons/fa";

const ViewUserAllDetailsModal = ({ isOpen, onClose, formData }) => {
  const [userViewForm, setUserViewForm] = useState(formData);

  useEffect(() => {
    setUserViewForm(formData);
  }, [formData]);

  const userDetails = [
    { label: "User ID", value: userViewForm?.userId, icon: <FaIdBadge /> },
    { label: "First Name", value: userViewForm?.firstName, icon: <FaUser /> },
    { label: "Last Name", value: userViewForm?.lastName, icon: <FaUser /> },
    { label: "Mobile No.", value: userViewForm?.mobileNumber, icon: <FaPhone /> },
    { label: "Role", value: userViewForm?.roleId, icon: <FaUserTag /> },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      {/* Modal Header */}
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800"> User Details</h2>
      </div>

      {/* List Style Details */}
      <div className="p-8 my-5 border rounded-lg bg-gray-50">
        <ul className="space-y-6">
          {userDetails.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-4 transition bg-white rounded-md shadow-sm hover:shadow-md"
            >
              <div className="text-lg text-blue-600">{item.icon}</div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="font-medium text-gray-800">{item.value || "—"}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
};

export default ViewUserAllDetailsModal;
