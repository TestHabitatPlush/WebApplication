// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Input from "../components/shared/Input";
// import Select from "../components/ui/Select";
// import { FaCamera } from "react-icons/fa";
// import Button from "../components/ui/Button";
// import UserHandler from "../handlers/UserHandler";
// import UserRoleHandler from "../handlers/UserRoleHandler";
// import CustomerHandler from "../handlers/superadmin/CustomerHandler";

// const CreateUserForm = () => {
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.societyModeratorForm.formData);
//   const selectOptions = useSelector(
//     (state) => state.societyModeratorForm.selectOptions
//   );
//   const { createSocietyModeratorHandler } = UserHandler();
//   const { getCustomerHandler } = CustomerHandler();

//   const fileInputRef = useRef(null);
//   const [photomsg, setPhotomsg] = useState("");

//   const { getUserRolesHandler } = UserRoleHandler();

//   const getUserRoles = async () => {
//     const result = await getUserRolesHandler();
//     // console.log(result.data);
//     const newData = result.data
//       .filter((el) => el.roleCategory === "society_moderator")
//       .map((el) => ({ label: el.roleCategory, value: el.roleId }));

//     dispatch({
//       type: "societyModeratorForm/setUserRoleOptions",
//       payload: newData,
//     });
//   };

//   useEffect(() => {
//     getUserRoles();
//   }, []);
// const validateForm = () => {
//     const requiredFields = [
//       "salutation",
//       "firstName",
//       "lastName",
//       "mobileNumber",
//       "alternateNumber",
//       "email",
//       "addressLine1",
//       "addressLine2",
//       "state",
//       "city",
//       "country",
//       "zipCode",
//       "roleId",
//       "remark",
//       "societyId",
//     ];
//     let isValid = true;
//     requiredFields.forEach((field) => {
//       if (!formData[field] || (formData[field] && formData[field].trim() === "")) {
//         isValid = false;
//         dispatch({
//           type: "societyModeratorForm/setFieldError",
//           payload: { name: field, error: "This field is required." },
//         });
//       }
//     });
//     return isValid;
//   };
//   const fetchSocietiesData = async () => {
//     try {
//       const result = await getCustomerHandler();
//       console.log(result);
//       const newValue = result.data.data.map((el) => ({
//         label: el.customerName,
//         value: el.customerId,
//       }));

