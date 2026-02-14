import React from "react";
import { IoClose } from "react-icons/io5";
import ResidentForm from "../adduser/components/resident/ResidentForm";

const UpdateUserModal = ({ isOpen, onClose, userData, refreshList }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      
      {/* MODAL */}
      <div className="bg-white w-[95%] max-w-7xl h-[90vh] rounded-lg shadow-lg flex flex-col">
        
        {/* HEADER (FIXED) */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-xl font-semibold text-lime">
            Edit Resident User
          </h2>
          <IoClose
            size={24}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <ResidentForm
            mode="edit"
            editData={userData}
            onSuccess={() => {
              onClose();
              refreshList && refreshList();
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default UpdateUserModal;
