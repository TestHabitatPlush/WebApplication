import React, { useState, useEffect } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import VehicleHandler from "../../../../handlers/VehicleHandler";
import toast from "react-hot-toast";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";

const AddVehicleDetails = ({ societyId, token }) => {
  const paths = ["Parking Management", "Add Vehicle"];
  const Heading = ["Add Vehicle"];


  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <AddVehicleForm societyId={societyId} token={token} />
    </div>
  );
};



export default AddVehicleDetails;

const AddVehicleForm = ({ societyId, token }) => {
  const { createVehicleBySocietyHandler } = VehicleHandler();

  const { getUnitsHandler } = DefineUnitHandler();
  
  const [unitOptions, setUnitOptions] = useState([]);
  
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerContact: "",
    fastagNumber: "",
    unitName: "", // ✅ REQUIRED
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "fastagNumber" ? value.toUpperCase() : value,
    });
  };
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
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await createVehicleBySocietyHandler(formData); // correct handler

    setFormData({
      vehicleNumber: "",
      vehicleType: "",
      ownerName: "",
      ownerContact: "",
      fastagNumber: "",
      unitName: "",
    });

    toast.success("Vehicle entry submitted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to add vehicle");
  }
};


  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="mb-4 text-xl font-semibold text-lime">
        Add Vehicle Details
      </div>

      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Vehicle Number"
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          placeholder="OD02AB1234"
        />

        {/* Vehicle Type */}
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Vehicle Type
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full px-4 py-3 border"
            required
          >
            <option value="">Select Type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Bus">Bus</option>
          </select>
        </div>

        {/* <Input
          label="Unit Name"
          name="unitName"
          value={formData.unitName}
          onChange={handleChange}
          placeholder="A-101"
        /> */}
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

        <Input
          label="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
        />

        <Input
          label="Owner Contact"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
          placeholder="10-digit mobile number"
        />

        <Input
          label="FASTag Number"
          name="fastagNumber"
          value={formData.fastagNumber}
          onChange={handleChange}
          placeholder="AXISFTAG123456"
        />

        <div className="flex justify-center col-span-3 mt-6">
          <Button type="submit" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

