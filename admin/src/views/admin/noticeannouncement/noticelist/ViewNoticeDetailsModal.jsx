

import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import { FaHeading, FaRegCalendarAlt, FaUsers, FaStickyNote } from "react-icons/fa";

// Helper to format date
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Map group IDs to labels
const userGroups = {
  1: "Only for Owners",
  2: "Only for Tenants",
  3: "All Members",
  4: "All Primary Contacts",
};

const ViewNoticeDetailsModal = ({ isOpen, onClose, formData }) => {
  const [noticeViewForm, setNoticeViewForm] = useState(formData);

  useEffect(() => {
    setNoticeViewForm(formData);
  }, [formData]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">Notice Details</h2>

        <ul className="space-y-6">
          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaHeading className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Notice Heading</h4>
              <p className="font-medium text-gray-800">{noticeViewForm?.noticeHeading || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaStickyNote className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Notice Description</h4>
              <p className="text-gray-800 whitespace-pre-line">{noticeViewForm?.noticeDescription || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaRegCalendarAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Expiry Date</h4>
              <p className="text-gray-800">{formatDate(noticeViewForm?.noticeExpireDate) || "—"}</p>
            </div>
          </li>

          <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaUsers className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">User Group</h4>
              <span className="inline-block px-3 py-1 mt-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                {userGroups[noticeViewForm?.userGroupId] || "—"}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </Dialog>
  );
};

export default ViewNoticeDetailsModal;
