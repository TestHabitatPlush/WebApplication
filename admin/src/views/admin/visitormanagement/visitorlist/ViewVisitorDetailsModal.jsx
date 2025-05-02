import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";

const ViewVisitorDetailsModal = ({ isOpen, onClose, formData }) => {
  const [visitorViewForm, setVisitorViewForm] = useState(formData);

  useEffect(() => {
    setVisitorViewForm(formData);
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
        <h2 className="text-2xl font-semibold text-gray-800">View Visitor Details</h2>
      </div>

      {/* Modal Body */}
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-3 gap-5 items-center py-6">
          <Input
            label="Date of Entry"
            type="date"
            name="visit_expect_date_of_entry_date"
            value={visitorViewForm?.visit_expect_date_of_entry_date?.slice(0, 10) || ""} 
            readOnly
          />
          <Input
            label="Name of Visitor"
            type="text"
            name="visit_name"
            value={visitorViewForm?.visit_name || ""}
            readOnly
          />
          <Input
            label="Mobile No."
            type="text"
            name="visit_mobileno"
            value={visitorViewForm?.visit_mobileno || ""}
            readOnly
          />
          <Input
            label="Relationship"
            type="text"
            name="relationship"
            value={visitorViewForm?.relationship || ""}
            readOnly
          />
          <Input
            label="Purpose of Visit"
            type="text"
            name="visit_porpous"
            value={visitorViewForm?.visit_porpous || ""}
            readOnly
          />
          <div>
            <label
              htmlFor="visit_location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Coming From
            </label>
            <textarea
              id="visit_location"
              name="visit_location"
              value={visitorViewForm?.visit_location || ""}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ViewVisitorDetailsModal;
