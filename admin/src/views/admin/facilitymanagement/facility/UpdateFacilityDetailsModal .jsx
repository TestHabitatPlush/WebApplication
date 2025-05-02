import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

// Helper to format the date to "YYYY-MM-DD"
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const UpdateFacilityDetailsModal = ({ isOpen, onClose, formData, handleEditFacility }) => {
  const [facilityForm, setFacilityForm] = useState(formData);

  useEffect(() => {
    setFacilityForm(formData); // Update the form data when formData changes
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFacilityForm({ ...facilityForm, [name]: value });
  };

  const handleRadioChange = (field, value) => {
    setFacilityForm({ ...facilityForm, [field]: value });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="flex flex-col w-full gap-5 py-6">
          
          {/* Facility Name */}
          <div>
            <Input
              label="Facility Name"
              value={facilityForm?.facilityName || ""}
              type="text"
              name="facilityName"
              placeholder="Enter Facility Name"
              size="lg"
              onChange={handleInput}
            />
          </div>
      
         <div className="grid grid-cols-2 gap-5 items-center my-5">
            <div className="flex items-center gap-3">
              <label>Public Usage</label>
              <input
                type="radio"
                name="facilityType"
                value="PublicUsage"
                checked={String(facilityForm?.facilityType) === "PublicUsage"}
                onChange={() => handleRadioChange("facilityType", "PublicUsage")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Private/Restricted Usage</label>
              <input
                type="radio"
                name="facilityType"
                value="PrivateUsage"
                checked={String(facilityForm?.facilityType) === "PrivateUsage"}
                onChange={() => handleRadioChange("facilityType", "PrivateUsage")}
              />
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 gap-5 items-center my-5">
            <div className="flex items-center gap-3">
              <label>Free</label>
              <input
                type="radio"
                name="facilityCharge"
                value="Free"
                checked={facilityForm?.facilityCharge === "Free"}
                onChange={() => handleRadioChange("facilityCharge", "Free")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Paid</label>
              <input
                type="radio"
                name="facilityCharge"
                value="Paid"
                checked={facilityForm?.facilityCharge === "Paid"}
                onChange={() => handleRadioChange("facilityCharge", "Paid")}
              />
            </div>
          </div>

          {/* Charge Amount (If Paid) */}
          {facilityForm?.facilityCharge === "paid" && (
            <div>
              <Input
                label="Charge Amount"
                value={facilityForm?.chargeAmount || ""}
                type="text"
                name="chargeAmount"
                placeholder="Enter Charge Amount"
                size="lg"
                onChange={handleInput}
              />
            </div>
          )}

          {/* Booking Duration Type */}
          <div className=" grid grid-cols-2 gap-5 items-center my-5">
            <div className="flex items-center gap-3">
              <label>Hourly</label>
              <input
                type="radio"
                name="facilityUsage"
                valiue="Hourly"
                checked={facilityForm?.facilityUsage === "Hourly"}
                onChange={() => handleRadioChange("facilityUsage", "Hourly")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Days</label>
              <input
                type="radio"
                value="Days"
                name="facilityUsage"
                checked={facilityForm?.facilityUsage === "Days"}
                onChange={() => handleRadioChange("facilityUsage", "Days")}
              />
            </div>
          </div>


          {/* Booking Date Fields */}
          <div>
            <Input
              label="Booking From"
              type="date"
              value={formatDate(facilityForm?.bookingFrom)}
              name="bookingFrom"
              placeholder="Select Start Date"
              size="lg"
              onChange={handleInput}
            />
          </div>

          <div>
            <Input
              label="Booking To"
              type="date"
              value={formatDate(facilityForm?.bookingTo)}
              name="bookingTo"
              placeholder="Select End Date"
              size="lg"
              onChange={handleInput}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-5">
            <Button
              className="max-w-sm"
              type="submit"
              onClick={() => handleEditFacility (facilityForm)}
              size="lg"
            >
              Update
            </Button>
          </div>

        </div>
      </div>
    </Dialog>
  );
};

export default UpdateFacilityDetailsModal;
