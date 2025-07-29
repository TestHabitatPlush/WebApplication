'use client';

import React, { useEffect, useMemo, useState } from 'react';
import DocumentHandler from '@/handlers/DocumentHandler';
import { FaFilePdf, FaFileImage, FaTrashAlt } from 'react-icons/fa';
import { FiEye, FiDownload, FiFile, FiFileText } from 'react-icons/fi';
import ReusableTable from '@/components/shared/ReusableTable';
import ViewDocumentModal from '@/views/documents/ViewDocumentModal';
import Button from '@/components/ui/Button';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const { getDocumentByUserHandler, deleteDocumentHandler } = DocumentHandler();

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const docs = await getDocumentByUserHandler();
      setDocuments(docs || []);
      setPageIndex(0);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const pagedDocs = useMemo(() => {
    const reversed = [...documents].reverse();
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [pageIndex, pageSize, documents]);

  const totalPages = Math.ceil(documents.length / pageSize);

  const handleDelete = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const res = await deleteDocumentHandler(documentId);
      if (res?.status === 200) {
        await fetchDocuments();
      }
    }
  };

   const handleDownload = async (relativeUrl) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
      const fallbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${relativeUrl}`;
      const link = document.createElement("a");
      link.href = fallbackUrl;
      link.setAttribute("download", "");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setIsViewOpen(true);
  };

  const closeModal = () => {
    setSelectedDoc(null);
    setIsViewOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'S.No',
        Cell: ({ row }) => documents.length - (pageIndex * pageSize + row.index),
        className: 'text-center',
      },
      {
        Header: 'Document Name',
        accessor: 'documentName',
        className: 'text-left',
      },
      {
        Header: 'Document Type',
        accessor: 'document',
        Cell: ({ value }) => {
          const filePath = value || '';
          const fileName = filePath.split(/[/\\]/).pop();
          const extension = fileName?.split('.').pop()?.toLowerCase();

          const iconMap = {
            pdf: <FaFilePdf className="inline mr-1 text-red-600" />,
            png: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpg: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpeg: <FaFileImage className="inline mr-1 text-blue-500" />,
            txt: <FiFileText className="inline mr-1 text-gray-600" />,
            doc: <FiFileText className="inline mr-1 text-indigo-600" />,
            docx: <FiFileText className="inline mr-1 text-indigo-600" />,
          };

          const icon = iconMap[extension] || <FiFile className="inline mr-1 text-gray-400" />;
          const displayExt = extension ? `.${extension}` : '—';

          return (
            <span className="flex items-center">
              {icon} {displayExt}
            </span>
          );
        },
        className: 'text-left',
      },
      {
        Header: 'Uploaded On',
        accessor: 'createdAt',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        className: 'text-center',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleView(row.original)}
              title="View"
              className="text-blue-600 hover:text-blue-800"
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
        className: 'text-left',
      },
    ],
    [pageIndex, pageSize, documents]
  );

  return (
    <div className="relative px-4 py-6">
      <div className="flex justify-between items-center mt-4">
        <div className="font-medium text-gray-700 text-lg">
          TOTAL {documents.length} DOCUMENTS
        </div>
        <Button onClick={fetchDocuments}>Refresh</Button>
      </div>

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

      <ViewDocumentModal
        isOpen={isViewOpen}
        onClose={closeModal}
        formData={selectedDoc}
      />
    </div>
  );
};

export default DocumentList;




// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import DocumentHandler from "@/handlers/DocumentHandler";
// import { FaFilePdf, FaFileImage, FaTrashAlt } from "react-icons/fa";
// import { FiEye, FiDownload, FiFile, FiFileText } from "react-icons/fi";
// import ReusableTable from "@/components/shared/ReusableTable";
// import ViewDocumentModal from "@/views/documents/ViewDocumentModal";

// const DocumentList = () => {
//   const [documents, setDocuments] = useState([]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [viewModal, setViewModal] = useState(false);
//   const [showViewFormData, setShowViewFormData] = useState(null);

//   const { getDocumentByUserHandler, deleteDocumentHandler } = DocumentHandler();

//   const toggleViewDocumentDetailModal = () => {
//     setViewModal((prev) => !prev);
//   };

//   const fetchDocuments = async () => {
//     setLoading(true);
//     try {
//       const docs = await getDocumentByUserHandler();
//       setDocuments(docs || []);
//       setPageIndex(0);
//     } catch (err) {
//       console.error("Error fetching documents:", err);
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
//     if (window.confirm("Are you sure you want to delete this document?")) {
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
//       console.warn("Download fallback:", error);
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

//   const onViewHandler = (doc) => {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//     const fullDocUrl = `${baseUrl}/${doc.document}`;
//     setShowViewFormData({ ...doc, documentUrl: fullDocUrl });
//     setViewModal(true);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         Cell: ({ row }) =>
//           documents.length - (pageIndex * pageSize + row.index),
//         className: "text-center",
//       },
//       {
//         Header: "Document Name",
//         accessor: "documentName",
//         className: "text-left",
//       },
//       {
//         Header: "Document Type",
//         accessor: "document",
//         Cell: ({ value }) => {
//           const filePath = value || "";
//           const fileName = filePath.split(/[/\\]/).pop();
//           const extension = fileName?.split(".").pop()?.toLowerCase();

//           const iconMap = {
//             pdf: <FaFilePdf className="inline mr-1 text-red-600" />,
//             png: <FaFileImage className="inline mr-1 text-blue-500" />,
//             jpg: <FaFileImage className="inline mr-1 text-blue-500" />,
//             jpeg: <FaFileImage className="inline mr-1 text-blue-500" />,
//             txt: <FiFileText className="inline mr-1 text-gray-600" />,
//             doc: <FiFileText className="inline mr-1 text-indigo-600" />,
//             docx: <FiFileText className="inline mr-1 text-indigo-600" />,
//           };

//           const icon = iconMap[extension] || (
//             <FiFile className="inline mr-1 text-gray-400" />
//           );
//           const displayExt = extension ? `.${extension}` : "—";

//           return (
//             <span className="flex items-center">
//               {icon} {displayExt}
//             </span>
//           );
//         },
//         className: "text-left",
//       },
//       {
//         Header: "Uploaded On",
//         accessor: "createdAt",
//         Cell: ({ value }) => new Date(value).toLocaleDateString(),
//         className: "text-center",
//       },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => onViewHandler(row.original)}
//               title="View"
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <FiEye size={18} />
//             </button>
//             <button
//               onClick={() => handleDownload(row.original.document)}
//               title="Download"
//               className="text-green-600 hover:text-green-800"
//             >
//               <FiDownload size={18} />
//             </button>
//             <button
//               onClick={() => handleDelete(row.original.documentId)}
//               title="Delete"
//               className="text-red-600 hover:text-red-800"
//             >
//               <FaTrashAlt size={16} />
//             </button>
//           </div>
//         ),
//         className: "text-left",
//       },
//     ],
//     [pageIndex, pageSize, documents]
//   );

//   return (
//     <div className="relative px-4 py-6">
//       <div className="flex justify-between items-center mt-4">
//         <div className="font-medium text-gray-700 text-lg">
//           TOTAL {documents.length} DOCUMENTS
//         </div>
//       </div>

//       <div className="mt-6 overflow-x-auto">
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
//       {/* <ViewDocumentModal
//         isOpen={viewModal}
//         onClose={toggleViewDocumentDetailModal}
//         formData={showViewFormData}
//         onUploadSuccess={fetchDocuments}
//       /> */}

//          {viewModal && (
//         <ViewDocumentModal
//           isOpen={viewModal}
//           onClose={toggleViewDocumentDetailModal}
//           formData={showViewFormData}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentList;
