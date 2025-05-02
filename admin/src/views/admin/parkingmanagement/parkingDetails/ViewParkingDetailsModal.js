import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";

const ViewParkingModal = ({ isOpen, onClose, formData }) => {
  const [parkingViewForm, setParkingViewForm] = useState(formData);

  useEffect(() => {
    if (formData) {
      setParkingViewForm(formData);  // Update form data when modal opens
    }
  }, [formData]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="pb-4 mb-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">View Parking Details</h2>
      </div>

      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid items-center grid-cols-3 gap-5 py-6">
          <Input label="Parking ID" type="text" value={parkingViewForm?.parkingId} readOnly />
          <Input label="Parking Name" type="text" value={parkingViewForm?.parkingSlotName} readOnly />
          <Input label="Parking Type" type="text" value={parkingViewForm?.parkingSlotType} readOnly />
          <Input label="Parking Usage" type="text" value={parkingViewForm?.parkingUsage} readOnly />
          <Input label="Parking Charge" type="text" value={parkingViewForm?.parkingCharges} readOnly />
          <Input label=" Charge Amount" type="text" value={parkingViewForm?.chargeAmount} readOnly />
          <Input label="Booking From" type="text" value={parkingViewForm?.bookingFrom?.slice(0, 10) || ""} readOnly />
          <Input label="Booking To" type="text" value={parkingViewForm?.bookingTo?.slice(0, 10) || ""}  readOnly />
          {/* Add more form fields as needed */}
        </div>
      </div>
    </Dialog>
  );
};

export default ViewParkingModal;
