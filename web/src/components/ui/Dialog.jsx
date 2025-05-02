import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Dialog = ({ open, onOpenChange, children }) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
};

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({ className, children }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <DialogPrimitive.Content
        className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-[90%] max-w-md ${className}`}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-3 right-3">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export const DialogHeader = ({ children }) => {
  return <div className="mb-4 text-lg font-semibold">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-xl font-bold">{children}</h2>;
};
