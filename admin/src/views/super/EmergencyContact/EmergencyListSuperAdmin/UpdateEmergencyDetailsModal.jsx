import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

const UpdateEmergencyDetailsModal = ({
  isOpen,
  onClose,
  formData,
  onEditHandler,
}) => {
  const [formState, setFormState] = useState({
    name: "",
    econtactNo1: "",
    econtactNo2: "",
    emergencyContactType: "",
    address: "",
    state: "",
    city: "",
    pin: "",
    contactId: "", // correctly named
  });

  useEffect(() => {
    if (formData) {
      setFormState({
        name: formData.name || "",
        econtactNo1: formData.econtactNo1 || "",
        econtactNo2: formData.econtactNo2 || "",
        emergencyContactType: formData.emergencyContactType || "",
        address: formData.address || "",
        state: formData.state || "",
        city: formData.city || "",
        pin: formData.pin || "",
        contactId: formData.contactId || "",
      });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formState.contactId && typeof onEditHandler === "function") {
      onEditHandler(formState);
    }
  };

  const fields = [
    { label: "Name", name: "name" },
    { label: "Primary Contact Number", name: "econtactNo1" },
    { label: "Secondary Contact Number", name: "econtactNo2" },
    { label: "Emergency Contact Type", name: "emergencyContactType" },
    { label: "Address", name: "address" },
    { label: "State", name: "state" },
    { label: "City", name: "city" },
    { label: "Pin Code", name: "pin" },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">
          Update Emergency Contact
        </h2>

        <div className="grid gap-5">
          {fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              value={formState[field.name]}
              onChange={handleInputChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              size="lg"
            />
          ))}

          <div className="flex justify-center mt-5">
            <Button className="max-w-sm" type="button" onClick={handleSubmit} size="lg">
              Update
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEmergencyDetailsModal;
