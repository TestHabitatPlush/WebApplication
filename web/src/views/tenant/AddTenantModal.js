import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

const AddTenantModal = ({ onClose, onAddTenant }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    memberType: "Tenant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTenant(formData);
    toast.success("Tenant added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-5 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">Add New Tenant</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" onClick={onClose} className="bg-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500">
              Add Tenant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTenantModal;
