// import React, { useState } from "react";
// import Input from "../../../../components/shared/Input";
// import Select from "../../../../components/ui/Select";
// import Button from "../../../../components/ui/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { setCustomerFormField } from "../../../../redux/slices/customerSlice";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const SocietyCreateForm = ({ onSubmit, onEditHandler }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.customer.customerForm);
//   const societyTypeOptions = useSelector(
//     (state) => state.customer.societyTypeOptions
//   );
//   const subscriptionPlans = useSelector(
//     (state) => state.customer.subscriptionPlans
//   );
//   const customerTypeOptions = useSelector(
//     (state) => state.customer.customerTypeOptions
//   );
//   const formMode = useSelector((state) => state.customer.formOperationType);

//   const [errors, setErrors] = useState({});

//   const isReadOnly = () => formMode === "view";

// // const handleInputChange = (e) => {
// //   const { name, value } = e.target;
// //   let error = "";

// //   // Validation for specific fields
// //   if (
// //     ["customerName", "builderName", "state", "city"].includes(name) &&
// //     !/^[A-Za-z\s]*$/.test(value)
// //   ) {
// //     error = "Only alphabetic characters are allowed";
// //   }

// //   // if (name === "zipCode" && value && !/^\d{6}$/.test(value)) {
// //   //   error = "ZIP Code must be exactly 6 digits";
// //   // }

// //   // if (name === "phone" && /^\d*$/.test(value) && value.length <= 10) {
// //   //   error = "Phone number must be exactly 10 digits";
// //   // }

// //   // if (name === "email" && value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
// //   //   error = "Please enter a valid email address (e.g., example@domain.com)";
// //   // }

// //   if (name === "establishedYear") {
// //     const year = value.split("-")[0];
// //     const currentYear = new Date().getFullYear();
// //     if (year < 1900 || year > currentYear) {
// //       error = "Please enter a valid year";
// //     } else {
// //       // Set only the year if valid
// //       dispatch(setCustomerFormField({ name, value: year }));
// //     }
// //   }

// //   if (error) {
// //     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
// //     return;
// //   }

// //   // Clear errors and update field value
// //   setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
// //   dispatch(setCustomerFormField({ name, value }));
// // };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   let error = "";

 
//   // Validation for specific fields
//   if (["customerName", "builderName", "state", "city"].includes(name) && !/^[A-Za-z\s]*$/.test(value)) {
//     error = "Only alphabetic characters are allowed";
//   }

  

//   if (error) {
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//     return;
//   }

//   // Clear errors and update field value
//   setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   dispatch(setCustomerFormField({ name, value }));
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   let error = "";

//   // Enforce maxLength for ZIP Code
//   if (name === "zipCode" && value.length > 6) {
//     return; // Prevent updating if the input length exceeds 6
//   }
//   if (name === "phone" && value.length > 10 ){
//     return; // Prevent updating if the input length exceeds 6
//   }
  
//   if (name === "zipCode" && value && !/^\d{6}$/.test(value)) {
//     error = "ZIP Code must be exactly 6 digits";
//   }

//   if (name === "phone" && value && !/^\d{10}$/.test(value)) {
//     error = "Phone number must be exactly 10 digits";
//   }

//   if (name === "email" && value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
//     error = "Please enter a valid email address (e.g., example@domain.com)";
//   }


//   // Clear errors and update field value
//   setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//   dispatch(setCustomerFormField({ name, value }));
// };
//   const validateForm = () => {
//     let isValid = true;
//     const tempErrors = {};

//     // Validate specific fields
//     if (!/^[A-Za-z\s]+$/.test(formData.customerName || "")) {
//       tempErrors.customerName = "Customer Name should contain only alphabets.";
//       isValid = false;
//     }
//     if (!/^\d{10}$/.test(formData.phone || "")) {
//       tempErrors.phone = "Phone number must be exactly 10 digits.";
//       isValid = false;
//     }
//     if (!/^\d{6}$/.test(formData.address?.zipCode || "")) {
//       tempErrors.zipCode = "ZIP Code must be exactly 6 digits.";
//       isValid = false;
//     }

