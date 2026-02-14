

import React, { useState } from "react";
// import Button from "../../../../../components/ui/Button";
import Input from "../../../../../components/shared/Input";
import Dialog from "../../../../../components/ui/Dialog";

const DefinePorpousView = ({ isOpen, onClose, formData }) => {
  const [viewDefinePurpose] = useState(formData);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`}
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-1 gap-7 items-center">
          <Input
            label={<div>Ticket Purpous </div>}
            type="text"
            placeholder={"Enter Ticket Purpous"}
            size={"lg"}
            value={viewDefinePurpose?.purpose_Details || ""}
            name="purpose_Details"
            readOnly
          />
        </div>
        <div className="grid grid-cols-3 gap-5 items-center mt-3">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              value="active"
              name="status"
              checked={viewDefinePurpose?.status === "active"}
              readOnly
              className="w-4 h-4"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 ">
              Active
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              value="inactive"
              name="status"
              checked={viewDefinePurpose?.status === "inactive"}
              readOnly
              className="w-4 h-4"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 ">
              Inactive
            </label>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DefinePorpousView;
