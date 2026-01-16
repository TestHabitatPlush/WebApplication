"use client";

import React from "react";
import Button from "@/components/ui/Button";

const ViewFacilityModal = ({ facilityData, onClose }) => {
  if (!facilityData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Facility Details</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Facility Name</p>
            <p>{facilityData.facilityName}</p>
          </div>

          <div>
            <p className="font-semibold">Type</p>
            <p>{facilityData.facilityType}</p>
          </div>

          <div>
            <p className="font-semibold">Usage</p>
            <p>{facilityData.facilityUsage}</p>
          </div>

          <div>
            <p className="font-semibold">Charge Type</p>
            <p>{facilityData.facilityCharge}</p>
          </div>

          <div>
            <p className="font-semibold">Amount</p>
            <p>
              {facilityData.chargeAmount > 0
                ? `₹${facilityData.chargeAmount}`
                : "Free"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Booking From</p>
            <p>
              {facilityData.bookingFrom
                ? new Date(facilityData.bookingFrom).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div>
            <p className="font-semibold">Booking To</p>
            <p>
              {facilityData.bookingTo
                ? new Date(facilityData.bookingTo).toLocaleDateString()
                : "-"}
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

export default ViewFacilityModal;
