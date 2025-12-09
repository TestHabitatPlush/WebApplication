// "use client";

// import { useEffect, useState, useRef } from "react";
// import Button from "@/components/ui/Button";
// import DocumentHandler from "@/handlers/DocumentHandler";
// import UserGroupHandler from "@/handlers/UseGroupHandler";
// import { MdOutlineCancel } from "react-icons/md";
// import toast from "react-hot-toast";

// const AddDocument = () => {
//   const { createDocumentByUserHandler } = DocumentHandler();
//   const { getUserGroupHandler } = UserGroupHandler();
//   const fileInputRef = useRef(null);

//   const [form, setForm] = useState({
//     documentName: "",
//     userGroupId: "",
//     document: null,
//   });

//   const [userGroups, setUserGroups] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [documentPreview, setDocumentPreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedGroupId, setSelectedGroupId] = useState(null);

//   const roleCategoryMapping = {
//     resident: "Resident",
//     tenant: "Tenant",
//     primaryContact: "Primary Contact",
//     all: "All",
//   };

//   useEffect(() => {
//     const fetchUserGroup = async () => {
//       try {
//         const result = await getUserGroupHandler();
//         const data = result?.data?.data;

//         if (Array.isArray(data)) {
//           const mapped = data.map((el) => ({
//             label: roleCategoryMapping[el.userGroupName],
//             value: el.userGroupId,
//           }));
//           setUserGroups(mapped);
//         } else {
//           toast.error("Invalid user group data.");
//         }
//       } catch (error) {
//         console.error("Error loading user groups:", error);
//         toast.error("Failed to load user groups.");
//       }
//     };

//     fetchUserGroup();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleRadioChange = (groupId) => {
//     setSelectedGroupId(groupId);
//     setForm((prev) => ({ ...prev, userGroupId: groupId }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (file.size > 3 * 1024 * 1024) {
//       setErrors((prev) => ({ ...prev, document: "File size must be less than 2MB" }));
//       return;
//     }

//     const validTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "image/jpeg",
//       "image/png",
//     ];

//     if (!validTypes.includes(file.type)) {
//       setErrors((prev) => ({ ...prev, document: "Unsupported file type" }));
//       return;
//     }

//     setErrors((prev) => ({ ...prev, document: null }));
//     setDocumentPreview(file.name);
//     setForm((prev) => ({ ...prev, document: file }));
//   };

//   const validateFields = () => {
//     const tempErrors = {};
//     if (!form.documentName.trim()) tempErrors.documentName = "Document name is required.";
//     if (!form.document) tempErrors.document = "Document file is required.";
//     if (!selectedGroupId) tempErrors.userGroupId = "Please select a user group.";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleUpload = async () => {
//     if (!validateFields()) return;

//     try {
//       setIsSubmitting(true);
//       await createDocumentByUserHandler(form);
//       toast.success("Document uploaded successfully!");

//       setForm({ documentName: "", userGroupId: "", document: null });
//       setSelectedGroupId(null);
//       setDocumentPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";
//     } catch (error) {
//       toast.error("Upload failed. Please try again.");
//       console.error("Upload error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="px-5">
//       <div className="p-10 my-5 border rounded-lg bg-gray-100">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="col-span-1 sm:col-span-2">
//             <label className="block font-semibold mb-1">Document Name</label>
//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 name="documentName"
//                 value={form.documentName}
//                 onChange={handleChange}
//                 placeholder="Enter document name"
//                 className={`flex-grow border p-2 rounded ${
//                   errors.documentName ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="w-auto text-sm file:bg-turquoise file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
//                 accept=".pdf,.doc,.docx,image/*"
//               />
//             </div>
//             {errors.documentName && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentName}</p>
//             )}
//             {errors.document && (
//               <p className="text-red-500 text-sm mt-1">{errors.document}</p>
//             )}
//           </div>

