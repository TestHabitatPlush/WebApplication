import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

const UpdateVehicleDetailsModal = ({
  isOpen,
  onClose,
  formData,
  handleEditParking, // keep name if parent expects it
}) => {
  const [vehicleForm, setVehicleForm] = useState({});

  useEffect(() => {
    setVehicleForm(formData || {});
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setVehicleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 bg-gray-100 border rounded-lg">
        <div className="flex flex-col gap-5">

          <Input
            label="Owner Name"
            name="ownerName"
            value={vehicleForm.ownerName || ""}
            onChange={handleInput}
            size="lg"
          />

          <Input
            label="Owner Contact"
            name="ownerContact"
            value={vehicleForm.ownerContact || ""}
            onChange={handleInput}
            size="lg"
          />

          <Input
            label="Vehicle Type"
            name="vehicleType"
            value={vehicleForm.vehicleType || ""}
            onChange={handleInput}
            size="lg"
          />

          <Input
            label="Vehicle Number"
            name="vehicleNumber"
            value={vehicleForm.vehicleNumber || ""}
            onChange={handleInput}
            size="lg"
          />

          <Input
            label="Fastag Number"
            name="fastagNumber"
            value={vehicleForm.fastagNumber || ""}
            onChange={handleInput}
            size="lg"
          />

          <div className="flex justify-center mt-6">
            <Button
              size="lg"
              className="max-w-sm"
              onClick={() => {
                handleEditParking(vehicleForm); // sends updated vehicle
                onClose();
              }}
            >
              Update Vehicle
            </Button>
          </div>

        </div>
      </div>
    </Dialog>
  );
};

export default UpdateVehicleDetailsModal;
