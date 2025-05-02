import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";

const ViewFacilityDetailsModal = ({ isOpen, onClose, formData }) => {
  const [facilityViewForm, setFacilityViewForm] = useState(formData);

  useEffect(() => {
    if (formData) {
      setFacilityViewForm(formData);  // Update form data when modal opens
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
        <h2 className="text-2xl font-semibold text-gray-800">View Facility Details</h2>
      </div>

      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid items-center grid-cols-3 gap-5 py-6">
          <Input label="Facility ID" type="text" value={facilityViewForm?.facilityId} readOnly />
          <Input label="Facility Name" type="text" value={facilityViewForm?.facilityName} readOnly />
          <Input label="Facility Type" type="text" value={facilityViewForm?.facilityType} readOnly />
          <Input label="Facility Usage" type="text" value={facilityViewForm?.facilityUsage} readOnly />
          <Input label="Facility Charge" type="text" value={facilityViewForm?.facilityCharge} readOnly />
          <Input label="Booking From" type="text" value={facilityViewForm?.bookingFrom?.slice(0, 10) || ""} readOnly />
          <Input label="Booking To" type="text" value={facilityViewForm?.bookingTo?.slice(0, 10) || ""}  readOnly />
          {/* Add more form fields as needed */}
        </div>
      </div>
    </Dialog>
  );
};

export default ViewFacilityDetailsModal;
