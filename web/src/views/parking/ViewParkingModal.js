"use client";

import React from "react";
import Button from "@/components/ui/Button";

const ViewParkingModal = ({ parkingData, onClose }) => {
  if (!parkingData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Parking Slot Details</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Slot Name</p>
            <p>{parkingData.parkingSlotName}</p>
          </div>

          <div>
            <p className="font-semibold">Slot Type</p>
            <p>{parkingData.parkingSlotType}</p>
          </div>

          <div>
            <p className="font-semibold">Usage</p>
            <p>{parkingData.parkingUsage}</p>
          </div>

          <div>
            <p className="font-semibold">Charges</p>
            <p>{parkingData.parkingCharges}</p>
          </div>

          <div>
            <p className="font-semibold">Amount</p>
            <p>{parkingData.chargeAmount > 0 ? `₹${parkingData.chargeAmount}` : "Free"}</p>
          </div>

          <div>
            <p className="font-semibold">Vehicle No</p>
            <p>{parkingData.vehicleNumber || "-"}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewParkingModal;
