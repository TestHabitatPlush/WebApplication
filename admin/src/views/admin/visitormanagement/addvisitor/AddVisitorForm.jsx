import React, { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/shared/Input";
import VisitEntryHandler from "../../../../handlers/VisitorEntryHandler";

const AddVisitorForm = () => {
  const { fetchVisitorRelationship, createNewVisitorEntry } = VisitEntryHandler();

  const [visitorTypes, setVisitorTypes] = useState([]); // store data dropdown options
  const [formData, setFromData] = useState({
    visit_expect_date_of_entry_date: "",
    visit_name: "",
    visit_type_Id: "",
    visit_mobileno: "",
    visit_porpous: "",
    // relationship: "",
    visit_location: "", 
    visit_valid_till_date:"",
  });
  const [errors, setErrors] = useState({
    visit_name: "",
    visit_mobileno: "",
    visit_porpous: "",
    relationship: ""
  });

 

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    setFromData((prevData) => ({
      ...prevData,
      visit_expect_date_of_entry_date: currentDate,
      visit_valid_till_date:currentDate,
    }));

      const fetchData = async () => {
      try {
        const result = await fetchVisitorRelationship();
        if (result?.data && Array.isArray(result.data)) {
          setVisitorTypes(result.data); // Set the dropdown data
        } else {
          console.warn("Invalid data format or empty response.");
          setVisitorTypes([]);
        }
      } catch (error) {
        console.error("Error fetching visitor relationships:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation for specific fields
    if (name === "visit_name" || name === "visit_porpous" ) {
      // Only allow alphabets and spaces for these fields
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFromData({ ...formData, [name]: value });
      }
    } else if (name === "visit_mobileno") {
      // Allow only digits for mobile number and limit length to 10
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFromData({ ...formData, [name]: value });
      }
    } else {
      setFromData({ ...formData, [name]: value });
    }
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
  //  let tempErrors = { visit_name: "", visit_mobileno: "", visit_porpous: "", relationship: "" };

    // Name validation: should only contain alphabets
    if (!/^[a-zA-Z\s]+$/.test(formData.visit_name)) {
      //tempErrors.visit_name = "Name should contain only alphabets";
      isValid = false;
    }

    // Mobile number validation: should be 10 digits
    if (!/^\d{10}$/.test(formData.visit_mobileno)) {
    //  tempErrors.visit_mobileno = "Mobile number should be 10 digits";
      isValid = false;
    }

    // Purpose of visit validation: should only contain alphabets
    if (!/^[a-zA-Z\s]+$/.test(formData.visit_porpous)) {
    //  tempErrors.visit_porpous = "Purpose of visit should contain only alphabets";
      isValid = false;
    }

    // Relationship validation: should only contain alphabets
    // if (!/^[a-zA-Z\s]*$/.test(formData.relationship)) {
    // //  tempErrors.relationship = "Relationship should contain only alphabets";
    //   isValid = false;
    // }

   // setErrors(tempErrors);
    return isValid;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent default form submission
  //   if (validateForm()) {
  //     console.log("form data", formData);
  //     createNewVisitorEntry(formData);
  //   }
  // };



const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form submission
  if (validateForm()) {
    console.log("form data", formData);

    try {
      // Assume createNewVisitorEntry is an asynchronous function
      await createNewVisitorEntry(formData);

      // Reset the form data to initial values after successful submission
      setFromData({
        visit_expect_date_of_entry_date: new Date().toISOString().split("T")[0],
        visit_name: "",
        visit_type_Id: "",
        visit_mobileno: "",
        visit_porpous: "",
        relationship: "",
        visit_location: "",
        visit_valid_till_date:new Date().toISOString().split("T")[0],
      });

      // Optionally, clear errors
      setErrors({
        visit_name: "",
        visit_mobileno: "",
        visit_porpous: "",
        relationship: "",
      });

      console.log("Visitor entry submitted successfully.");
    } catch (error) {
      console.error("Error submitting visitor entry:", error.message);
    }
  }
};


  return (
    <div>
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid items-center grid-cols-3 gap-5 py-6">
          <Input
            label={<div>Expected Date of Entry <span className="text-red-500">*</span></div>}
            type="date"
            placeholder="Date of Entry"
            size="lg"
            name="visit_expect_date_of_entry_date"
            value={formData.visit_expect_date_of_entry_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} 
          />
        <Input
            label={<div>Valid Till Date <span className="text-red-500">*</span></div>}
            type="date"
            placeholder="Valid Till Date"
            size="lg"
            name="visit_valid_till_date"
            value={formData.visit_valid_till_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} 
          />
       <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Type Of Visitor <span className="text-red-500">*</span>
            </label>
            <select
              id="visitorType"
              name="visit_type_Id"
              value={formData.visit_type_Id}
              onChange={handleChange}
              className="block w-full h-12 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>Select type of Visitor</option>
              {visitorTypes.length > 0 ? (
                visitorTypes.map((type) => (
                  <option key={type.Visit_relation_Id} value={type.Visit_relation_Id}>
                    {type.Visit_relation_Description}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading...</option>
              )}
            </select>
          </div>

          <Input
            label={<div>Name of Visitor <span className="text-red-500">*</span></div>}
            type="text"
            placeholder="Enter Name of Visitor"
            size="lg"
            name="visit_name"
            value={formData.visit_name}
            onChange={handleChange}
            error={errors.visit_name} // Show validation error
         />      
      {errors.visit_name && <div className="text-red-500">{errors.visit_name}</div>}
        



          <Input
            label={<div>Visitor Mobile No. <span className="text-red-500">*</span></div>}
            type="text"
            placeholder="Enter Visitor Mobile No."
            size="lg"
            name="visit_mobileno"
            value={formData.visit_mobileno}
            onChange={handleChange}
            error={errors.visit_mobileno} // Show validation error
         />      
      {errors.visit_mobileno && <div className="text-red-500">{errors.visit_mobileno}</div>}
        

          <Input
            label={<div>Relationship</div>}
            type="text"
            placeholder="Enter Relationship with Visitor"
            size="lg"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            error={errors.relationship} // Show validation error
           />      
         {errors.relationship && <div className="text-red-500">{errors.relationship}</div>}

          <Input
            label={<div>Purpose of Visit <span className="text-red-500">*</span></div>}
            type="text"
            placeholder="Enter Purpose of Visit"
            size="lg"
            name="visit_porpous"
            value={formData.visit_porpous}
            onChange={handleChange}
          error={errors.visit_porpous} // Show validation error
           />      
         {errors.visit_porpous && <div className="text-red-500">{errors.visit_porpous}</div>}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Coming From 
            </label>
            <textarea
              placeholder="Enter Visitor location"
              name="visit_location"
              value={formData.visit_location}
              onChange={handleChange}
            
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          className="max-w-sm"
          onClick={handleSubmit}
          type="submit"
          size="xl"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddVisitorForm;