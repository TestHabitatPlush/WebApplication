// components/AddMemberModal.js
import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import MemberHandler from "@/handlers/MemberHandler";

const roleOptions = [
  { label: "Society Owner Family", value: "society_owner_family" },
  { label: "Society Tenant", value: "society_tenant" },
  { label: "Society Tenant Family", value: "society_tenant_family" },
];

const AddMemberModal = ({ onClose, refreshMembers }) => {
  const { createMemberHandler } = MemberHandler();

  const [formData, setFormData] = useState({
    salutation: "Mr",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    alternateNumber: "",
    email: "",
    roleCategory: "society_tenant_family",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAddressValid = Object.values(formData.address).every((val) => val.trim() !== "");
    if (!isAddressValid) {
      toast.error("Please fill in all address fields.");
      return;
    }

    const res = await createMemberHandler(formData);
    if (res?.status === 201) {
      onClose();
      refreshMembers?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white shadow-2xl rounded-xl animate-fade-in">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add New Member</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required />
          <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required />
          <Input name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
          <Input name="mobileNumber" label="Phone" value={formData.mobileNumber} onChange={handleChange} required />
          <Input name="alternateNumber" label="Alternate Number" value={formData.alternateNumber} onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Role Category</label>
            <select
              name="roleCategory"
              value={formData.roleCategory}
              onChange={handleChange}
              className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Input name="street" label="Street" value={formData.address.street} onChange={handleChange} required />
          <Input name="city" label="City" value={formData.address.city} onChange={handleChange} required />
          <Input name="state" label="State" value={formData.address.state} onChange={handleChange} required />
          <Input name="country" label="Country" value={formData.address.country} onChange={handleChange} required />
          <Input name="zipCode" label="Zip Code" value={formData.address.zipCode} onChange={handleChange} required />

          <div className="flex justify-end col-span-1 gap-3 mt-6 md:col-span-2">
            <Button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
              Cancel
            </Button>
            <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-700">
              Add Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
