import React, { useEffect, useState } from "react";
import Button from "../../../../../components/ui/Button";
import Input from "../../../../../components/shared/Input";
import Dialog from "../../../../../components/ui/Dialog";

const VisitorRelationshipEdit = ({
  isOpen,
  onClose,
  formData,
  onEditHandler,
}) => {
  const [editVisitor, setEditVisitor] = useState(formData);
  useEffect(() => {
    setEditVisitor(formData); // Set the form data when component mounts or formData changes
  }, [formData]);

  const handleInput = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setEditVisitor({ ...editVisitor, [name]: value });
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
        <div className="grid grid-cols-3 gap-4">
          <div>Visitor Relationship</div>
          <div>
            <Input
              // label={<div>First Name</div>}
              type="text"
              value={editVisitor?.Visit_relation_Description || ""}
              name="Visit_relation_Description"
              placeholder={"Visitor Relationship"}
              size={"lg"}
              onChange={handleInput}
            />
          </div>
          <div>
            <Button
              className="max-w-sm"
              type="submit"
              onClick={() => onEditHandler(editVisitor)}
              size="md"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default VisitorRelationshipEdit;
