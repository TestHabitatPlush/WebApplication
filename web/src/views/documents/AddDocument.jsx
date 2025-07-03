"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import DocumentHandler from "@/handlers/DocumentHandler";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";

const AddDocument = ({ onUploadSuccess }) => {
  const { createDocumentByUserHandler } = DocumentHandler();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    documentName: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [documentPreview, setDocumentPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fieldName = e.target.name;

    const sizeLimit = 2 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (file.size > sizeLimit) {
      setErrors((prev) => ({ ...prev, [fieldName]: "File size must be less than 2MB" }));
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [fieldName]: "Unsupported file type" }));
      return;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: null }));
    setForm((prev) => ({ ...prev, [fieldName]: file }));
    if (fieldName === "document") setDocumentPreview(file.name);
  };

  const validateFields = () => {
    const tempErrors = {};
    if (!form.documentName.trim()) tempErrors.documentName = "Document name is required.";
    if (!form.document) tempErrors.document = "Document file is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpload = async () => {
    if (!validateFields()) return;

    try {
      setIsSubmitting(true);
      await createDocumentByUserHandler(form);

      toast.success("Document uploaded successfully!");
      setForm({ documentName: "", document: null, picture: null });
      setDocumentPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      onUploadSuccess?.(); 
    } catch (err) {
      toast.error("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-5">
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Document Name */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block mb-1 font-semibold">Document Name</label>
            <input
              type="text"
              name="documentName"
              value={form.documentName}
              onChange={handleChange}
              placeholder="Enter document name"
              className={`w-full border p-2 rounded ${
                errors.documentName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.documentName && <p className="mt-1 text-sm text-red-500">{errors.documentName}</p>}
          </div>

          {/* Document File Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block mb-1 font-semibold">Upload Document</label>
            <input
              type="file"
              name="document"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full file:bg-turquoise file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
              accept=".pdf,.doc,.docx,image/*"
            />
            {errors.document && <p className="mt-1 text-sm text-red-500">{errors.document}</p>}
          </div>

          {/* Optional Preview */}
          {documentPreview && (
            <div className="flex items-center col-span-1 gap-2 mt-2 sm:col-span-2">
              <span className="text-sm truncate max-w-[200px]">{documentPreview}</span>
              <MdOutlineCancel
                className="text-red-500 cursor-pointer"
                onClick={() => {
                  setForm((prev) => ({ ...prev, document: null }));
                  setDocumentPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="max-w-sm"
            type="button"
            size="lg"
            onClick={handleUpload}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddDocument;