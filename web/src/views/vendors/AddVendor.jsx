// import ProfilePhoto from "@/components/shared/ProfilePhoto";
// import React from "react";
// import photo from "../../../assets/images/demo.jpg";
// import SectionHeading from "@/components/shared/SectionHeading";
// import Input from "@/components/shared/Input";
// import SectionContainer from "@/components/shared/SectionContainer";
// import { FaPlus } from "react-icons/fa6";
// import Button from "@/components/ui/Button";

// const AddVendor = () => {
//   return (
//     <div>
//       <SectionHeading className={"flex gap-3 items-center"}>
//         <FaPlus className="text-lg text-turquoise" />
//         Add Vendor
//       </SectionHeading>
//       <SectionContainer>
//         <div className="flex gap-10 items-center">
//           <ProfilePhoto src={photo} slt={"profile_image"} size="large" />
//           <div className="">
//             <SectionHeading size="lg">
//               Vendor Name
//               <br />
//               <span className="text-lg font-normal">Flat Number</span>
//             </SectionHeading>
//           </div>
//         </div>
//         <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-2">
//           <Input
//             label="Date of Entry"
//             type="date"
//             placeholder="Enter text..."
//             // value={"2024-07-17"}
//             onChange={(event) => console.log(event.target.value)}
//             color="turquoise"
//             size="lg"
//             isFalse={false}
//             className=""
//           />
//           <Input
//             label="Mobile Number"
//             type="number"
//             placeholder="Enter Mobile number..."
//             // value={"2024-07-17"}
//             onChange={(event) => console.log(event.target.value)}
//             color="turquoise"
//             size="lg"
//             className=""
//             isFalse={false}
//           />

//           <Input
//             label="Relation"
//             type="text"
//             placeholder="Enter text..."
//             // value={"Mother"}
//             onChange={(event) => console.log(event.target.value)}
//             color="turquoise"
//             size="lg"
//             className=""
//             isFalse={false}
//           />
//             <Input
//             label="Porpous"
//             type="text"
//             placeholder="Enter text..."
//             // value={"Mother"}
//             onChange={(event) => console.log(event.target.value)}
//             color="turquoise"
//             size="lg"
//             className=""
//             isFalse={false}
//           />
//             <Input
//             label="Till Date"
//             type="date"
//             placeholder="Enter text..."
//             // value={"2024-07-17"}
//             onChange={(event) => console.log(event.target.value)}
//             color="turquoise"
//             size="lg"
//             isFalse={false}
//             className=""
//           />
//         </div>
//         <div className="w-full grid gap-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
//           <Button
//             className="text-black"
//             color="success"
//             size="lg"
//             onClick={() => alert("Primary Button Clicked")}
//           >
//             Generate
//           </Button>
//           <Button
//             color="lime"
//             size="lg"
//             onClick={() => alert("Secondary Button Clicked")}
//             className=""
//           >
//             Submit
//           </Button>
//         </div>
//       </SectionContainer>
//     </div>
//   );
// };

// export default AddVendor;
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@/components/ui/Button";

const AddVendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    serviceType: "",
    address: "",
    entryDate: "",
    tillDate: "",
  });

  const [errors, setErrors] = useState({});

  // Set the default entry date to today's date when the modal opens
  useEffect(() => {
    if (isModalOpen) {
      const today = new Date().toISOString().split("T")[0];
      setVendorDetails((prevDetails) => ({
        ...prevDetails,
        entryDate: today,
      }));
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails({ ...vendorDetails, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    const today = new Date().toISOString().split("T")[0];

    // Name is required
    if (!vendorDetails.name) formErrors.name = "Name is required.";

    // Mobile is required and should be 10 digits
    if (!vendorDetails.mobile) {
      formErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(vendorDetails.mobile)) {
      formErrors.mobile = "Mobile number must be 10 digits.";
    }

    // Service Type is required
    if (!vendorDetails.serviceType) formErrors.serviceType = "Service type is required.";

    // Email is optional, but if provided, should be valid
    if (vendorDetails.email && !/\S+@\S+\.\S+/.test(vendorDetails.email)) {
      formErrors.email = "Email is invalid.";
    }

    // Address is optional, no validation needed
    // No validation for address field

    // Entry Date is required and can't be in the past
    if (!vendorDetails.entryDate) {
      formErrors.entryDate = "Entry date is required.";
    } else if (vendorDetails.entryDate < today) {
      formErrors.entryDate = "Entry date cannot be in the past.";
    }

    // Till Date is required and can't be earlier than entry date
    if (!vendorDetails.tillDate) {
      formErrors.tillDate = "Till date is required.";
    } else if (vendorDetails.tillDate < vendorDetails.entryDate) {
      formErrors.tillDate = "Till date cannot be earlier than entry date.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Vendor Details:", vendorDetails);
      alert("Vendor details submitted successfully!");
      setVendorDetails({
        name: "",
        email: "",
        mobile: "",
        serviceType: "",
        address: "",
        entryDate: "",
        tillDate: "",
      });
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setVendorDetails({
      name: "",
      email: "",
      mobile: "",
      serviceType: "",
      address: "",
      entryDate: "",
      tillDate: "",
    });
    setErrors({});
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Heading and Add Vendor Button */}
      <div className="flex items-center gap-3">
        <FaPlus
          className="text-lg text-turquoise cursor-pointer ml-5"
          onClick={() => setIsModalOpen(true)}
        />
        <h1 className="text-xl font-semibold">Add Vendor</h1>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1050]">
          <div className="bg-white max-w-[1300px] w-[90%] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
            <form onSubmit={handleSubmit}>
              {/* Input fields in a grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[ 
                  { label: "Name", name: "name", type: "text", placeholder: "Enter vendor's name", required: true },
                  { label: "Email", name: "email", type: "email", placeholder: "Enter email", required: false },
                  { label: "Mobile Number", name: "mobile", type: "text", placeholder: "Enter mobile number", required: true },
                  { label: "Vendor Service Type", name: "serviceType", type: "text", placeholder: "Enter vendor service type", required: true },
                  { label: "Address", name: "address", type: "textarea", placeholder: "Enter address", required: false },
                  { label: "Entry Date", name: "entryDate", type: "date", required: true },
                  { label: "Till Date", name: "tillDate", type: "date", required: true },
                ].map((field, idx) => (
                  <div key={idx} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label} {field.required && <span className="text-red-600">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={vendorDetails[field.name]}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={vendorDetails[field.name]}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
                      />
                    )}
                    {errors[field.name] && <span className="text-red-600 text-sm">{errors[field.name]}</span>}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center align-middle gap-4 mt-6">
                <Button
                  type="submit"
                  className="bg-green-500 text-white hover:bg-green-600 w-32 text-sm py-2 px-4"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVendor;
