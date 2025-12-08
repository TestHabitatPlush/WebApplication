"use client";

import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerFormField } from "@/redux/slices/customerSlice";

const CustomerForm = ({ onSubmit, onEditHandler }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.customer.customerForm);
  const societyTypeOptions = useSelector(
    (state) => state.customer.societyTypeOptions
  );
  const subscriptionPlans = useSelector(
    (state) => state.customer.subscriptionPlans
  );
  const customerTypeOptions = useSelector(
    (state) => state.customer.customerTypeOptions
  );
  const formMode = useSelector((state) => state.customer.formOperationType);

  const [selectedFormType, setSelectedFormType] = useState("customer");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCustomerFormField({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      customer_name: formData.customerName,
      customer_type: formData.customerType,
      establishment_year: formData.establishedYear,
      builder_name: formData.builderName,
      builder_details: formData.builderSocialLink,
      address_line1: formData.address?.address1,
      address_line2: formData.address?.street,
      city: formData.address?.city,
      state: formData.address?.state,
      pin: formData.address?.zipCode,
      mobile: formData.phone,
      email: formData.email,
    };

    onSubmit(payload);
  };

  return (
    <div className="flex">
      <div className="w-full space-y-5">
        {/* Radio Toggle for Customer / Building */}
        <div className="flex items-center gap-10 mb-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formType"
              value="customer"
              checked={selectedFormType === "customer"}
              onChange={() => setSelectedFormType("customer")}
            />
            <span>Customer</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formType"
              value="building"
              checked={selectedFormType === "building"}
              onChange={() => setSelectedFormType("building")}
            />
            <span>Building</span>
          </label>
        </div>

        {/* Customer Info Section */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Customer Info</h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={
                <>
                  <span>Customer Name</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter customer name"
              size="lg"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              readOnly={formMode !== "create"}
            />
            <Select
              label={
                <>
                  <span>Select Customer Type</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              options={customerTypeOptions}
              value={formData.customerType}
              onChange={handleInputChange}
              size="md"
              name="customerType"
              className="py-[14px]"
              readOnly={formMode !== "create"}
            />
            <Input
              label={
                <>
                  <span>Establisment Year</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="number"
              placeholder="Enter year"
              size="lg"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            {formData.customerType === "society" && (
              <Select
                label={
                  <>
                    <span>Select Society Type</span>
                    <span className="font-bold text-red-500">*</span>
                  </>
                }
                options={societyTypeOptions}
                value={formData.societyType}
                onChange={handleInputChange}
                size="md"
                name="societyType"
                className="py-[14px]"
                readOnly={formMode === "view"}
              />
            )}
          </div>
        </div>

        {/* Builder Info Section (Conditional) */}
        {selectedFormType === "building" && (
          <div className="p-5 bg-white border border-gray-100 rounded-2xl">
            <h3 className="font-semibold text-lime">Builder Info</h3>
            <div className="grid items-center grid-cols-3 gap-5 mt-3">
              <Input
                label="Builder Name"
                type="text"
                placeholder="Enter Builder name"
                size="lg"
                name="builderName"
                value={formData.builderName}
                onChange={handleInputChange}
                readOnly={formMode === "view"}
              />
              <Input
                label="Builder Details"
                type="text"
                placeholder="Enter Builder Details"
                size="lg"
                name="builderSocialLink"
                value={formData.builderSocialLink}
                onChange={handleInputChange}
                readOnly={formMode === "view"}
              />
            </div>
          </div>
        )}

        {/* Address Section */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">
            Society Location / Address
          </h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={
                <>
                  <span>Address Line 1</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter address line 1"
              size="lg"
              name="address1"
              value={formData.address.address1}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={
                <>
                  <span>Address Line 2</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter address line 2"
              size="lg"
              name="street"
              value={formData.address.street}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={
                <>
                  <span>City</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter city"
              size="lg"
              name="city"
              value={formData.address.city}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={
                <>
                  <span>State</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter state"
              size="lg"
              name="state"
              value={formData.address.state}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={
                <>
                  <span>Pin</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter pin"
              size="lg"
              name="zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Society Contact Details</h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={
                <>
                  <span>Mobile Number</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter mobile number"
              size="lg"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={
                <>
                  <span>Email</span>
                  <span className="font-bold text-red-500">*</span>
                </>
              }
              type="text"
              placeholder="Enter email"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
        </div>

        {/* Submit / Edit Button */}
        <div className="flex justify-center py-5">
         {formMode === "create" && (
            <Button onClick={handleSubmit} className="w-full max-w-lg">
          Submit
          </Button>
         )} 
          {formMode === "edit" && (
            <Button onClick={() => onEditHandler()} className="w-full max-w-lg">
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;

// 'use client';

// import React, { useState } from "react";
// import Input from "@/components/shared/Input";
// import Button from "@/components/ui/Button";
// import Select from "@/components/ui/Select";
// import { useDispatch, useSelector } from "react-redux";
// import { setCustomerFormField } from "@/redux/slices/customerSlice";
// import emailjs from "@emailjs/browser";

// const CustomerForm = ({ onSubmit, onEditHandler }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.customer.customerForm);
//   const societyTypeOptions = useSelector((state) => state.customer.societyTypeOptions);
//   const subscriptionPlans = useSelector((state) => state.customer.subscriptionPlans);
//   const customerTypeOptions = useSelector((state) => state.customer.customerTypeOptions);
//   const formMode = useSelector((state) => state.customer.formOperationType);

//   const [selectedFormType, setSelectedFormType] = useState("customer");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setCustomerFormField({ name, value }));
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();

//  const templateParams = {
//   subscription_type: "Silver Plan",
//   customer_name: formData.customerName || "N/A",
//   customer_type: formData.customerType || "N/A",
//   establishment_year: formData.establishedYear || "N/A",
//   address_line1: formData.address?.address1 || "N/A",
//   address_line2: formData.address?.street || "N/A",
//   city: formData.address?.city || "N/A",
//   state: formData.address?.state || "N/A",
//   pin: formData.address?.zipCode || "N/A",
//   mobile: formData.phone || "N/A",
//   email: formData.email || "N/A",
// };

//   emailjs
//     .send(
//        //service_ID
//         //template_ID
//         templateParams,
//         //public_key
//     )
//     .then((response) => {
//       console.log("SUCCESS!", response.status, response.text);
//       alert("Customer form data has been sent successfully!");

//       // Optional reset or dispatch
//     })
//     .catch((err) => {
//       console.error("FAILED...", err);
//       alert("Failed to send form data. Please try again.");
//     });
// };

//   return (
//     <div className="flex">
//       <div className="w-full space-y-5">

//         {/* Radio Toggle for Customer / Building */}
//         <div className="flex items-center gap-10 mb-3">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="formType"
//               value="customer"
//               checked={selectedFormType === "customer"}
//               onChange={() => setSelectedFormType("customer")}
//             />
//             <span>Customer</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="formType"
//               value="building"
//               checked={selectedFormType === "building"}
//               onChange={() => setSelectedFormType("building")}
//             />
//             <span>Building</span>
//           </label>
//         </div>

//         {/* Customer Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Customer Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label={<><span>Customer Name</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter customer name"
//               size="lg"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               readOnly={formMode !== "create"}
//             />
//             <Select
//               label={<><span>Select Customer Type</span><span className="font-bold text-red-500">*</span></>}
//               options={customerTypeOptions}
//               value={formData.customerType}
//               onChange={handleInputChange}
//               size="md"
//               name="customerType"
//               className="py-[14px]"
//               readOnly={formMode !== "create"}
//             />
//             <Input
//               label={<><span>Establisment Year</span><span className="font-bold text-red-500">*</span></>}
//               type="number"
//               placeholder="Enter year"
//               size="lg"
//               name="establishedYear"
//               value={formData.establishedYear}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             {formData.customerType === "society" && (
//               <Select
//                 label={<><span>Select Society Type</span><span className="font-bold text-red-500">*</span></>}
//                 options={societyTypeOptions}
//                 value={formData.societyType}
//                 onChange={handleInputChange}
//                 size="md"
//                 name="societyType"
//                 className="py-[14px]"
//                 readOnly={formMode === "view"}
//               />
//             )}
//           </div>
//         </div>

//         {/* Builder Info */}
//         {selectedFormType === "building" && (
//           <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//             <h3 className="font-semibold text-lime">Builder Info</h3>
//             <div className="grid items-center grid-cols-3 gap-5 mt-3">
//               <Input
//                 label="Builder Name"
//                 type="text"
//                 placeholder="Enter Builder name"
//                 size="lg"
//                 name="builderName"
//                 value={formData.builderName}
//                 onChange={handleInputChange}
//                 readOnly={formMode === "view"}
//               />
//               <Input
//                 label="Builder Details"
//                 type="text"
//                 placeholder="Enter Builder Details"
//                 size="lg"
//                 name="builderSocialLink"
//                 value={formData.builderSocialLink}
//                 onChange={handleInputChange}
//                 readOnly={formMode === "view"}
//               />
//             </div>
//           </div>
//         )}

//         {/* Address */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Society Location / Address</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label={<><span>Address Line 1</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter address line 1"
//               size="lg"
//               name="address1"
//               value={formData.address.address1}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label={<><span>Address Line 2</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter address line 2"
//               size="lg"
//               name="street"
//               value={formData.address.street}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label={<><span>City</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter city"
//               size="lg"
//               name="city"
//               value={formData.address.city}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label={<><span>State</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter state"
//               size="lg"
//               name="state"
//               value={formData.address.state}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label={<><span>Pin</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter pin"
//               size="lg"
//               name="zipCode"
//               value={formData.address.zipCode}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Society Contact Details</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label={<><span>Mobile Number</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter mobile number"
//               size="lg"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label={<><span>Email</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter email"
//               size="lg"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         {/* Submit / Edit Button */}
//         <div className="flex justify-center py-5">
//           {formMode === "create" && (
//             <Button  onClick={handleSubmit} className="w-full max-w-lg">
//               Submit
//             </Button>
//           )}
//           {formMode === "edit" && (
//             <Button onClick={() => onEditHandler()} className="w-full max-w-lg">
//               Edit
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerForm;

// 'use client';

// import React, { useState } from "react";
// import Input from "@/components/shared/Input";
// import Button from "@/components/ui/Button";
// import Select from "@/components/ui/Select";
// import { useDispatch, useSelector } from "react-redux";
// import { setCustomerFormField } from "@/redux/slices/customerSlice";

// const CustomerForm = ({ onSubmit, onEditHandler }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.customer.customerForm);
//   const societyTypeOptions = useSelector((state) => state.customer.societyTypeOptions);
//   const customerTypeOptions = useSelector((state) => state.customer.customerTypeOptions);
//   const formMode = useSelector((state) => state.customer.formOperationType);

//   const [selectedFormType, setSelectedFormType] = useState("customer");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(setCustomerFormField({ name, value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const payload = {
//       customer_name: formData.customerName ,
//       customer_type: formData.customerType,
//       establishment_year: formData.establishedYear,
//       address_line1: formData.address?.address1,
//       address_line2: formData.address?.street,
//       city: formData.address?.city  ,
//       state: formData.address?.state ,
//       pin: formData.address?.zipCode,
//       mobile: formData.phone  ,
//       email: formData.email ,
//     };

//     onSubmit(payload);
//   };

//   return (
//     <div className="flex">
//       <div className="w-full space-y-5">
//         {/* Radio Toggle */}
//         <div className="flex items-center gap-10 mb-3">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="formType"
//               value="customer"
//               checked={selectedFormType === "customer"}
//               onChange={() => setSelectedFormType("customer")}
//             />
//             <span>Customer</span>
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="formType"
//               value="building"
//               checked={selectedFormType === "building"}
//               onChange={() => setSelectedFormType("building")}
//             />
//             <span>Building</span>
//           </label>
//         </div>

//         {/* Customer Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Customer Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Customer Name"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               placeholder="Enter customer name"
//               readOnly={formMode !== "create"}
//             />
//             <Select
//               label="Customer Type"
//               name="customerType"
//               options={customerTypeOptions}
//               value={formData.customerType}
//               onChange={handleInputChange}
//               readOnly={formMode !== "create"}
//             />
//             <Input
//               label="Establishment Year"
//               name="establishedYear"
//               value={formData.establishedYear}
//               onChange={handleInputChange}
//               placeholder="Enter year"
//               type="number"
//               readOnly={formMode === "view"}
//             />
//             {formData.customerType === "society" && (
//               <Select
//                 label="Society Type"
//                 name="societyType"
//                 options={societyTypeOptions}
//                 value={formData.societyType}
//                 onChange={handleInputChange}
//                 readOnly={formMode === "view"}
//               />
//             )}
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Society Address</h3>
//           <div className="grid grid-cols-3 gap-5">
//             <Input
//               label="Address Line 1"
//               name="address1"
//               value={formData.address?.address1}
//               onChange={handleInputChange}
//               placeholder="Enter address"
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Address Line 2"
//               name="street"
//               value={formData.address?.street}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="City"
//               name="city"
//               value={formData.address?.city}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="State"
//               name="state"
//               value={formData.address?.state}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Pin"
//               name="zipCode"
//               value={formData.address?.zipCode}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Contact Info</h3>
//           <div className="grid grid-cols-3 gap-5">
//             <Input
//               label="Mobile"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center py-5">
//           {formMode === "create" && (
//             <Button onClick={handleSubmit} className="w-full max-w-lg">
//               Submit
//             </Button>
//           )}
//           {formMode === "edit" && (
//             <Button onClick={onEditHandler} className="w-full max-w-lg">
//               Edit
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerForm;