//       dispatch({
//         type: "societyModeratorForm/setSocietyLists",
//         payload: newValue,
//       });
//     } catch (error) {
//       console.error("Failed to fetch societies data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSocietiesData();
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     dispatch({
//       type: "societyModeratorForm/setOnChangeFormField",
//       payload: { name, value },
//     });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 1 * 1024 * 1024) {
//         setPhotomsg(
//           "The image size is above 1MB. Please choose a smaller file."
//         );
//         return;
//       } else {
//         setPhotomsg("");
//         dispatch({
//           type: "societyModeratorForm/setOnChangeFormField",
//           payload: { name: "profilePhoto", value: file }, // Store the file object
//         });
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createSocietyModeratorHandler(formData).then((res) => {
//       //    dispatch({
//       //      type: "societyModeratorForm/resetFormData",
//       //      payload: null,
//       //    });
      
    
//     });
//   };

//   const handleIconClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="p-10 my-5 bg-gray-100 border rounded-lg">
//       <div className="font-sans text-xl font-semibold text-lime">
//         Profile Details
//       </div>

//       <form>
//         <div className="flex flex-row mt-5">
//           <div className="flex items-center gap-5">
//             <div
//               className="relative border-2 rounded-full h-28 w-28 border-lime"
//               style={{
//                 backgroundImage: formData.profilePhoto
//                   ? `url(${formData.profilePhoto})`
//                   : "none",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <FaCamera
//                 onClick={handleIconClick}
//                 className="absolute bottom-0 right-0 bg-lime text-white text-[30px] p-2 rounded-full cursor-pointer"
//                 size={38}
//               />
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />
//             </div>
//             <div>
//               <h2>Choose profile photo</h2>
//               <div className="text-red-700">{photomsg}</div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Fields */}
//         <div className="grid items-center grid-cols-3 gap-5 py-6">
//           <Select
//             label={<><span>Salutation</span><span className="font-bold text-red-500">*</span></>} 
//             options={selectOptions.salutation}
//             value={formData.salutation}
//             onChange={handleInputChange}
//             name="salutation"
//             color="blue"
//             size="md"
//             className="py-[14px]"
//           />
//           <Input
//             label={<><span> First Name</span><span className="font-bold text-red-500">*</span></>}
//             type="text"
//             placeholder="Enter First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             size="lg"
//           />
//           <Input
//             label={<><span>Last Name</span><span className="font-bold text-red-500">*</span></>}
//             type="text"
//             placeholder="Enter Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             size="lg"
//           />
//         </div>

//         {/* Contact Details */}
//         <div className="grid items-center grid-cols-4 gap-5">
//           <Select
//             label={<><span> Country Code</span><span className="font-bold text-red-500">*</span></>}
//             options={selectOptions.countryCodes}
//             value={formData.countryCode}
//             onChange={handleInputChange}
//             name="countryCode"
//             className="py-[14px]"
//           />
//           <Input
//             label={<><span> Mobile No.(Primary)</span><span className="font-bold text-red-500">*</span></>}
//             type="number"
//             placeholder="Enter Mobile Number"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleInputChange}
//             size="lg"
//           />

//           <Select
//             label={<><span> Country Code</span><span className="font-bold text-red-500">*</span></>}
//             options={selectOptions.countryCodes}
//             value={formData.alternateCountryCode}
//             onChange={handleInputChange}
//             name="alternateCountryCode"
//             className="py-[14px]"
//           />
//           <Input
//             label={<><span> Alternate Mobile No.</span><span className="font-bold text-red-500">*</span></>}
//             type="number"
//             placeholder="Enter Alternate Mobile Number"
//             name="alternateNumber"
//             value={formData.alternateNumber}
//             onChange={handleInputChange}
//             size="lg"
//           />
//           <Input
//             label={<><span>Email</span><span className="font-bold text-red-500">*</span></>}
//             type="email"
//             placeholder="Enter Email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             size="lg"
//           />
//           {/* <Input
//             label="Password"
//             type="password"
//             placeholder="Enter Your Password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             size="lg"
//           /> */}
//         </div>

//         {/* Address Details */}
//         <div className="py-5">
//           <div className="font-sans text-xl font-semibold text-lime">
//             Address Details
//           </div>
//           <div className="grid items-center grid-cols-3 gap-5">
//             <Input
//               label={<><span>Address Line 1</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter Address"
//               name="addressLine1"
//               value={formData?.address?.addressLine1}
//               onChange={handleInputChange}
//               size="lg"
//             />
//             <Input
//               label={<><span> Address Line 2</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter Address"
//               name="addressLine2"
//               value={formData.address?.addressLine2}
//               onChange={handleInputChange}
//               size="lg"
//             />
//           </div>
//           <div className="grid items-center grid-cols-3 gap-5">
//             <Input
//               label={<><span>State</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter State"
//               name="state"
//               value={formData.address.state}
//               onChange={handleInputChange}
//               size="lg"
//             />
//             <Input
//               label={<><span>City</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter City"
//               name="city"
//               value={formData.address.city}
//               onChange={handleInputChange}
//               size="lg"
//             />
//             <Input
//               label={<><span>Country</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter Country "
//               name="country"
//               value={formData.address.country}
//               onChange={handleInputChange}
//               size="lg"
//             />
//             <Input
//               label={<><span>Zip Code</span><span className="font-bold text-red-500">*</span></>}
//               type="text"
//               placeholder="Enter PIN"
//               name="zipCode"
//               value={formData.address.zipCode}
//               onChange={handleInputChange}
//               size="lg"
//             />
//           </div>
//         </div>

//         {/* Role and Remark */}
//         <div className="grid grid-cols-2 gap-5">
//           <Select
//             label={<><span>Role</span><span className="font-bold text-red-500">*</span></>}
//             options={selectOptions.userRoles}
//             value={formData.roleId}
//             onChange={handleInputChange}
//             name="roleId"
//             color="blue"
//             size="md"
//             className="py-[14px]"
//           />
//           <Input
//             label={<><span> Remarks </span><span className="font-bold text-red-500">*</span></>}
//             type="text"
//             placeholder="Enter Any Remarks"
//             name="remark"
//             value={formData.remark}
//             onChange={handleInputChange}
//             size="lg"
//           />
//           <Select
//             label={<><span>Select Society</span><span className="font-bold text-red-500">*</span></>}
//             options={selectOptions.societyLists}
//             value={formData.societyId}
//             onChange={handleInputChange}
//             name="societyId"
//             color="blue"
//             size="md"
//             className="py-[14px]"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-center mt-6">
//           <Button onClick={handleSubmit}>Submit</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateUserForm;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/shared/Input";
import Select from "../components/ui/Select";
import { FaCamera } from "react-icons/fa";
import Button from "../components/ui/Button";
import UserHandler from "../handlers/UserHandler";
import UserRoleHandler from "../handlers/UserRoleHandler";
import CustomerHandler from "../handlers/superadmin/CustomerHandler";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.societyModeratorForm.formData);
  const selectOptions = useSelector((state) => state.societyModeratorForm.selectOptions);

  const fileInputRef = useRef(null);
  const [photomsg, setPhotomsg] = useState("");

  const { createSocietyModeratorHandler } = UserHandler();
  const { getUserRolesHandler } = UserRoleHandler();
  const { getCustomerHandler } = CustomerHandler();

  // Deduplicated fetching of user roles
  const getUserRoles = async () => {
    try {
      const result = await getUserRolesHandler();
      const uniqueRoles = Array.from(
        new Map(
          result.data.map((el) => [el.roleId, { label: el.roleCategory, value: el.roleId }])
        ).values()
      );

      dispatch({
        type: "societyModeratorForm/setUserRoleOptions",
        payload: uniqueRoles,
      });
    } catch (error) {
      console.error("Failed to fetch user roles:", error);
    }
  };

  // Deduplicated fetching of society list
  const fetchSocietiesData = async () => {
    try {
      const result = await getCustomerHandler();
      const uniqueSocieties = Array.from(
        new Map(
          result.data.data.map((el) => [el.customerId, { label: el.customerName, value: el.customerId }])
        ).values()
      );

      dispatch({
        type: "societyModeratorForm/setSocietyLists",
        payload: uniqueSocieties,
      });
    } catch (error) {
      console.error("Failed to fetch societies data:", error);
    }
  };

  useEffect(() => {
    getUserRoles();
    fetchSocietiesData();
  }, []);

  const validateForm = () => {
    const requiredFields = [
      "salutation", "firstName", "lastName", "mobileNumber", "alternateNumber",
      "email", "addressLine1", "addressLine2", "state", "city", "country",
      "zipCode", "roleId", "remark", "societyId",
    ];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field] || (formData[field] && formData[field].trim() === "")) {
        isValid = false;
        dispatch({
          type: "societyModeratorForm/setFieldError",
          payload: { name: field, error: "This field is required." },
        });
      }
    });

    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "societyModeratorForm/setOnChangeFormField",
      payload: { name, value },
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setPhotomsg("The image size is above 1MB. Please choose a smaller file.");
        return;
      } else {
        setPhotomsg("");
        dispatch({
          type: "societyModeratorForm/setOnChangeFormField",
          payload: { name: "profilePhoto", value: file },
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    createSocietyModeratorHandler(formData).then((res) => {
      // Handle post-submit logic here
    });
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="font-sans text-xl font-semibold text-lime">Profile Details</div>

      <form>
        <div className="flex flex-row mt-5">
          <div className="flex items-center gap-5">
            <div
              className="relative border-2 rounded-full h-28 w-28 border-lime"
              style={{
                backgroundImage: formData.profilePhoto
                  ? `url(${URL.createObjectURL(formData.profilePhoto)})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FaCamera
                onClick={handleIconClick}
                className="absolute bottom-0 right-0 bg-lime text-white text-[30px] p-2 rounded-full cursor-pointer"
                size={38}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h2>Choose profile photo</h2>
              <div className="text-red-700">{photomsg}</div>
            </div>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid items-center grid-cols-3 gap-5 py-6">
          <Select
            label="Salutation *"
            options={selectOptions.salutation}
            value={formData.salutation}
            onChange={handleInputChange}
            name="salutation"
            className="py-[14px]"
          />
          <Input
            label="First Name *"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name *"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        {/* Contact Details */}
        <div className="grid items-center grid-cols-4 gap-5">
          <Select
            label="Country Code *"
            options={selectOptions.countryCodes}
            value={formData.countryCode}
            onChange={handleInputChange}
            name="countryCode"
            className="py-[14px]"
          />
          <Input
            label="Mobile No. *"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
          <Select
            label="Alternate Country Code *"
            options={selectOptions.countryCodes}
            value={formData.alternateCountryCode}
            onChange={handleInputChange}
            name="alternateCountryCode"
            className="py-[14px]"
          />
          <Input
            label="Alternate Mobile No. *"
            type="number"
            name="alternateNumber"
            value={formData.alternateNumber}
            onChange={handleInputChange}
          />
          <Input
            label="Email *"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Address Details */}
        <div className="py-5">
          <div className="font-sans text-xl font-semibold text-lime">Address Details</div>
          <div className="grid grid-cols-3 gap-5">
            <Input
              label="Address Line 1 *"
              name="addressLine1"
              value={formData.address?.addressLine1}
              onChange={handleInputChange}
            />
            <Input
              label="Address Line 2 *"
              name="addressLine2"
              value={formData.address?.addressLine2}
              onChange={handleInputChange}
            />
            <Input
              label="State *"
              name="state"
              value={formData.address?.state}
              onChange={handleInputChange}
            />
            <Input
              label="City *"
              name="city"
              value={formData.address?.city}
              onChange={handleInputChange}
            />
            <Input
              label="Country *"
              name="country"
              value={formData.address?.country}
              onChange={handleInputChange}
            />
            <Input
              label="Zip Code *"
              name="zipCode"
              value={formData.address?.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Role and Remarks */}
        <div className="grid grid-cols-2 gap-5">
          <Select
            label="Role *"
            options={selectOptions.userRoles}
            value={formData.roleId}
            onChange={handleInputChange}
            name="roleId"
            className="py-[14px]"
          />
          <Input
            label="Remarks *"
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
          />
          <Select
            label="Select Society *"
            options={selectOptions.societyLists}
            value={formData.societyId}
            onChange={handleInputChange}
            name="societyId"
            className="py-[14px]"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
