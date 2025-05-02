import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";

const ViewUserAllDetailsModal = ({ isOpen, onClose, formData }) => {
  const [userViewForm, setUserViewForm] = useState(formData);

  useEffect(() => {
    setUserViewForm(formData);
  }, [formData]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      {/* Modal Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">View User Details</h2>
      </div>

      {/* Modal Body */}
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-3 gap-5 items-center py-6">
         <Input
            label="User Id"
            type="text"
            name="userId"
            value={userViewForm?.userId || ""}
            readOnly
          />
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={userViewForm?.firstName || ""}
            readOnly
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={userViewForm?.lastName || ""}
            readOnly
          />
          <Input
            label="Mobile No."
            type="text"
            name="mobileNumber"
            value={userViewForm?.mobileNumber || ""}
            readOnly
          />
          <Input
            label="Role"
            type="text"
            name="roleId"
            value={userViewForm?.roleId || ""}
            readOnly
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ViewUserAllDetailsModal;