//     setErrors(tempErrors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     if (formMode === "create") {
//       onSubmit(formData);
//       toast.success("Data saved successfully!");
//     } else if (formMode === "edit") {
//       onEditHandler(formData);
//       toast.success("Data updated successfully!");
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="w-full space-y-5">
//         {/* Customer Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Customer Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             {/* <Input
//               label={
//                 <>
//                   <span>Customer Name</span>
//                   <span className="font-bold text-red-500">*</span>
//                 </>
//               }
//               type="text"
//               placeholder="Enter customer name"
//               size="lg"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//               error={errors.customerName}
//             /> */}
//             <Input
//   label={
//     <>
//       <span>Customer Name</span>
//       <span className="font-bold text-red-500">*</span>
//     </>
//   }
//   type="text"
//   placeholder="Enter customer name"
//   size="lg"
//   name="customerName"
//   value={formData.customerName}
//   onChange={handleInputChange}
//   readOnly={isReadOnly()}
//   error={errors.customerName}
// />
// {errors.customerName && (
//   <p className="mt-1 text-sm text-red-500">{errors.customerName}</p>
// )}

//             <Select
//               label={
//                 <>
//                   <span>Select Customer Type</span>
//                   <span className="font-bold text-red-500">*</span>
//                 </>
//               }
//               options={customerTypeOptions}
//               value={formData.customerType}
//               onChange={handleInputChange}
//               name="customerType"
//               color="blue"
//               size="md"
//               className="py-[14px]"
//               readOnly={isReadOnly()}
//             />
//             <Select
//               label={
//                 <>
//                   <span>Select Subscription Plan</span>
//                   <span className="font-bold text-red-500">*</span>
//                 </>
//               }
//               options={subscriptionPlans}
//               value={formData.subscriptionId}
//               onChange={handleInputChange}
//               name="subscriptionId"
//               color="blue"
//               size="md"
//               className="py-[14px]"
//               readOnly={isReadOnly()}
//             />
//             <Input
//               label={
//                 <>
//                   <span>Established Year</span>
//                   <span className="font-bold text-red-500">*</span>
//                 </>
//               }
//               type="date"
//               placeholder="Enter establishment year"
//               size="lg"
//               name="establishedYear"
//               value={formData.establishedYear}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//               error={errors.establishedYear}
//             />
//             {formData.customerType === "society" && (
//               <Select
//                 label={
//                   <>
//                     <span>Select Society Type</span>
//                     <span className="font-bold text-red-500">*</span>
//                   </>
//                 }
//                 options={societyTypeOptions}
//                 value={formData.societyType}
//                 onChange={handleInputChange}
//                 name="societyType"
//                 color="blue"
//                 size="md"
//                 className="py-[14px]"
//                 readOnly={isReadOnly()}
//               />
//             )}
//           </div>
//         </div>

//         {/* Builder Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Builder Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Builder Name"
//               type="text"
//               placeholder="Enter builder name"
//               size="lg"
//               name="builderName"
//               value={formData.builderName}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//               error={errors.builderName}
           
// />
// {errors.builderName && (
//   <p className="mt-1 text-sm text-red-500">{errors.builderName}</p>
// )}
//            <Input
//               label="Builder Details"
//               type="text"
//               placeholder="Enter Builder Social Link"
//               size="lg"
//               name="builderSocialLink"
//               value={formData.builderSocialLink}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
          
           
// />


//           </div>
//         </div>

//         {/* Address Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">
//             Society Location / Address
//           </h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input 
//               label={<><span>Address Line 1</span><span className="font-bold text-red-500">*</span></>} 
//               type="text"
//               placeholder="Enter address line 1"
//               size="lg"
//               name="address1"
//               value={formData.address.address1}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//             />
            
//             <Input
//               label={<><span>Street</span><span className="font-bold text-red-500">*</span></>} 
//               type="text"
//               placeholder="Enter Street"
//               size="lg"
//               name="street"
//               value={formData.address.street}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
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
//               readOnly={isReadOnly()}
//               error={errors.city}
//             />
//             <Input
//               label={<><span>State</span><span className="font-bold text-red-500">*</span></>} 
//               type="text"
//               placeholder="Enter state"
//               size="lg"
//               name="state"
//               value={formData.address.state}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//               error={errors.state}
//             />
//             {/* <Input
//               label={<><span>ZIP Code</span><span className="font-bold text-red-500">*</span></>} 
//               type="text"
//               placeholder="Enter ZIP code"
//               size="lg"
//               name="zipCode"
//               value={formData.address.zipCode}
//               maxLength={6}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//               error={errors.zipCode}
//             /> */}
//             <Input
//   label={
//     <>
//       <span>ZIP Code</span>
//       <span className="font-bold text-red-500">*</span>
//     </>
//   }
//   type="text"
//   placeholder="Enter ZIP code"
//   size="lg"
//   name="zipCode"
//   value={formData.address.zipCode}
//   maxLength={6}
//   onChange={handleChange}
//   readOnly={isReadOnly()}
// />
// {errors.zipCode && (
//   <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
// )}

