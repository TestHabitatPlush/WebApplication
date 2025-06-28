import React, { useEffect, useState } from "react";
import Dialog from "../../../../../components/ui/Dialog";
import Button from "../../../../../components/ui/Button";

const VisitorRelationshipDelete = ({
  isOpen,
  onClose,
  formData,
  onConfirm,
}) => {
  const [deleteVisitor, setDeleteVisitor] = useState(formData);
  //   console.log("delete visitor", formData);

  useEffect(() => {
    setDeleteVisitor(formData); // Set the form data when component mounts or formData changes
  }, [formData]);

  const onDeleteHandler = () => {
    console.log("ffdjh", deleteVisitor);
    onConfirm(deleteVisitor.Visit_relation_Id);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`}
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-7  border rounded-lg bg-gray-100 flex flex-col justify-center items-center">
        {" "}
        {/* Center content inside */}
        <div className="text-center mb-5">
          {" "}
          {/* Center text */}
          <p>Are you sure you want to delete this record?</p>
        </div>
        <div className="mt-5">
          <Button
            className="max-w-sm"
            type="submit"
            onClick={onDeleteHandler}
            size="md"
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default VisitorRelationshipDelete;
