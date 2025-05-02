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

const UpdateParkingDetailsModal = ({ isOpen, onClose, formData, handleEditParking}) => {
  const [parkingForm, setParkingForm] = useState(formData);

  useEffect(() => {
    setParkingForm(formData); // Update the form data when formData changes
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setParkingForm({ ...parkingForm, [name]: value });
  };

  const handleRadioChange = (field, value) => {
    setParkingForm({ ...parkingForm, [field]: value });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="flex flex-col w-full gap-5 py-6">
          
          {/* Facility Name */}
          <div>
            <Input
              label="Parking Slot Name"
              value={parkingForm?.parkingSlotName || ""}
              type="text"
              name="parkingSlotName"
              placeholder="Enter Parking Name"
              size="lg"
              onChange={handleInput}
            />
          </div>
          <div>
            <Input
              label="Parking Slot Allocation (Unit Name):"
              value={parkingForm?.unitName || ""}
              type="text"
              name="unitName"
              placeholder="Enter Parking Name"
              size="lg"
              onChange={handleInput}
            />
          </div>
          <div>
            <Input
              label="  Add Vehicle Details:"
              value={parkingForm?.vehicleType || ""}
              type="text"
              name="vehicleType"
              size="lg"
              onChange={handleInput}
            />
          </div>
          <div>
            <Input
              label="  Add Vehicle Number:"
              value={parkingForm?.vehicleNumber || ""}
              type="text"
              name="vehicleNumber"
              size="lg"
              onChange={handleInput}
            />
          </div>
        
        
         <div className="grid items-center grid-cols-2 gap-5 my-5">
            <div className="flex items-center gap-3">
              <label>Public Usage</label>
              <input
                type="radio"
                name="parkingSlotType"
                value="PublicUsage"
                checked={String(parkingForm?.parkingSlotType) === "PublicUsage"}
                onChange={() => handleRadioChange("parkingSlotType", "PublicUsage")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Private/Restricted Usage</label>
              <input
                type="radio"
                name="parkingSlotType"
                value="PrivateUsage"
                checked={String(parkingForm?.parkingSlotType) === "PrivateUsage"}
                onChange={() => handleRadioChange("parkingSlotType", "PrivateUsage")}
              />
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid items-center grid-cols-2 gap-5 my-5">
            <div className="flex items-center gap-3">
              <label>Free</label>
              <input
                type="radio"
                name="parkingCharges"
                value="Free"
                checked={parkingForm?.parkingCharges === "Free"}
                onChange={() => handleRadioChange("parkingCharges", "Free")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Paid</label>
              <input
                type="radio"
                name="parkingCharges"
                value="Paid"
                checked={parkingForm?.parkingCharges === "Paid"}
                onChange={() => handleRadioChange("parkingCharges", "Paid")}
              />
            </div>
          </div>

          {/* Charge Amount (If Paid) */}
          {parkingForm?.parkingCharges === "paid" && (
            <div>
              <Input
                label="Charge Amount"
                value={parkingForm?.chargeAmount || ""}
                type="text"
                name="chargeAmount"
                placeholder="Enter Charge Amount"
                size="lg"
                onChange={handleInput}
              />
            </div>
          )}

          {/* Booking Duration Type */}
          <div className="grid items-center grid-cols-2 gap-5 my-5 ">
            <div className="flex items-center gap-3">
              <label>Hourly</label>
              <input
                type="radio"
                name="parkingUsage"
                valiue="Hourly"
                checked={parkingForm?.parkingUsage === "Hourly"}
                onChange={() => handleRadioChange("parkingUsage", "Hourly")}
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Days</label>
              <input
                type="radio"
                value="Days"
                name="parkingUsage"
                checked={parkingForm?.parkingUsage === "Days"}
                onChange={() => handleRadioChange("parkingUsage", "Days")}
              />
            </div>
          </div>


          {/* Booking Date Fields */}
          <div>
            <Input
              label="Booking From"
              type="date"
              value={formatDate(parkingForm?.bookingFrom)}
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
              value={formatDate(parkingForm?.bookingTo)}
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
  onClick={() => {
    handleEditParking(parkingForm); // Send updated data
    onClose();
  }}
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

export default UpdateParkingDetailsModal;
