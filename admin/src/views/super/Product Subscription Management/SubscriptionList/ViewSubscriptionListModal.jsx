import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";

const ViewSubscriptionListModal = ({ isOpen, onClose, formData }) => {
  const [subscriptionViewForm, setSubscriptionViewForm] = useState(null);

  useEffect(() => {
    if (formData) {
      setSubscriptionViewForm(formData);
    }
  }, [formData]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-5xl rounded-lg overflow-auto p-6"
      overlayClassName="backdrop-blur"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800">
          Package Subscription Details
        </h2>
        {/* <button
          onClick={onClose}
          className="text-lg font-bold text-red-600 hover:text-red-800"
        >
          ✕
        </button> */}
      </div>

      {/* Package Info Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Package ID
          </label>
          <input
            type="text"
            readOnly
            value={subscriptionViewForm?.subscriptionId || "P1"}
            className="w-full px-3 py-2 text-gray-800 bg-gray-100 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Package Type
          </label>
          <input
            type="text"
            readOnly
            value={subscriptionViewForm?.packageType || "Standard"}
            className="w-full px-3 py-2 text-gray-800 bg-gray-100 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Package Name
          </label>
          <input
            type="text"
            readOnly
            value={subscriptionViewForm?.planName || "Silver"}
            className="w-full px-3 py-2 text-gray-800 bg-gray-100 border rounded-md"
          />
        </div>
      </div>

      {/* Module Selection Table */}
      <div className="overflow-hidden border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-white bg-teal-700">
            <tr>
              <th className="px-3 py-2 border border-gray-300 w-[10%] text-center">
                Select
              </th>
              <th className="px-3 py-2 border border-gray-300">Module Name</th>
              <th className="px-3 py-2 border border-gray-300 w-[10%] text-center">
                Select
              </th>
              <th className="px-3 py-2 border border-gray-300">Module Name</th>
            </tr>
          </thead>

          <tbody>
            {/* Left + Right side modules */}
            <tr>
              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Building Management</td>

              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Visitor Management</td>
            </tr>

            <tr>
              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">User Management</td>

              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Gate Management</td>
            </tr>

            <tr>
              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Notice and Announcement</td>

              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Facility Management</td>
            </tr>

            <tr>
              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Discussion Forum</td>

              <td className="px-3 py-2 text-center border">
                <input type="checkbox" checked readOnly />
              </td>
              <td className="px-3 py-2 border">Vendor Management</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm italic text-center text-gray-500">
        Show the applicable module names for selected package name
      </p>
    </Dialog>
  );
};

export default ViewSubscriptionListModal;
