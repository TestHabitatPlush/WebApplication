// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import DocumentHandler from "@/handlers/DocumentHandler";
// import UserGroupHandler from "@/handlers/UseGroupHandler";
// import { FaFilePdf, FaFileImage, FaTrashAlt } from "react-icons/fa";
// import { FiEye, FiDownload, FiFile, FiFileText } from "react-icons/fi";
// import ReusableTable from "@/components/shared/ReusableTable";

// // Constant for "Self" user group
// const MY_DOCUMENTS_ID = "__self__";

// const DocumentList = () => {
//   const [userGroupId, setUserGroupId] = useState("");
//   const [documents, setDocuments] = useState([]);
//   const [userGroups, setUserGroups] = useState([]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);

//   const {
//     getDocumentBySocietyHandler,
//     getDocumentByUserHandler,
//     deleteDocumentHandler,
//   } = DocumentHandler();

//   const { getUserGroupHandler } = UserGroupHandler();

//   useEffect(() => {
//     const loadGroups = async () => {
//       try {
//         const res = await getUserGroupHandler();
//         setUserGroups(res.data.data);
//         // console.log(res.data.data);
//       } catch (err) {
//         console.error("Failed to load user groups:", err);
//       }
//     };
//     loadGroups();
//   }, []);

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       setLoading(true);
//       try {
//         let docs = [];

//         if (userGroupId === MY_DOCUMENTS_ID) {
//           const res = await getDocumentByUserHandler();
//           docs = res.data.data;
//           console.log(docs);
//         } else {
//           const res = await getDocumentBySocietyHandler();
//           docs = res.data;

//           if (userGroupId) {
//             docs = docs.filter(
//               (doc) => String(doc.userGroupId) === String(userGroupId)
//             );
//           }
//         }

//         setDocuments(docs);
//         setPageIndex(0); // reset pagination
//       } catch (err) {
//         console.error("Error fetching documents:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, [userGroupId, pageSize]);

//   const pagedDocs = useMemo(() => {
//     const reversed = [...documents].reverse();
//     const start = pageIndex * pageSize;
//     return reversed.slice(start, start + pageSize);
//   }, [pageIndex, pageSize, documents]);

//   const totalPages = Math.ceil(documents.length / pageSize);

//   const handleDelete = async (documentId) => {
//     if (typeof window !== "undefined" && window.confirm("Are you sure?")) {
//       const res = await deleteDocumentHandler(documentId);
//       if (res?.status === 200) {
//         setDocuments((prevDocs) =>
//           prevDocs.filter((doc) => doc.documentId !== documentId)
//         );
//       }
//     }
//   };

//   const handleDownload = async (url) => {
//     if (typeof window === "undefined") return;

//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error("Network error");

//       const blob = await response.blob();
//       const contentDisposition = response.headers.get("Content-Disposition");

//       let fileName = "document";
//       if (contentDisposition && contentDisposition.includes("filename=")) {
//         const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
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
//       console.warn("Download failed:", error);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "");
//       link.setAttribute("target", "_blank");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     }
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

//           return <span className="flex items-center">{icon} {displayExt}</span>;
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
//             <a
//               href={row.original.document}
//               target="_blank"
//               rel="noopener noreferrer"
//               title="View"
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <FiEye size={18} />
//             </a>
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

//   const activeGroupName =
//     userGroupId === MY_DOCUMENTS_ID
//       ? "My Documents"
//       : userGroups.find((g) => String(g.userGroupId) === userGroupId)
//           ?.userGroupName;

//   return (
//     <div className="relative px-4 py-6">
//       <div className="flex justify-between items-center mt-4">
//         <div className="font-medium text-gray-700 text-lg">
//           TOTAL {documents.length} DOCUMENTS
//         </div>
//         <div>
//           <select
//             name="userGroupId"
//             value={userGroupId}
//             onChange={(e) => setUserGroupId(e.target.value)}
//             className="py-2 px-3 border border-gray-300 rounded-md uppercase text-sm"
//           >
//             <option value="">All Groups</option>
//             <option value={MY_DOCUMENTS_ID}>Self</option>
//             {userGroups.map((grp) => (
//               <option key={grp.userGroupId} value={String(grp.userGroupId)}>
//                 {grp.userGroupName}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {userGroupId && (
//         <div className="text-sm text-gray-600 mt-2">
//           Showing documents for:{" "}
//           <span className="font-semibold">{activeGroupName}</span>
//         </div>
//       )}

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
//     </div>
//   );
// };

// export default DocumentList;

// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import DocumentHandler from "@/handlers/DocumentHandler";
// import { FaFilePdf, FaFileImage, FaTrashAlt } from "react-icons/fa";
// import { FiEye, FiDownload, FiFile, FiFileText } from "react-icons/fi";
// import ReusableTable from "@/components/shared/ReusableTable";