//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Society Contact Details</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             {/* <Input
//               label={<><span>Phone</span><span className="font-bold text-red-500">*</span></>} 
//               type="text"
//               placeholder="Enter phone number"
//               size="lg"
//               name="phone"
//               maxLength={10}
//               value={formData.phone}
//               onChange={handleInputChange}
//               readOnly={isReadOnly()}
//             /> */}
//             <Input
//   label={
//     <>
//       <span>Phone</span>
//       <span className="font-bold text-red-500">*</span>
//     </>
//   }
//   type="text"
//   placeholder="Enter phone number"
//   size="lg"
//   name="phone"
//   value={formData.phone}
//   maxLength={10}
//   onChange={handleChange}
//   readOnly={isReadOnly()}
// />
// {errors.phone && (
//   <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
// )}

//           <Input
//   label={<><span>Email</span><span className="font-bold text-red-500">*</span></>}
//   type="email"
//   placeholder="Enter email address"
//   size="lg"
//   name="email"
//   value={formData.email}
//   onChange={handleChange}
//   readOnly={isReadOnly()}
//   error={errors.email}
  
//   title="Please enter a valid email address (e.g., example@domain.com)."
// />
// {errors.email && (
//   <p className="mt-1 text-sm text-red-500">{errors.email}</p>
// )}


//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center py-5">
//           {/* <Button onClick={handleSubmit} className="w-full max-w-lg">
//             {formMode === "create" ? "Submit" : "Edit"}
//           </Button> */}
//           <form onSubmit={handleSubmit}>
//   <Button type="submit" className="w-full max-w-lg">
//     {formMode === "create" ? "Submit" : "Edit"}
//   </Button>
// </form>
//         </div>
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           closeOnClick
//           pauseOnHover
//           draggable
//           theme="colored"
//         />
//       </div>
//     </div>
//   );
// };

// export default SocietyCreateForm;
// import React from "react";
// import Input from "../../../../components/shared/Input";
// import Select from "../../../../components/ui/Select";
// import Button from "../../../../components/ui/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { setCustomerFormField } from "../../../../redux/slices/customerSlice";
// import { toast, ToastContainer } from "react-toastify";

// const SocietyCreateForm = ({ onSubmit, onEditHandler }) => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.customer.customerForm);
//   const societyTypeOptions = useSelector(
//     (state) => state.customer.societyTypeOptions
//   );
//   const subscriptionPlans = useSelector(
//     (state) => state.customer.subscriptionPlans
//   );
//   const customerTypeOptions = useSelector(
//     (state) => state.customer.customerTypeOptions
//   );
//   const formMode = useSelector((state) => state.customer.formOperationType);

//   console.log(formMode);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     dispatch(setCustomerFormField({ name, value }));
//   };

//   return (
//     <div className="flex">
//       <div className="w-full space-y-5">
//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Customer Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Customer Name"
//               type="text"
//               placeholder="Enter customer name"
//               size="lg"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//               readOnly={formMode !== "create"}
//             />
//             <Select
//               label="Select Customer Type"
//               options={customerTypeOptions}
//               value={formData.customerType}
//               onChange={handleInputChange}
//               color="blue"
//               size="md"
//               name="customerType"
//               className="py-[14px]"
//               readOnly={formMode !== "create"}
//             />
//             <Select
//               label="Select Subscription Plan"
//               options={subscriptionPlans}
//               value={formData.subscriptionId}
//               onChange={handleInputChange}
//               color="blue"
//               size="md"
//               name="subscriptionId"
//               className="py-[14px]"
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Establisment Year"
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
//                 label="Select Society Type"
//                 options={societyTypeOptions}
//                 value={formData.societyType}
//                 onChange={handleInputChange}
//                 color="blue"
//                 size="md"
//                 name="societyType"
//                 className="py-[14px]"
//                 readOnly={formMode === "view"}
//               />
//             )}
//           </div>
//         </div>

