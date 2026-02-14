"use client";

import React from "react";
import Button from "@/components/ui/Button";

const ViewVisitorModal = ({ visitorData, onClose, loading }) => {
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white rounded-lg">
          <p className="text-gray-600">Loading visitor details...</p>
        </div>
      </div>
    );
  }

  if (!visitorData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Visitor Details</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Visitor Name</p>
            <p>{visitorData.visitorName || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Mobile Number</p>
            <p>{visitorData.mobileNumber || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Role</p>
            <p>{visitorData.visitorRole || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Purpose</p>
            <p>{visitorData.purpose || "-"}</p>
          </div>

          <div>
            <p className="font-semibold">Entry Time</p>
            <p>
              {visitorData.entryTime
                ? new Date(visitorData.entryTime).toLocaleString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Exit Time</p>
            <p>
              {visitorData.exitTime
                ? new Date(visitorData.exitTime).toLocaleString()
                : "Inside"}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="bg-blue-500">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewVisitorModal;
