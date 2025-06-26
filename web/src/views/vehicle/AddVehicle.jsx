"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import VehicleHandler from "@/handlers/VehicleHandler";



const AddVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createVehicleHandler } = VehicleHandler();
  const [errors, setErrors] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerContact: "",
    fastagNumber: "",
  });

  useEffect(() => {
    if (isModalOpen) {
      setVehicleDetails((prev) => ({ ...prev }));
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicleHandler(vehicleDetails);
      setVehicleDetails({
        vehicleNumber: "",
        vehicleType: "",
        ownerName: "",
        ownerContact: "",
        fastagNumber: "",
      });
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting vehicle entry:", error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <FaPlus className="ml-5 text-lg cursor-pointer text-turquoise" onClick={() => setIsModalOpen(true)} />
        <h1 className="mb-1 text-xl font-semibold">Add Vehicle</h1>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button onClick={() => setIsModalOpen(false)} className="absolute text-xl text-gray-600 top-2 right-2 hover:text-gray-800">&times;</button>
            <h2 className="mb-4 text-lg font-semibold">Add Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Vehicle Number", name: "vehicleNumber", type: "text" },
                { label: "Vehicle Type", name: "vehicleType", type: "text" },
                { label: "FASTag Number", name: "fastagNumber", type: "text" },
                { label: "Owner Name", name: "ownerName", type: "text" },
                { label: "Owner Contact", name: "ownerContact", type: "number" },
              ].map((field, idx) => (
                <div key={idx}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={vehicleDetails[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                  />
                  {errors[field.name] && <span className="text-sm text-red-600">{errors[field.name]}</span>}
                </div>
              ))}
              <div className="flex justify-center gap-4 mt-6">
                <Button type="submit" className="w-32 px-4 py-2 text-white bg-green-500 hover:bg-green-600">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVehicle;
