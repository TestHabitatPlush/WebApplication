


// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import DocumentHandler from '@/handlers/DocumentHandler';
// import { FaFilePdf, FaFileImage, FaTrashAlt } from 'react-icons/fa';
// import { FiEye, FiDownload, FiFile, FiFileText } from 'react-icons/fi';
// import ReusableTable from '@/components/shared/ReusableTable';
// import ViewDocumentModal from '@/views/documents/ViewDocumentModal';
// import Button from '@/components/ui/Button';

// const visibilityOptions = [
//   { value: "", label: "All Groups" },
//   { value: "owner", label: "Owner" },
//   { value: "tenant", label: "Tenant" },
//   { value: "primary", label: "Primary Member" },
//   { value: "all", label: "All" },
// ];

// const DocumentList = () => {
//   const [visibilityFilter, setVisibilityFilter] = useState("");
//   const [documents, setDocuments] = useState([]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [isViewOpen, setIsViewOpen] = useState(false);

//   const {
//     getAllDocumentsForResidentHandler,
//     deleteDocumentHandler,
//   } = DocumentHandler();

//   const fetchDocuments = async () => {
//     setLoading(true);
//     try {
//       const docs = await getAllDocumentsForResidentHandler();
//       setDocuments(docs);
//       setPageIndex(0);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const pagedDocs = useMemo(() => {
//     const reversed = [...documents].reverse();
//     const start = pageIndex * pageSize;
//     return reversed.slice(start, start + pageSize);
//   }, [pageIndex, pageSize, documents]);

//   const totalPages = Math.ceil(documents.length / pageSize);

//   const handleDelete = async (documentId) => {
//     if (window.confirm('Are you sure you want to delete this document?')) {
//       const res = await deleteDocumentHandler(documentId);
//       if (res?.status === 200) {
//         await fetchDocuments();
//       }
//     }
//   };

//   const handleDownload = async (relativeUrl) => {
//     try {
//       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//       const url = relativeUrl.startsWith("http")
//         ? relativeUrl
//         : `${baseUrl}/${relativeUrl}`;

//       const response = await fetch(url);
//       if (!response.ok) throw new Error("Network response was not ok");

//       const blob = await response.blob();
//       const contentDisposition = response.headers.get("Content-Disposition");

//       let fileName = "document";
//       if (contentDisposition && contentDisposition.includes("filename=")) {
//         const match = contentDisposition.match(
//           /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
//         );
//         if (match && match[1]) {
//           fileName = match[1].replace(/['"]/g, "");
//         }
//       } else {
//         fileName = url.split("/").pop()?.split("?")[0] || "document";
//       }

//       const blobUrl = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (error) {
//       const fallbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${relativeUrl}`;
//       const link = document.createElement("a");
//       link.href = fallbackUrl;
//       link.setAttribute("download", "");
//       link.setAttribute("target", "_blank");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     }
//   };

//   const handleView = (doc) => {
//     setSelectedDoc(doc);
//     setIsViewOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedDoc(null);
//     setIsViewOpen(false);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: 'S.No',
//         Cell: ({ row }) =>
//           documents.length - (pageIndex * pageSize + row.index),
//         className: 'text-center',
//       },
//       {
//         Header: 'Document Name',
//         accessor: 'documentName',
//         className: 'text-left',
//       },
//       {
//         Header: 'Document Type',
//         accessor: 'document',
//         Cell: ({ value }) => {
//           const filePath = value || '';
//           const fileName = filePath.split(/[/\\]/).pop();
//           const extension = fileName?.split('.').pop()?.toLowerCase();

//           const iconMap = {
//             pdf: <FaFilePdf className="text-red-600 mr-1" />,
//             png: <FaFileImage className="text-blue-500 mr-1" />,
//             jpg: <FaFileImage className="text-blue-500 mr-1" />,
//             jpeg: <FaFileImage className="text-blue-500 mr-1" />,
//             txt: <FiFileText className="text-gray-600 mr-1" />,
//             doc: <FiFileText className="text-indigo-600 mr-1" />,
//             docx: <FiFileText className="text-indigo-600 mr-1" />,
//           };

//           return (
//             <span className="flex items-center text-sm">
//               {iconMap[extension] || <FiFile className="text-gray-400 mr-1" />}
//               {extension ? `.${extension}` : '—'}
//             </span>
//           );
//         },
//         className: 'text-left',
//       },
//       {
//         Header: "Applicable For",
//         accessor: "roleCategories",
//         Cell: ({ value }) => {
//           if (!Array.isArray(value) || value.length === 0) return "All";

//           const labelMap = {
//             society_owner: "Owner",
//             society_owner_family: "Owner",
//             society_tenant: "Tenant",
//             society_tenant_family: "Tenant",
//             primary_member: "Primary Member",
//           };

//           const allRoles = [
//             "society_owner",
//             "society_owner_family",
//             "society_tenant",
//             "society_tenant_family",
//           ];

