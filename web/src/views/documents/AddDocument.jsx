


"use client";
import { useState, useRef } from "react";
import Button from "@/components/ui/Button";
import DocumentHandler from "@/handlers/DocumentHandler";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";

const visibilityOptions = [
  { label: "Owner", value: "owner" },
  { label: "Tenant", value: "tenant" },
  { label: "Primary Member", value: "primary" },
  { label: "All", value: "all" },
];

const AddDocument = () => {
   const { createDocumentByUserHandler } = DocumentHandler();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    documentName: "",
    visibilityOption: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [documentPreview, setDocumentPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        document: "File size must be less than 2MB",
      }));
      return;
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        document: "Unsupported file type",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, document: null }));
    setDocumentPreview(file.name);
    setForm((prev) => ({ ...prev, document: file }));
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!form.documentName.trim()) tempErrors.documentName = "Document name is required.";
    if (!form.document) tempErrors.document = "Document file is required.";
    if (!form.visibilityOption) tempErrors.visibilityOption = "Please select a visibility option.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

const handleUpload = async () => {
  if (!validateFields()) return;

  try {
    setIsSubmitting(true);
    const res = await createDocumentByUserHandler(form);

    if (res?.status === 201) {
      toast.success("Document uploaded successfully!");
      setForm({ documentName: "", visibilityOption: "", document: null });
      setDocumentPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  } catch (error) {
    toast.error("Upload failed. Please try again.");
    console.error("Upload error:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="px-5">
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Document Name & File Upload */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block mb-1 font-semibold">Document Name</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                name="documentName"
                value={form.documentName}
                onChange={handleChange}
                placeholder="Enter document name"
                className={`flex-grow border p-2 rounded ${
                  errors.documentName ? "border-red-500" : "border-gray-300"
                }`}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="w-auto text-sm file:bg-turquoise file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
                accept=".pdf,.doc,.docx,image/*"
              />
            </div>
            {errors.documentName && <p className="mt-1 text-sm text-red-500">{errors.documentName}</p>}
            {errors.document && <p className="mt-1 text-sm text-red-500">{errors.document}</p>}
          </div>

          {/* Preview & Cancel */}
          {documentPreview && (
            <div className="flex items-center col-span-1 gap-2 mt-2 sm:col-span-2">
              <span className="text-sm truncate max-w-[180px]">{documentPreview}</span>
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

        {/* Visibility Options */}
        <div className="mt-6 font-sans text-lg font-semibold text-gray-700">
          Applicable For <span className="text-red-500">*</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 py-2 my-2">
          {visibilityOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="visibilityOption"
                value={option.value}
                checked={form.visibilityOption === option.value}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <label className="cursor-pointer">{option.label}</label>
            </div>
          ))}
        </div>
        {errors.visibilityOption && <p className="text-sm text-red-500">{errors.visibilityOption}</p>}

        {/* Submit */}
        <div className="flex justify-center mt-5">
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