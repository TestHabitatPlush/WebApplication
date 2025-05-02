import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import VisitHandler from "@/handlers/VisitHandler";

const AddVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createNewVisitorEntry } = VisitHandler();
  const [errors, setErrors] = useState({});
  const [visitorType, setVisitorType] = useState("Guest");
 
  const [visitorDetails, setVisitorDetails] = useState({
    visit_name: "",
    visit_mobileno: "",
    visit_location: "",
    visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
    visit_valid_till_date: new Date().toISOString().split("T")[0],
    visit_porpous: "",
  });

  useEffect(() => {
    if (isModalOpen) {
      setVisitorDetails((prev) => ({
        ...prev,
        visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
      }));
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewVisitorEntry(visitorDetails);
      setVisitorDetails({
        visit_name: "",
        visit_mobileno: "",
        visit_location: "",
        visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
        visit_valid_till_date: new Date().toISOString().split("T")[0],
        visit_porpous: "",
      });
      setErrors({});
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting visitor entry:", error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <FaPlus className="ml-5 text-lg cursor-pointer text-turquoise" onClick={() => setIsModalOpen(true)} />
        <h1 className="mb-1 text-xl font-semibold">Add Vehicle</h1>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1050]">
          <div className="bg-white max-w-[1300px] w-[90%] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-md relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute text-xl text-gray-600 top-2 right-2 hover:text-gray-800">&times;</button>
            <h2 className="mb-8 text-xl font-semibold">Add {visitorType}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
              <select value={visitorType} onChange={(e) => setVisitorType(e.target.value)} className="block w-full p-2 mt-1 border border-gray-300 rounded-md">
                <option value="Guest">1w</option>
                <option value="Staff">2w</option>
                <option value="Service Provider">3w</option>
              </select>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[{ label: "UnitName/ParkingId", name: "visit_name", type: "text" },
                  { label: "Registration Number", name: "visit_mobileno", type: "number" },
                  { label: "Vehicle Comapny Name", name: "visit_porpous", type: "text" },
                  { label: "Vehicle Digital Id", name: "visit_location", type: "number" }].map((field, idx) => (
                  <div key={idx} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label} <span className="text-red-600">*</span>
                    </label>
                    {field.type === "textarea" ? (
                      <textarea id={field.name} name={field.name} value={visitorDetails[field.name]} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md" />
                    ) : (
                      <input id={field.name} name={field.name} type={field.type} value={visitorDetails[field.name]} onChange={handleChange} className="block w-full p-2 mt-1 border border-gray-300 rounded-md" />
                    )}
                    {errors[field.name] && <span className="text-sm text-red-600">{errors[field.name]}</span>}
                  </div>
                ))}
              </div>
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