// const DocumentList = () => {
//   const [documents, setDocuments] = useState([]);
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);

//   const { getDocumentByUserHandler, deleteDocumentHandler } = DocumentHandler();

//   // useEffect(() => {
//   //   console.log("useEffect ran"); // Check if effect runs at all

//   //   const fetchDocuments = async () => {
//   //     setLoading(true);
//   //     try {
//   //       const res = await getDocumentByUserHandler();
//   //       console.log("Raw response:", res);

//   //       const docs = res?.data?.data || [];
//   //       console.log("Extracted docs:", docs);
//   //       // const docs = await getDocumentByUserHandler();
//   //       // setDocuments(docs || []);
//   //       // setDocuments(docs);
//   //       setPageIndex(0);
//   //     } catch (err) {
//   //       console.error("Error fetching documents:", err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchDocuments();
//   // }, []);

// useEffect(() => {
//   const fetchDocuments = async () => {
//     setLoading(true);
//     try {
//       const docs = await getDocumentByUserHandler(); 
//       console.log("Fetched documents:", docs);
//       setDocuments(docs || []);
//       setPageIndex(0);
//     } catch (err) {
//       console.error("Error fetching documents:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDocuments();
// }, []);


//   const pagedDocs = useMemo(() => {
//     const reversed = [...documents].reverse(); 
//     const start = pageIndex * pageSize;
//     return reversed.slice(start, start + pageSize);
//   }, [pageIndex, pageSize, documents]);

//   const totalPages = Math.ceil(documents.length / pageSize);
//   // // Delete handler
//   // const handleDelete = async (documentId) => {
//   //   if (window.confirm("Are you sure you want to delete this document?")) {
//   //     const res = await deleteDocumentHandler(documentId);
//   //     if (res?.status === 200) {
//   //       setDocuments((prevDocs) =>
//   //         prevDocs.filter((doc) => doc.documentId !== documentId)
//   //       );
//   //     }
//   //   }
//   // };

//   const handleDelete = async (documentId) => {
//   if (window.confirm("Are you sure you want to delete this document?")) {
//     const res = await deleteDocumentHandler(documentId);
//     if (res?.status === 200) {
//       const updatedDocs = await getDocumentByUserHandler();
//       setDocuments(updatedDocs || []);
//     }
//   }
// };


//   const handleDownload = async (url) => {
//     if (typeof window === "undefined") return;

//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error("Network error");

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
//       console.warn("Download failed:", error);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "");
//       link.setAttribute("target", "_blank");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     }
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
//             <a
//               href={row.original.document}
//               target="_blank"
//               rel="noopener noreferrer"
//               title="View"
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <FiEye size={18} />
//             </a>
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
//     [pageIndex, pageSize]
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
//     </div>
//   );
// };

// export default DocumentList;


"use client";

import React, { useEffect, useMemo, useState } from "react";
import DocumentHandler from "@/handlers/DocumentHandler";
import { FaFilePdf, FaFileImage, FaTrashAlt } from "react-icons/fa";
import { FiEye, FiDownload, FiFile, FiFileText } from "react-icons/fi";
import ReusableTable from "@/components/shared/ReusableTable";

const DocumentList = ({ refreshKey }) => {
  const [documents, setDocuments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const { getDocumentByUserHandler, deleteDocumentHandler } = DocumentHandler();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const docs = await getDocumentByUserHandler();
        setDocuments(docs || []);
        setPageIndex(0);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [refreshKey]); 

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
        const updatedDocs = await getDocumentByUserHandler();
        setDocuments(updatedDocs || []);
      }
    }
  };

  const handleDownload = async (url) => {
    if (typeof window === "undefined") return;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network error");

      const blob = await response.blob();
      const contentDisposition = response.headers.get("Content-Disposition");

      let fileName = "document";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
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
      console.warn("Download failed:", error);
      const link = document.createElement("a");
      link.href = url;
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
        Cell: ({ row }) => documents.length - (pageIndex * pageSize + row.index),
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

          const icon = iconMap[extension] || <FiFile className="inline mr-1 text-gray-400" />;
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
        Header: "Uploaded On",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        className: "text-center",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <a
              href={row.original.document}
              target="_blank"
              rel="noopener noreferrer"
              title="View"
              className="text-blue-600 hover:text-blue-800"
            >
              <FiEye size={18} />
            </a>
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
    [pageIndex, pageSize]
  );

  return (
    <div className="relative px-4 py-6">
      <div className="flex justify-between items-center mt-4">
        <div className="font-medium text-gray-700 text-lg">
          TOTAL {documents.length} DOCUMENTS
        </div>
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
    </div>
  );
};

export default DocumentList;
