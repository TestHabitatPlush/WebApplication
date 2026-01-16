"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";

const ViewStaffModal = ({ onClose, onAddStaff, staffData, isView }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    memberType: "Staff",
  });

  useEffect(() => {
    if (staffData) {
      setFormData({
        firstName: staffData.firstName || "",
        lastName: staffData.lastName || "",
        phone: staffData.mobileNumber || "",
        email: staffData.email || "",
        memberType: staffData.memberType || "Staff",
      });
    }
  }, [staffData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isView) {
      onAddStaff(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-5 bg-white rounded-lg">
        <h2 className="mb-4 text-xl font-bold">
          {isView ? "View Staff" : "Add New Staff"}
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isView}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isView}
            required
          />
          {!isView && (
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" onClick={onClose} className="bg-gray-300">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500">
                Add Staff
              </Button>
            </div>
          )}
          {isView && (
            <div className="flex justify-end mt-4">
              <Button type="button" onClick={onClose} className="bg-blue-500">
                Close
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ViewStaffModal;