//           {documentPreview && (
//             <div className="col-span-1 sm:col-span-2 mt-2 flex items-center gap-2">
//               <span className="text-sm truncate max-w-[180px]">{documentPreview}</span>
//               <MdOutlineCancel
//                 className="text-red-500 cursor-pointer"
//                 onClick={() => {
//                   setForm((prev) => ({ ...prev, document: null }));
//                   setDocumentPreview(null);
//                   if (fileInputRef.current) fileInputRef.current.value = "";
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div className="mt-6 font-sans text-lg font-semibold text-gray-700">
//           Applicable For <span className="text-red-500">*</span>
//         </div>
//         <div className="flex flex-wrap items-center gap-4 py-2 my-2">
//           {userGroups.length > 0 ? (
//             userGroups.map((group) => (
//               <div key={group.value} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="userGroupId"
//                   value={group.value}
//                   checked={selectedGroupId === group.value}
//                   onChange={() => handleRadioChange(group.value)}
//                   className="cursor-pointer"
//                 />
//                 <label className="cursor-pointer">{group.label}</label>
//               </div>
//             ))
//           ) : (
//             <div>No user groups available</div>
//           )}
//         </div>

//         {errors.userGroupId && (
//           <p className="text-red-500 text-sm">{errors.userGroupId}</p>
//         )}

//         <div className="flex justify-center mt-5">
//           <Button
//             className="max-w-sm"
//             type="button"
//             size="lg"
//             onClick={handleUpload}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Uploading..." : "Submit"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDocument;



// "use client";

// import { useState, useRef } from "react";
// import Button from "@/components/ui/Button";
// import DocumentHandler from "@/handlers/DocumentHandler";
// import { MdOutlineCancel } from "react-icons/md";
// import toast from "react-hot-toast";

// const AddDocument = ({ onUploadSuccess }) => {
//   const { createDocumentByUserHandler } = DocumentHandler();
//   const fileInputRef = useRef(null);

//   const [form, setForm] = useState({
//     documentName: "",
//     document: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [documentPreview, setDocumentPreview] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       setErrors((prev) => ({ ...prev, document: "File size must be less than 2MB" }));
//       return;
//     }

//     const validTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "image/jpeg",
//       "image/png",
//     ];
//     if (!validTypes.includes(file.type)) {
//       setErrors((prev) => ({ ...prev, document: "Unsupported file type" }));
//       return;
//     }

//     setErrors((prev) => ({ ...prev, document: null }));
//     setDocumentPreview(file.name);
//     setForm((prev) => ({ ...prev, document: file }));
//   };

//   const validateFields = () => {
//     let tempErrors = {};
//     if (!form.documentName.trim()) tempErrors.documentName = "Document name is required.";
//     if (!form.document) tempErrors.document = "Document file is required.";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleUpload = async () => {
//     if (!validateFields()) return;

//     try {
//       setIsSubmitting(true);
//       await createDocumentByUserHandler(form);

//       toast.success("Document uploaded successfully!");

//       setForm({ documentName: "", document: null });
//       setDocumentPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       if (onUploadSuccess) onUploadSuccess(); // 🔁 Trigger refresh
//     } catch (error) {
//       toast.error("Upload failed. Please try again.");
//       console.error("Upload error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="px-5">
//       <div className="p-10 my-5 border rounded-lg bg-gray-100">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="col-span-1 sm:col-span-2">
//             <label className="block font-semibold mb-1">Document Name</label>
//             <div className="flex items-center gap-3">
//               <input
//                 type="text"
//                 name="documentName"
//                 value={form.documentName}
//                 onChange={handleChange}
//                 placeholder="Enter document name"
//                 className={`flex-grow border p-2 rounded ${
//                   errors.documentName ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="w-auto text-sm file:bg-turquoise file:text-white file:border-0 file:px-4 file:py-2 file:rounded file:cursor-pointer"
//                 accept=".pdf,.doc,.docx,image/*"
//               />
//             </div>
//             {errors.documentName && <p className="text-red-500 text-sm mt-1">{errors.documentName}</p>}
//             {errors.document && <p className="text-red-500 text-sm mt-1">{errors.document}</p>}
//           </div>

//           {documentPreview && (
//             <div className="col-span-1 sm:col-span-2 mt-2 flex items-center gap-2">
//               <span className="text-sm truncate max-w-[180px]">{documentPreview}</span>
//               <MdOutlineCancel
//                 className="text-red-500 cursor-pointer"
//                 onClick={() => {
//                   setForm((prev) => ({ ...prev, document: null }));
//                   setDocumentPreview(null);
//                   if (fileInputRef.current) fileInputRef.current.value = "";
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-center mt-5">
//           <Button
//             className="max-w-sm"
//             type="button"
//             size="lg"
//             onClick={handleUpload}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Uploading..." : "Submit"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDocument;


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