//           const isAll =
//             allRoles.every((role) => value.includes(role)) &&
//             value.length === allRoles.length;

//           if (isAll) return "All";

//           return [...new Set(value.map((v) => labelMap[v] || v))].join(", ");
//         },
//         className: "text-left",
//       },
//       {
//         Header: 'Uploaded On',
//         accessor: 'createdAt',
//         Cell: ({ value }) => new Date(value).toLocaleDateString(),
//         className: 'text-center',
//       },
//       {
//         Header: 'Actions',
//         Cell: ({ row }) => (
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => handleView(row.original)}
//               className="p-1 rounded hover:bg-blue-50 text-blue-600 transition"
//               title="View"
//             >
//               <FiEye size={18} />
//             </button>
//             <button
//               onClick={() => handleDownload(row.original.document)}
//               className="p-1 rounded hover:bg-green-50 text-green-600 transition"
//               title="Download"
//             >
//               <FiDownload size={18} />
//             </button>
//             <button
//               onClick={() => handleDelete(row.original.documentId)}
//               className="p-1 rounded hover:bg-red-50 text-red-600 transition"
//               title="Delete"
//             >
//               <FaTrashAlt size={16} />
//             </button>
//           </div>
//         ),
//         className: 'text-left',
//       },
//     ],
//     [pageIndex, pageSize, documents]
//   );

//   const activeGroupName =
//     visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label || "";

//   return (
//     <div className="relative px-4 py-3">
//       <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
//         <div className="font-semibold text-gray-700 text-lg">
//           TOTAL {documents.length} DOCUMENTS
//         </div>

//         <div className="flex items-center gap-3">
//           <Button onClick={fetchDocuments}>Refresh</Button>

//           <select
//             value={visibilityFilter}
//             onChange={(e) => setVisibilityFilter(e.target.value)}
//             className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
//           >
//             {visibilityOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {visibilityFilter && (
//         <div className="mt-2 text-sm text-gray-500">
//           Showing documents for:{" "}
//           <span className="font-semibold text-gray-700">
//             {activeGroupName}
//           </span>
//         </div>
//       )}

//       <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
//         <ReusableTable
//           columns={columns}
//           data={pagedDocs}
//           pageIndex={pageIndex}
//           pageSize={pageSize}
//           totalCount={documents.length}
//           totalPages={totalPages}
//           setPageIndex={setPageIndex}
//           setPageSize={setPageSize}
//           loading={loading}
//         />
//       </div>

//       <ViewDocumentModal
//         isOpen={isViewOpen}
//         onClose={closeModal}
//         formData={selectedDoc}
//       />
//     </div>
//   );
// };

// export default DocumentList;


'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import DocumentHandler from '@/handlers/DocumentHandler';
import { FaFilePdf, FaFileImage, FaTrashAlt } from 'react-icons/fa';
import { FiEye, FiDownload, FiFile, FiFileText } from 'react-icons/fi';
import ReusableTable from '@/components/shared/ReusableTable';
import ViewDocumentModal from './ViewDocumentModal';
import Dialog from '@/components/ui/Dialog';
import toast from 'react-hot-toast';

