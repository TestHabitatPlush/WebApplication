import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import VisitHandler from "@/handlers/VisitHandler";
import toast from "react-hot-toast";

const AddVisitor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchVisitorRelationship, createNewVisitorEntry } = VisitHandler();
  const [errors, setErrors] = useState({});
  const [visitorTypes, setVisitorTypes] = useState([]);

  // Initial visitor details state
  const [visitorDetails, setVisitorDetails] = useState({
    visit_name: "",
    visit_type_Id: "",
    visit_mobileno: "",
    visit_location: "",
    visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
    visit_valid_till_date: new Date().toISOString().split("T")[0],
    visit_porpous: "",
  });

  // Fetch visitor types when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchVisitorTypes();
    }
  }, [isModalOpen]);

  // Fetch visitor types
  const fetchVisitorTypes = async () => {
    try {
      const result = await fetchVisitorRelationship();
      console.log("Fetched Visitor Types:", result);

      if (Array.isArray(result)) {
        setVisitorTypes(result);
      } else {
        console.warn("No visitor types found.");
        setVisitorTypes([]);
      }
    } catch (error) {
      console.error("Error fetching visitor types:", error.message);

      // Fallback to default visitor types if API fails
      setVisitorTypes([
        { Visit_relation_Id: "3", Visit_relation_Description: "Guest" },
        { Visit_relation_Id: "7", Visit_relation_Description: "Staff" },
      ]);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validateForm = () => {
    const requiredFields = [
      "visit_name",
      "visit_type_Id",
      "visit_mobileno",
      "visit_location",
      "visit_porpous",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!visitorDetails[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const payload = {
        ...visitorDetails,
        visit_mobileno: parseInt(visitorDetails.visit_mobileno, 10) || 0,
        visit_type_Id: parseInt(visitorDetails.visit_type_Id, 10) || 0,
      };
  
      console.log("Final Payload being sent:", payload);
  
      const response = await createNewVisitorEntry(payload);
  
      if (response.success) {
        toast.success("Visitor entry created successfully.");
        resetForm();
        setIsModalOpen(false);
      } else {
        toast.error(response.message || "Error creating visitor entry.");
      }
    } catch (error) {
      
    }
  };
  
  // Reset form after submission
  const resetForm = () => {
    setVisitorDetails({
      visit_name: "",
      visit_type_Id: "",
      visit_mobileno: "",
      visit_location: "",
      visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
      visit_valid_till_date: new Date().toISOString().split("T")[0],
      visit_porpous: "",
    });
    setErrors({});
  };

  return (
    <div>
      {/* Add Visitor Button */}
      <div className="flex items-center gap-3">
        <FaPlus
          className="ml-5 text-lg cursor-pointer text-turquoise"
          onClick={() => setIsModalOpen(true)}
        />
        <h1 className="mb-1 text-xl font-semibold">Add Visitor</h1>
      </div>

      {/* Modal for Adding Visitor */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1050]">
          <div className="bg-white max-w-[1300px] w-[90%] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute text-xl text-gray-600 top-2 right-2 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="mb-8 text-xl font-semibold">Add New Visitor</h2>

            <form onSubmit={handleSubmit}>
              {/* Visitor Type Selection */}
              <div className="mb-4">
                <label
                  htmlFor="visitorType"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Visitor Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="visitorType"
                  name="visit_type_Id"
                  value={visitorDetails.visit_type_Id}
                  onChange={handleChange}
                  className="block w-full p-3 text-sm border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>
                    Select type of Visitor
                  </option>
                  {visitorTypes.length > 0 ? (
                    visitorTypes.map((type) => (
                      <option
                        key={type.Visit_relation_Id}
                        value={type.Visit_relation_Id}
                      >
                        {type.Visit_relation_Description}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading...
                    </option>
                  )}
                </select>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "Name", name: "visit_name", type: "text" },
                  { label: "Mobile Number", name: "visit_mobileno", type: "number" },
                  { label: "Expected Entry Date", name: "visit_expect_date_of_entry_date", type: "date" },
                  { label: "Valid Till Date", name: "visit_valid_till_date", type: "date" },
                  { label: "Purpose of Visit", name: "visit_porpous", type: "text" },
                  { label: "Address", name: "visit_location", type: "textarea" },
                ].map((field, idx) => (
                  <div key={idx} className="mb-4">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label} <span className="text-red-600">*</span>
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={visitorDetails[field.name]}
                        onChange={handleChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={visitorDetails[field.name]}
                        onChange={handleChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    )}
                    {errors[field.name] && (
                      <span className="text-sm text-red-600">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div className="mb-4 text-sm text-red-600">{errors.general}</div>
              )}

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  type="submit"
                  className="w-32 px-4 py-2 text-white bg-green-500 hover:bg-green-600"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="w-32 px-4 py-2 text-white bg-red-500 hover:bg-red-600"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVisitor;
