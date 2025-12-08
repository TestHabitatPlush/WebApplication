"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import VisitHandler from "@/handlers/VisitHandler";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSociety } from "@/redux/slices/societySlice"; // ✅

const AddVisitor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // ✅ user object

  const { fetchVisitorRelationship, createNewVisitorEntry } = VisitHandler();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const [visitorDetails, setVisitorDetails] = useState({
    visit_name: "",
    visit_type_Id: "",
    visit_mobileno: "",
    visit_location: "",
    visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
    visit_valid_till_date: new Date().toISOString().split("T")[0],
    visit_purpose: "",
  });

  // ✅ Dynamically set selectedSociety from user.Customer
  useEffect(() => {
    const society = user?.Customer || user?.customer;
    if (society?.customerId) {
      dispatch(
        setSelectedSociety({
          id: society.customerId,
          name: society.customerName,
          type: society.customerType,
        })
      );
    } else {
      console.warn("❗ No society info in user object");
    }
  }, [user]);

  // ✅ Fetch visitor types when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchVisitorTypes();
    }
  }, [isModalOpen]);

  const fetchVisitorTypes = async () => {
    try {
      const result = await fetchVisitorRelationship();
      if (Array.isArray(result)) {
        setVisitorTypes(result);
      } else {
        setVisitorTypes([]);
      }
    } catch (error) {
      setVisitorTypes([
        { Visit_relation_Id: "3", Visit_relation_Description: "Guest" },
        { Visit_relation_Id: "7", Visit_relation_Description: "Staff" },
      ]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const requiredFields = [
      "visit_name",
      "visit_type_Id",
      "visit_mobileno",
      "visit_location",
      "visit_purpose",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!visitorDetails[field]) {
        newErrors[field] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...visitorDetails,
        visit_mobileno: parseInt(visitorDetails.visit_mobileno, 10) || 0,
        visit_type_Id: parseInt(visitorDetails.visit_type_Id, 10) || 0,
      };

      const response = await createNewVisitorEntry(payload);
      if (response.success) {
        toast.success("Visitor entry created successfully.");
        resetForm();
        setIsModalOpen(false);
      } else {
        toast.error(response.message || "Error creating visitor entry.");
      }
    } catch (error) {
      toast.error("Failed to create visitor entry.");
    }
  };

  const resetForm = () => {
    setVisitorDetails({
      visit_name: "",
      visit_type_Id: "",
      visit_mobileno: "",
      visit_location: "",
      visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
      visit_valid_till_date: new Date().toISOString().split("T")[0],
      visit_purpose: "",
    });
    setErrors({});
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <FaPlus
          className="ml-5 text-lg cursor-pointer text-turquoise"
          onClick={() => setIsModalOpen(true)}
        />
        <h1 className="mb-1 text-xl font-semibold">Add Visitor</h1>
      </div>

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
                  {visitorTypes.map((type) => (
                    <option
                      key={type.Visit_relation_Id}
                      value={type.Visit_relation_Id}
                    >
                      {type.Visit_relation_Description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[ 
                  { label: "Name", name: "visit_name", type: "text" },
                  { label: "Mobile Number", name: "visit_mobileno", type: "number" },
                  { label: "Expected Entry Date", name: "visit_expect_date_of_entry_date", type: "date" },
                  { label: "Valid Till Date", name: "visit_valid_till_date", type: "date" },
                  { label: "Purpose of Visit", name: "visit_purpose", type: "text" },
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
