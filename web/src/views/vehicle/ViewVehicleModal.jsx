"use client";

import React from "react";
import Button from "@/components/ui/Button";

const ViewVehicleModal = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Vehicle Details</h2>

        <div className="space-y-3 text-sm">
          <Detail label="Vehicle Type" value={vehicle.vehicleType} />
          <Detail label="Vehicle Number" value={vehicle.vehicleNumber} />
          <Detail label="Owner Name" value={vehicle.ownerName} />
          <Detail label="Owner Contact" value={vehicle.ownerContact} />
          <Detail label="Fastag Number" value={vehicle.fastagNumber} />
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

const Detail = ({ label, value }) => (
  <div className="flex justify-between pb-1 border-b">
    <span className="font-medium">{label}</span>
    <span>{value || "-"}</span>
  </div>
);

export default ViewVehicleModal;