//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Builder Info</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Builder Name"
//               type="text"
//               placeholder="Enter Builder name"
//               size="lg"
//               name="builderName"
//               value={formData.builderName}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Builder Details"
//               type="text"
//               placeholder="Enter Builder Scocil Link"
//               size="lg"
//               name="builderSocialLink"
//               value={formData.builderSocialLink}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">
//             Society Location / Address
//           </h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Address Line 1"
//               type="text"
//               placeholder="Enter address line 1"
//               size="lg"
//               name="address1"
//               value={formData.address.address1}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Address line 2"
//               type="text"
//               placeholder="Enter your address"
//               size="lg"
//               name="street"
//               value={formData.address.street}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="City"
//               type="text"
//               placeholder="Enter your city"
//               size="lg"
//               name="city"
//               value={formData.address.city}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="State"
//               type="text"
//               placeholder="Enter your state"
//               size="lg"
//               name="state"
//               value={formData.address.state}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Pin"
//               type="text"
//               placeholder="Enter your pin"
//               size="lg"
//               name="zipCode"
//               value={formData.address.zipCode}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         <div className="p-5 bg-white border border-gray-100 rounded-2xl">
//           <h3 className="font-semibold text-lime">Society Contact Details</h3>
//           <div className="grid items-center grid-cols-3 gap-5 mt-3">
//             <Input
//               label="Phone"
//               type="text"
//               placeholder="Enter your phone number"
//               size="lg"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//             <Input
//               label="Email"
//               type="text"
//               placeholder="Enter your email"
//               size="lg"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               readOnly={formMode === "view"}
//             />
//           </div>
//         </div>

//         <div className="flex justify-center py-5">
//           {formMode === "create" && (
//             <Button onClick={onSubmit} className="w-full max-w-lg">
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

// export default SocietyCreateForm;
import React from "react";
import Input from "../../../../components/shared/Input";
import Select from "../../../../components/ui/Select";
import Button from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerFormField } from "../../../../redux/slices/customerSlice";

const SocietyCreateForm = ({ onSubmit, onEditHandler }) => {
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

  console.log(formMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(setCustomerFormField({ name, value }));
  };

  return (
    <div className="flex">
      <div className="w-full space-y-5">
        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Customer Info</h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={<><span>Customer Name</span><span className="font-bold text-red-500">*</span></>}
              type="text"
              placeholder="Enter customer name"
              size="lg"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              readOnly={formMode !== "create"}
            />
            <Select
              label={<><span>Select Customer Type</span><span className="font-bold text-red-500">*</span></>}
              options={customerTypeOptions}
              value={formData.customerType}
              onChange={handleInputChange}
              color="blue"
              size="md"
              name="customerType"
              className="py-[14px]"
              readOnly={formMode !== "create"}
            />
            <Select
              label={<><span>Select Subscription Plan</span><span className="font-bold text-red-500">*</span></>}
              options={subscriptionPlans}
              value={formData.subscriptionId}
              onChange={handleInputChange}
              color="blue"
              size="md"
              name="subscriptionId"
              className="py-[14px]"
              readOnly={formMode === "view"}
            />
            <Input
              label={<><span>Establisment Year</span><span className="font-bold text-red-500">*</span></>}
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
                label={<><span>Select Society Type</span><span className="font-bold text-red-500">*</span></>}
                options={societyTypeOptions}
                value={formData.societyType}
                onChange={handleInputChange}
                color="blue"
                size="md"
                name="societyType"
                className="py-[14px]"
                readOnly={formMode === "view"}
              />
            )}
          </div>
        </div>

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
              placeholder="Enter Builder Social Link"
              size="lg"
              name="builderSocialLink"
              value={formData.builderSocialLink}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
          </div>
        </div>

        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">
            Society Location / Address
          </h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={<><span>Address Line 1</span><span className="font-bold text-red-500">*</span></>}
              type="text"
              placeholder="Enter address line 1"
              size="lg"
              name="address1"
              value={formData.address.address1}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={<><span>Address Line 2 </span><span className="font-bold text-red-500">*</span></>}
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
              label={<><span>City</span><span className="font-bold text-red-500">*</span></>}
              type="text"
              placeholder="Enter city"
              size="lg"
              name="city"
              value={formData.address.city}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={<><span>State</span><span className="font-bold text-red-500">*</span></>}
              type="text"
              placeholder="Enter state"
              size="lg"
              name="state"
              value={formData.address.state}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={<><span>Pin</span><span className="font-bold text-red-500">*</span></>}
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

        <div className="p-5 bg-white border border-gray-100 rounded-2xl">
          <h3 className="font-semibold text-lime">Society Contact Details</h3>
          <div className="grid items-center grid-cols-3 gap-5 mt-3">
            <Input
              label={<><span>Mobile Number</span><span className="font-bold text-red-500">*</span></>}
              type="text"
              placeholder="Enter mobile number"
              size="lg"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              readOnly={formMode === "view"}
            />
            <Input
              label={<><span>Email</span><span className="font-bold text-red-500">*</span></>}
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

        <div className="flex justify-center py-5">
          {formMode === "create" && (
            <Button onClick={onSubmit} className="w-full max-w-lg">
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

export default SocietyCreateForm;