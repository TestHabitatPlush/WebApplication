import React from "react";
import {
  Input,
  Select,
  CountryStateCitySelector,
  Button,
} from "../../../../components/common/imports";
import Dialog from "../../../../components/ui/Dialog";

const ViewSocietyModeratorModal = ({
  isOpen,
  onClose,
  data = {},
  selectOptions = {},
}) => {
  if (!isOpen) return null;

  // Helper to get the selected option object by value
  const getSelectedOption = (options = [], value) => {
    if (value === undefined || value === null) return null;

    const valStr = String(value).trim();

    return (
      options.find(
        (opt) => String(opt?.value).trim() === valStr
      ) || null
    );
  };
// const getSelectedOption = (options = [], value) => {
//   if (value === undefined || value === null || value === "") return null;

//   return (
//     options.find(
//       (opt) => String(opt?.value) === String(value)
//     ) || null
//   );
// };

  const DisabledSelect = ({ label, options, value }) => (
    <Select
      label={label}
      options={options}
      value={getSelectedOption(options, value)}
      isDisabled
    />
  );

  const DisabledInput = ({ label, value }) => (
    <Input label={label} value={value || ""} disabled />
  );

  // ✅ IMPORTANT for your Sequelize backend
  const roleValue =
    data?.roleId ?? data?.userRole?.roleId ?? "";

  const societyValue =
    data?.societyId ?? "";

  return (
    //  <Dialog
    //   isOpen={isOpen}
    //   onClose={onClose}
    //   className="w-full h-full p-10 overflow-auto overflow-y: auto max-height: 100vh;"
    //   contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto p-5"
    //   overlayClassName="backdrop-blur"
    // >
    //   <div className="w-full max-w-[90vw] max-h-[80vh] overflow-y-auto">
    //     <div className="p-8 bg-gray-100 rounded-lg">

    //       <div className="mb-4 text-xl font-semibold text-lime">
    //         Profile Details
    //       </div>

    //       <div className="flex items-center gap-5 mt-5">
    //         <div
    //           className="relative border-2 rounded-full h-28 w-28 border-lime"
    //           style={{
    //             backgroundImage: data?.profilePhoto
    //               ? `url(${data.profilePhoto})`
    //               : "url(/placeholder.png)",
    //             backgroundSize: "cover",
    //             backgroundPosition: "center",
    //           }}
    //         />
    //       </div>

    //       {/* Name */}
    //       <div className="grid grid-cols-3 gap-5 py-6">
    //         <DisabledSelect
    //           label="Salutation"
    //           options={selectOptions.salutation || []}
    //           value={data?.salutation}
    //         />

    //         <DisabledInput
    //           label="First Name"
    //           value={data?.firstName}
    //         />

    //         <DisabledInput
    //           label="Last Name"
    //           value={data?.lastName}
    //         />
    //       </div>

    //       {/* Contact */}
    //       <div className="grid grid-cols-4 gap-5">
    //         <DisabledSelect
    //           label="Country Code"
    //           options={selectOptions.countryCodes || []}
    //           value={data?.countryCode}
    //         />

    //         <DisabledInput
    //           label="Mobile No."
    //           value={data?.mobileNumber}
    //         />

    //         <DisabledSelect
    //           label="Alternate Country Code"
    //           options={selectOptions.countryCodes || []}
    //           value={data?.alternateCountryCode}
    //         />

    //         <DisabledInput
    //           label="Alternate No."
    //           value={data?.alternateNumber}
    //         />

    //         <DisabledInput
    //           label="Email"
    //           value={data?.email}
    //         />
    //       </div>

    //       {/* Address */}
    //       <div className="p-5 mt-5">
    //         <h3 className="font-semibold text-lime">
    //           Society Location / Address
    //         </h3>

    //         <div className="grid grid-cols-2 gap-5 mt-3">
    //           <DisabledInput
    //             label="Address Line 1"
    //             value={data?.address?.addressLine1}
    //           />

    //           <DisabledInput
    //             label="Address Line 2"
    //             value={data?.address?.addressLine2}
    //           />
    //         </div>

    //         <div className="grid grid-cols-3 gap-5 mt-3">
    //           <CountryStateCitySelector
    //             address={data?.address || {}}
    //             disabled
    //           />

    //           <DisabledInput
    //             label="Pin"
    //             value={data?.address?.zipCode}
    //           />
    //         </div>
    //       </div>

    //       {/* Role / Society / Remarks */}
    //       <div className="grid grid-cols-2 gap-5 mt-5">
    //         <DisabledSelect
    //           label="Role"
    //           options={selectOptions.userRoles || []}
    //           value={roleValue}
    //         />

    //         <DisabledInput
    //           label="Remarks"
    //           value={data?.remark}
    //         />

    //         <DisabledSelect
    //           label="Select Society"
    //           options={selectOptions.societyLists || []}
    //           value={societyValue}
    //         />
    //       </div>

    //       <div className="flex justify-center mt-6">
    //         <Button type="button" onClick={onClose}>
    //           Close
    //         </Button>
    //       </div>

    //     </div>
    //   </div>
    // </Dialog>


    <Dialog
  isOpen={isOpen}
  onClose={onClose}
  closable={false}   // we will use our own fixed close button
  className="w-full h-full p-10"
  contentClassName="w-full bg-white lg:max-w-4xl rounded-lg p-0"
  overlayClassName="backdrop-blur"
>
  <div className="flex flex-col h-[85vh]">

    {/* ===== Fixed Header ===== */}
    <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="text-xl font-semibold text-lime">
        Profile Details
      </div>

      {/* fixed close button */}
      <button
        type="button"
        onClick={onClose}
        className="p-2 text-gray-600 rounded hover:bg-gray-100 hover:text-red-600"
      >
        ✕
      </button>
    </div>

    {/* ===== Scrollable Body ===== */}
    <div className="flex-1 px-6 py-4 overflow-y-auto">

      {/* your existing content (unchanged) */}
      <div className="p-8 bg-gray-100 rounded-lg">

        <div className="flex items-center gap-5">
          <div
            className="relative border-2 rounded-full h-28 w-28 border-lime"
            style={{
              backgroundImage: data?.profilePhoto
                ? `url(${data.profilePhoto})`
                : "url(/placeholder.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Name */}
        <div className="grid grid-cols-3 gap-5 py-6">
          <DisabledSelect
            label="Salutation"
            options={selectOptions.salutation || []}
            value={data?.salutation}
          />

          <DisabledInput
            label="First Name"
            value={data?.firstName}
          />

          <DisabledInput
            label="Last Name"
            value={data?.lastName}
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-4 gap-5">
          <DisabledSelect
            label="Country Code"
            options={selectOptions.countryCodes || []}
            value={data?.countryCode}
          />

          <DisabledInput
            label="Mobile No."
            value={data?.mobileNumber}
          />

          <DisabledSelect
            label="Alternate Country Code"
            options={selectOptions.countryCodes || []}
            value={data?.alternateCountryCode}
          />

          <DisabledInput
            label="Alternate No."
            value={data?.alternateNumber}
          />

          <DisabledInput
            label="Email"
            value={data?.email}
          />
        </div>

        {/* Address */}
        <div className="p-5 mt-5">
          <h3 className="font-semibold text-lime">
            Society Location / Address
          </h3>

          <div className="grid grid-cols-2 gap-5 mt-3">
            <DisabledInput
              label="Address Line 1"
              value={data?.address?.addressLine1}
            />

            <DisabledInput
              label="Address Line 2"
              value={data?.address?.addressLine2}
            />
          </div>

          <div className="grid grid-cols-3 gap-5 mt-3">
            <CountryStateCitySelector
              address={data?.address || {}}
              disabled
            />

            <DisabledInput
              label="Pin"
              value={data?.address?.zipCode}
            />
          </div>
        </div>

        {/* Role / Society / Remarks */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          <DisabledSelect
            label="Role"
            options={selectOptions.userRoles || []}
            value={roleValue}
          />

          <DisabledInput
            label="Remarks"
            value={data?.remark}
          />

          <DisabledSelect
            label="Select Society"
            options={selectOptions.societyLists || []}
            value={societyValue}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </div>

      </div>
    </div>
  </div>
</Dialog>

  );
};

export default ViewSocietyModeratorModal;
