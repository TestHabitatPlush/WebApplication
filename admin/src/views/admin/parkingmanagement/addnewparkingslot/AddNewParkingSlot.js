import React, { useState, useEffect } from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import toast from "react-hot-toast";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";

const AddNewParkingSlot = ({ societyId, token }) => {
  return (
    <main>
      <form>
        <AddNewParkingSlotForm societyId={societyId} token={token} />
      </form>
    </main>
  );
};

export default AddNewParkingSlot;

const AddNewParkingSlotForm = ({ societyId, token }) => {
  const paths = ["Parking Managemen", "Add New Parking Slot"];
  const heading = ["Add New Parking Slot"];

  const { createParkingHandler } = ParkingHandler(societyId, token);
  const { getUnitsHandler } = DefineUnitHandler();

  const [unitOptions, setUnitOptions] = useState([]);
  const [formData, setFormData] = useState({
    parkingSlotName: "",
    parkingSlotType: "",
    parkingUsage: "",
    parkingCharges: "",
    chargeAmount: 0.0,
    unitName: "",
    vehicleType: "",
    vehicleNumber: "",
    bookingFrom: "",
    bookingTo: "",
  });

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const fetchUnits = async () => {
    try {
      const response = await getUnitsHandler();
      if (response?.data && Array.isArray(response.data)) {
        setUnitOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching unit types:", error);
    }
  };
  fetchUnits();
}, []); // Ignoring dependencies intentionally


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "chargeAmount" ? parseFloat(value) || 0 : value,
    }));
  };

  
  const handleSubmitParking = async (e) => {
    e.preventDefault();
    
    console.log("Form data before submission:", formData); // 🔥 Debug this
  
    try {
      await createParkingHandler(formData, societyId, token);
      setFormData({
        parkingSlotName: "",
        parkingSlotType: "",
        parkingUsage: "",
        parkingCharges: "",
        chargeAmount: 0.0,
        unitName: "",
        vehicleType: "",
        vehicleNumber: "",
        bookingFrom: "",
        bookingTo: "",
      });
  
      toast.success("Parking entry submitted successfully.");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error("Error submitting Parking entry: " + (error.response?.data?.message || error.message));
    }
  };
  

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid items-center grid-cols-1 gap-3 py-4">
          <Input
            label="Parking Slot Name:"
            type="text"
            placeholder="Enter the Name"
            size="lg"
            name="parkingSlotName"
            value={formData.parkingSlotName}
            onChange={handleChange}
          />

          {/* Dropdown for unit selection */}
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700">Parking Slot Allocation (Unit Name):</label>
            <select
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
              className="block w-full px-4 py-2 bg-white border rounded-lg"
            >
              <option value="">Select a Unit</option>
              {unitOptions.length > 0 ? (
                unitOptions.map((unit) => (
                  <option key={unit.unitId} value={unit.unitName}>
                    {unit.unitName}
                  </option>
                ))
              ) : (
                <option disabled>Loading units...</option>
              )}
            </select>
          </div>
        </div>

        <Input
          label="Add Vehicle Details:"
          type="text"
          placeholder="Enter Vehicle Type"
          size="lg"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
        />
          <Input
          label="Add Vehicle Number:"
          type="text"
          placeholder="Enter Vehicle Number"
          size="lg"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
        />

        <div className="flex flex-row items-center gap-4 pt-4">
          <div>Parking Slot Applicable:</div>
          <div className="flex flex-row items-center gap-3">
            {["PublicUsage", "PrivateUsage"].map((type) => (
              <label key={type} className="flex items-center gap-3 px-4 py-1 bg-white border rounded-lg">
                <input type="radio" name="parkingSlotType" value={type} checked={formData.parkingSlotType === type} onChange={handleChange} />
                {type === "PublicUsage" ? "Public Usage" : "PrivateUsage"}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center gap-4 py-4">
          <div>Parking Usage:</div>
          {["Free", "Paid"].map((usage) => (
            <label key={usage} className="flex items-center gap-3 px-4 py-1 bg-white border rounded-lg">
              <input type="radio" name="parkingCharges" value={usage} checked={formData.parkingCharges === usage} onChange={handleChange} />
              {usage}
            </label>
          ))}
        </div>
         {formData.parkingCharges === "Paid" && (
                    <div className="grid items-center grid-cols-1 gap-3 py-4">
                      <Input
                        label="Charge Amount"
                        type="text"
                        name="chargeAmount"
                        placeholder="INR : Enter Amount"
                        size="lg"
                        value={formData.chargeAmount}
                        onChange={handleChange}
                      />
                    </div>
                  )}
        
        <div className="flex flex-row items-center gap-4 pt-4">
          <div>Parking Charge :</div>
          <div className="flex flex-row items-center gap-3">
            {['Hourly','Days'].map((type) => (
              <label key={type} className="flex items-center gap-3 px-4 py-1 bg-white border rounded-lg">
                <input type="radio" name="parkingUsage" value={type} checked={formData.parkingUsage === type} onChange={handleChange} />
                {type === "Hourly" ? "Hourly" : "Days"}
              </label>
            ))}
          </div>
        </div>
        {/* <Input
          label="Charge Amount:"
          type="number"
          placeholder="INR: Enter Amount"
          size="lg"
          name="chargeAmount"
          value={formData.chargeAmount}
          onChange={handleChange}
        /> */}


         <div className="flex flex-row items-center gap-3 py-4">
                          <div className="text-base ">Select Date And Time :</div>
                          <Input
                            label={<div>Booking From <span className="text-red-500">*</span></div>}
                            type="date"
                            size="lg"
                            name="bookingFrom"
                            value={formData.bookingFrom}
                            onChange={handleChange}
                          />
                          <Input
                          label={<div>Booking To<span className="text-red-500">*</span></div>}
                          type="date"
                          size="lg"
                          name="bookingTo"
                          value={formData.bookingTo}
                          onChange={handleChange}
                          />
                        </div>
                      

        <div className="flex justify-center mt-5">
          <Button className="max-w-sm" type="submit" size="lg" onClick={handleSubmitParking}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
