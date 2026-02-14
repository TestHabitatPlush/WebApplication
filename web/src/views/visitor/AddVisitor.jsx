"use client";

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import VisitHandler from "@/handlers/VisitorHandler";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSociety } from "@/redux/slices/societySlice";

const AddVisitor = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const society = useSelector((state) => state.society.selectedSocietyId);

  const { fetchVisitorRelationship, createNewVisitorEntry } = VisitHandler();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorTypes, setVisitorTypes] = useState([]);
  const [errors, setErrors] = useState({});

  const [visitorDetails, setVisitorDetails] = useState({
    visit_name: "",
    visit_type_Id: "",
    visit_mobileno: "",
    visit_location: "",
    relationship: "",
    visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
    visit_valid_till_date: new Date().toISOString().split("T")[0],
    visit_purpose: "",
  });

  // SET SOCIETY
  useEffect(() => {
    const societyData = user?.Customer || user?.customer;
    if (societyData?.customerId) {
      dispatch(
        setSelectedSociety({
          id: societyData.customerId,
          name: societyData.customerName,
          type: societyData.customerType,
        })
      );
    }
  }, [user, dispatch]);

  // FETCH VISITOR TYPES
  useEffect(() => {
    if (isModalOpen && society?.id) {
      fetchVisitorTypes();
    }
  }, [isModalOpen, society]);

  const fetchVisitorTypes = async () => {
    try {
      const data = await fetchVisitorRelationship(society?.id);
      setVisitorTypes(data);
    } catch {
      setVisitorTypes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const required = [
      "visit_name",
      "visit_type_Id",
      "visit_mobileno",
      "visit_purpose",
      "visit_expect_date_of_entry_date",
      "visit_valid_till_date",
    ];

    const err = {};
    required.forEach((f) => {
      if (!visitorDetails[f]) err[f] = "This field is required";
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Construct payload for backend
    const payload = {
      visit_name: visitorDetails.visit_name,
      visit_type_Id: Number(visitorDetails.visit_type_Id),
      visit_mobileno: visitorDetails.visit_mobileno,
      visit_location: visitorDetails.visit_location || null,
      relationship: visitorDetails.relationship || null,
      visit_expect_date_of_entry_date: visitorDetails.visit_expect_date_of_entry_date,
      visit_valid_till_date: visitorDetails.visit_valid_till_date,
      visit_purpose: visitorDetails.visit_purpose,
      societyId: society?.id,
      senderId: user?.userId,
    };

    try {
      await createNewVisitorEntry(payload);
      toast.success("Visitor added successfully!");
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create visitor");
    }
  };

  const resetForm = () => {
    setVisitorDetails({
      visit_name: "",
      visit_type_Id: "",
      visit_mobileno: "",
      visit_location: "",
      relationship: "",
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
        <h1 className="text-xl font-semibold">Add Visitor</h1>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] max-w-4xl p-6 rounded-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute text-xl top-2 right-3"
            >
              &times;
            </button>

            <h2 className="mb-6 text-xl font-semibold">Add New Visitor</h2>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Visitor Type <span className="text-red-500">*</span>
              </label>
              <select
                name="visit_type_Id"
                value={visitorDetails.visit_type_Id}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="">Select Visitor Type</option>
                {visitorTypes.map((t) => (
                  <option
                    key={t.Visit_relation_Id}
                    value={t.Visit_relation_Id}
                  >
                    {t.Visit_relation_Description}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Visitor Name", "visit_name"],
                  ["Visitor Mobile", "visit_mobileno"],
                  ["Expected Entry Date", "visit_expect_date_of_entry_date", "date"],
                  ["Valid Till Date", "visit_valid_till_date", "date"],
                  ["Visit Purpose", "visit_purpose"],
                  ["Visitor Address", "visit_location"],
                  ["Relationship", "relationship"],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium">
                      {label} {name !== "relationship" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type || "text"}
                      name={name}
                      value={visitorDetails[name]}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                    />
                    {errors[name] && (
                      <p className="text-sm text-red-600">{errors[name]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button type="submit" className="text-white bg-green-600">
                  Submit
                </Button>
                <Button
                  type="button"
                  className="text-white bg-red-600"
                  onClick={() => setIsModalOpen(false)}
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
