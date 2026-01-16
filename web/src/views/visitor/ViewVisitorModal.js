"use client";

import React from "react";
import Button from "@/components/ui/Button";

const ViewVisitorModal = ({ visitor, onClose }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="mb-4 text-lg font-bold">Visitor Details</h3>

        <p><b>Name:</b> {visitor.visit_name}</p>
        <p><b>Phone:</b> {visitor.visit_mobileno}</p>
        <p><b>Purpose:</b> {visitor.visit_purpose}</p>
        <p><b>Address:</b> {visitor.visit_location}</p>

        <div className="mt-4 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewVisitorModal;
