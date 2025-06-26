import React from "react";
import Dialog from "../ui/Dialog";
import Button from "../ui/Button";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Confirm Delete</h2>
        <p className="mt-2 text-gray-700">
          Are you sure you want to delete this gate user?
        </p>
        <div className="flex justify-end mt-4 space-x-4">
          <Button onClick={onClose} className="text-black bg-gray-300 hover:bg-gray-400">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="text-white bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
