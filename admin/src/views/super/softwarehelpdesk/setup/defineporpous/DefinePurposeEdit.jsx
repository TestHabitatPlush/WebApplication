



import React, { useEffect, useState } from "react";
import Input from "../../../../../components/shared/Input";
import Button from "../../../../../components/ui/Button";
import Dialog from "../../../../../components/ui/Dialog";

const DefinePurposeEdit = ({ isOpen, onClose, formData, onEditHandler }) => {
  const [editDefinePurpose, setEditDefinePurpose] = useState(formData);

  useEffect(() => {
    setEditDefinePurpose(formData);
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEditDefinePurpose({ ...editDefinePurpose, [name]: value });
  };

  const handleStatusChange = (e) => {
    setEditDefinePurpose({ ...editDefinePurpose, status: e.target.value });
  };

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
            value={editDefinePurpose?.purpose_Details || ""}
            name="purpose_Details"
            onChange={handleInput}
          />
        </div>
        <div className="grid grid-cols-3 gap-5 items-center mt-3">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              value="active"
              name="status"
              checked={editDefinePurpose?.status === "active"}
              onChange={handleStatusChange}
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
              checked={editDefinePurpose?.status === "inactive"}
              onChange={handleStatusChange}
              className="w-4 h-4"
            />
            <label className="ms-2 text-sm font-medium text-gray-900 ">
              Inactive
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-3 items-center">
          <div></div>
          <div>
            <Button
              className="max-w-sm"
              type="submit"
              onClick={() => onEditHandler(editDefinePurpose)}
              size="lg"
            >
              Update
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </Dialog>
  );
};

export default DefinePurposeEdit;
