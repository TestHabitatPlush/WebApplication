import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import Select from "../../../../components/ui/Select";

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
    contactId: "",
  });

  useEffect(() => {
    if (formData) {

      const normalizeType = (val) => {
        if (!val) return "";
        return val.toString().toLowerCase();
      };

      setFormState({
        name: formData.name || "",
        econtactNo1: formData.econtactNo1 || "",
        econtactNo2: formData.econtactNo2 || "",
        emergencyContactType: normalizeType(
          formData.emergencyContactType
        ),
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

  const handleSelectChange = (value) => {
    setFormState((prev) => ({
      ...prev,
      emergencyContactType: value,
    }));
  };

  const handleSubmit = () => {
    if (formState.contactId && typeof onEditHandler === "function") {
      onEditHandler(formState);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full bg-white lg:max-w-4xl rounded-lg 
      max-h-[85vh] overflow-y-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">
          Update Emergency Contact
        </h2>

        <div className="grid gap-5">

          <Input
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            size="lg"
          />

          <Input
            label="Primary Contact Number"
            name="econtactNo1"
            value={formState.econtactNo1}
            onChange={handleInputChange}
            placeholder="Enter primary contact number"
            size="lg"
          />

          <Input
            label="Secondary Contact Number"
            name="econtactNo2"
            value={formState.econtactNo2}
            onChange={handleInputChange}
            placeholder="Enter secondary contact number"
            size="lg"
          />

          {/* ✅ Select with stored value pre-selected */}
         <Select
  label="Emergency Contact Type"
  name="emergencyContactType"
  value={formState.emergencyContactType}
  onChange={(e) =>
    setFormState((prev) => ({
      ...prev,
      emergencyContactType: e.target.value,
    }))
  }
  size="lg"
  placeholder="Select emergency contact type"
  options={[
    { label: "Hospital", value: "hospital" },
    { label: "Police", value: "police" },
    { label: "Fire", value: "fire" },
    { label: "Ambulance", value: "ambulance" },
    { label: "Others", value: "others" },
  ]}
/>


          <Input
            label="Address"
            name="address"
            value={formState.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            size="lg"
          />

          <Input
            label="State"
            name="state"
            value={formState.state}
            onChange={handleInputChange}
            placeholder="Enter state"
            size="lg"
          />

          <Input
            label="City"
            name="city"
            value={formState.city}
            onChange={handleInputChange}
            placeholder="Enter city"
            size="lg"
          />

          <Input
            label="Pin Code"
            name="pin"
            value={formState.pin}
            onChange={handleInputChange}
            placeholder="Enter pin code"
            size="lg"
          />

          <div className="flex justify-center mt-5">
            <Button
              className="max-w-sm"
              type="button"
              onClick={handleSubmit}
              size="lg"
            >
              Update
            </Button>
          </div>

        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEmergencyDetailsModal;