const visibilityOptions = [
  { value: "", label: "All Groups" },
  { value: "owner", label: "Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "primary", label: "Primary Member" },
  { value: "all", label: "All" },
];
const VISIBILITY_ROLE_MAP = {
  owner: ["society_owner", "society_owner_family"],
  tenant: ["society_tenant", "society_tenant_family"],
  primary: ["primary_member"],
  all: [
    "society_owner",
    "society_owner_family",
    "society_tenant",
    "society_tenant_family",
  ],
};

const DocumentList = () => {
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [documents, setDocuments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const { getDocumentByUserHandler, deleteDocumentHandler } = DocumentHandler();

  const toggleViewDocumentDetailModal = () => {
    setViewModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        let userDocs = await getDocumentByUserHandler();

        let allDocs = [...(userDocs?.documents || [])];

        if (visibilityFilter && VISIBILITY_ROLE_MAP[visibilityFilter]) {
          allDocs = allDocs.filter((doc) => {
            if (!doc.roleCategories) return false;

            let roles = doc.roleCategories;

            // 🔑 Parse if string
            if (typeof roles === "string") {
              try {
                roles = JSON.parse(roles);
              } catch {
                return false;
              }
            }

            return roles.some((role) =>
              VISIBILITY_ROLE_MAP[visibilityFilter].includes(role)
            );
          });
        }

        setDocuments(allDocs);
        setPageIndex(0);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [visibilityFilter, pageSize]);

  const pagedDocs = useMemo(() => {
    const reversed = [...documents].reverse();
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [pageIndex, pageSize, documents]);

  const totalPages = Math.ceil(documents.length / pageSize);

  const handleDelete = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      const res = await deleteDocumentHandler(documentId);
      if (res?.status === 200) {
        setDocuments((prevDocs) =>
          prevDocs.filter((doc) => doc.documentId !== documentId)
        );
      }
    }
  };

  const onViewHandler = (doc) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fullDocUrl = `${baseUrl}/${doc.document}`;
    setShowViewFormData({ ...doc, documentUrl: fullDocUrl });
    setViewModal(true);
  };

  const handleDownload = async (relativeUrl) => {
    try {
      const baseUrl = process.env.REACT_APP_PUBLIC_BASE_URL;
      const url = relativeUrl.startsWith("http")
        ? relativeUrl
        : `${baseUrl}/${relativeUrl}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");

      let fileName = "document";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (match && match[1]) {
          fileName = match[1].replace(/['"]/g, "");
        }
      } else {
        fileName = url.split("/").pop()?.split("?")[0] || "document";
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.warn("Download fallback:", error);
      const fallbackUrl = `${process.env.REACT_APP_PUBLIC_BASE_URL}/${relativeUrl}`;
      const link = document.createElement("a");
      link.href = fallbackUrl;
      link.setAttribute("download", "");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) =>
          documents.length - (pageIndex * pageSize + row.index),
        className: "text-center",
      },
      {
        Header: "Document Name",
        accessor: "documentName",
        className: "text-left",
      },
      {
        Header: "Document Type",
        accessor: "document",
        Cell: ({ value }) => {
          const filePath = value || "";
          const fileName = filePath.split(/[/\\]/).pop();
          const extension = fileName?.split(".").pop()?.toLowerCase();

          const iconMap = {
            pdf: <FaFilePdf className="inline mr-1 text-red-600" />,
            png: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpg: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpeg: <FaFileImage className="inline mr-1 text-blue-500" />,
            txt: <FiFileText className="inline mr-1 text-gray-600" />,
            doc: <FiFileText className="inline mr-1 text-indigo-600" />,
            docx: <FiFileText className="inline mr-1 text-indigo-600" />,
          };

          const icon = iconMap[extension] || (
            <FiFile className="inline mr-1 text-gray-400" />
          );
          const displayExt = extension ? `.${extension}` : "—";

          return (
            <span className="flex items-center">
              {icon} {displayExt}
            </span>
          );
        },
        className: "text-left",
      },

      {
        Header: "Applicable For",
        accessor: "roleCategories",
        Cell: ({ value }) => {
          if (!value) return "All";

          let roles = value;

          if (typeof roles === "string") {
            try {
              roles = JSON.parse(roles);
            } catch {
              return "All";
            }
          }

          if (!Array.isArray(roles) || roles.length === 0) return "All";

          const labelMap = {
            society_owner: "Owner",
            society_owner_family: "Owner",
            society_tenant: "Tenant",
            society_tenant_family: "Tenant",
            primary_member: "Primary Member",
          };

          const allRoles = [
            "society_owner",
            "society_owner_family",
            "society_tenant",
            "society_tenant_family",
          ];

          const isAll =
            allRoles.every((r) => roles.includes(r)) &&
            roles.length === allRoles.length;

          if (isAll) return "All";

          const uniqueLabels = [...new Set(roles.map((r) => labelMap[r] || r))];
          return uniqueLabels.join(", ");
        },

        className: "text-left",
      },
      {
        Header: "Uploaded On",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        className: "text-center",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              title="View"
              className="text-orange-600 hover:text-orange-800"
              onClick={() => onViewHandler(row.original)}
            >
              <FiEye size={18} />
            </button>
            <button
              onClick={() => handleDownload(row.original.document)}
              title="Download"
              className="text-green-600 hover:text-green-800"
            >
              <FiDownload size={18} />
            </button>
            <button
              onClick={() => handleDelete(row.original.documentId)}
              title="Delete"
              className="text-red-600 hover:text-red-800"
            >
              <FaTrashAlt size={16} />
            </button>
          </div>
        ),
        className: "text-left",
      },
    ],
    [pageIndex, pageSize, documents]
  );

  const activeGroupName =
    visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label ||
    "";

  return (
    <div className="relative px-4 py-6">
      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-medium text-gray-700">
          TOTAL {documents.length} DOCUMENTS
        </div>
        <div>
          <select
            name="visibilityOption"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="px-3 py-2 text-sm uppercase border border-gray-300 rounded-md"
          >
            {visibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visibilityFilter && (
        <div className="mt-2 text-sm text-gray-600">
          Showing documents for:{" "}
          <span className="font-semibold">{activeGroupName}</span>
        </div>
      )}

      {viewModal && (
        <ViewDocumentModal
          isOpen={viewModal}
          onClose={toggleViewDocumentDetailModal}
          formData={showViewFormData}
        />
      )}

      <div className="mt-6 overflow-x-auto">
        <ReusableTable
          columns={columns}
          data={pagedDocs}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={documents.length}
          totalPages={totalPages}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DocumentList;
