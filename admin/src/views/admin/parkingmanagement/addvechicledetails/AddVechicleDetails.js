import React, { useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import toast from "react-hot-toast";

const AddVehicleDetails = ({ societyId, token }) => {
  const paths = ["Parking Managemen", "Add Vehicle"];
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

  const { createNewVehicleHandler } = ParkingHandler();
  
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerContact: "",
    fastagNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createNewVehicleHandler(formData);
      setFormData({
        vehicleNumber: "",
        vehicleType: "",
        ownerName: "",
        ownerContact: "",
        fastagNumber: "",
      });
  
      toast.success("Vehicle entry submitted successfully.");
    } catch (error) {
      toast.error("Error submitting Vehicle entry:", error.message);
    }
  };
  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="font-sans text-xl font-semibold text-lime">Add Vehicle Details</div>
      <form className="grid items-center grid-cols-3 gap-3 py-4">
        <Input label="Vehicle Number:" type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="Enter Vehicle Number" size="lg" />
        {/* <Input label="Vehicle Type:" type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} placeholder="Enter Vehicle Type" size="lg" /> */}
        <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="vehicleType">
        Vehicle Type:
      </label>
      <select
        name="vehicleType"
        value={formData.vehicleType}
        onChange={handleChange}
        className="w-full px-4 py-3 text-gray-700 border"
      >
        <option value="">Select Vehicle Type</option>
        <option value="Car">Car</option>
        <option value="Bike">Bike</option>
        <option value="Truck">Truck</option>
        <option value="Van">Van</option>
        <option value="Bus">Bus</option>
      </select>
    </div>
        <Input label="Owner Name:" type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Enter Owner Name" size="lg" />
        <Input label="Owner Contact:" type="text" name="ownerContact" value={formData.ownerContact} onChange={handleChange} placeholder="Enter Owner Contact" size="lg" />
        <Input label="Fastag No:" type="text" name="fastagNumber" value={formData.fastagNumber} onChange={handleChange} placeholder="Enter FASTag Number" size="lg" />

         <div className="flex justify-center mt-5">
                  <Button className="max-w-sm" type="button" size="lg" onClick={handleSubmit}>
                   Submit
                 </Button>
       
                 </div>
      </form>
    </div>
  );
};
