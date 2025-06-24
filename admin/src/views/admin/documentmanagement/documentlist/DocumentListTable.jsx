


import React, { useEffect, useMemo, useState } from "react";
import DocumentHandler from "../../../../handlers/DocumentHandler";
import {
  FaFilePdf,
  FaFileImage,
  FaTrashAlt,
} from "react-icons/fa";
import {
  FiEye,
  FiDownload,
  FiFile,
  FiFileText,
} from "react-icons/fi";
import ReusableTable from "../../../../components/shared/ReusableTable";
import ViewDocumentModal from "./ViewDocumentModal";

const visibilityOptions = [
  { value: "", label: "All Groups" },
  { value: "owner", label: "Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "primary", label: "Primary Member" },
  { value: "all", label: "All" },
];

const DocumentListTable = () => {
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [documents, setDocuments] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);


  const {
    getDocumentBySocietyHandler,
    getDocumentByUserHandler,
    deleteDocumentHandler,
    getDocumentByIdHandler
  } = DocumentHandler();
 const toggleViewDiscussionDetailModal = () => {
    setViewModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        let userDocs = await getDocumentByUserHandler();
        let societyDocs = await getDocumentBySocietyHandler();

        let allDocs = [
          ...(userDocs?.documents || []),
          ...(societyDocs?.documents || []),
        ];

        if (visibilityFilter) {
          allDocs = allDocs.filter((doc) =>
            Array.isArray(doc.roleCategories)
              ? doc.roleCategories.includes(
                  visibilityFilter === "primary"
                    ? "primary_member"
                    : `society_${visibilityFilter}`
                )
              : false
          );
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

  // Paginated docs with reverse order
  const pagedDocs = useMemo(() => {
    const reversed = [...documents].reverse(); 
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [pageIndex, pageSize, documents]);

  const totalPages = Math.ceil(documents.length / pageSize);

  // Delete handler
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

const onViewHandler = async (documentId) => {
  try {
    const res = await getDocumentByIdHandler(documentId);
    const docData = res?.data?.document;

    if (docData) {
      setShowViewFormData(docData);
      setViewModal(true);
    } else {
      console.error("Document not found");
    }
  } catch (err) {
    console.error("Failed to fetch document:", err);
  }
};



  const handleDownload = async (url) => {
    try {
      const response = await fetch(url, {
        // Include this only if needed:
        // headers: { Authorization: `Bearer ${yourToken}` },
        // credentials: 'include',
      });

      if (!response.ok) throw new Error("Network response was not ok");

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
      console.warn("Fetch download failed, falling back to simple link.", error);
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
        
          Header: "Sl No.",
          Cell: ({ row }) => pageIndex * pageSize + row.index + 1,
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
          const extension = fileName?.includes(".")
            ? fileName.split(".").pop().toLowerCase()
            : "";

          const iconMap = {
            pdf: <FaFilePdf className="inline mr-1 text-red-600" />,
            png: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpg: <FaFileImage className="inline mr-1 text-blue-500" />,
            jpeg: <FaFileImage className="inline mr-1 text-blue-500" />,
            txt: <FiFileText className="inline mr-1 text-gray-600" />,
            doc: <FiFileText className="inline mr-1 text-indigo-600" />,
            docx: <FiFileText className="inline mr-1 text-indigo-600" />,
          };

          const icon =
            iconMap[extension] || (
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
        Header: "Uploaded On",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        className: "text-center",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {/* <a
              href={row.original.document}
              target="_blank"
              rel="noopener noreferrer"
              title="View"
              className="text-blue-600 hover:text-blue-800"
            >
           

            </a> */}
           <button
                onClick={() => onViewHandler(row.original.documentId)} 
                title="View"
                className="text-orange-600 hover:text-orange-800"
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
              className="text-red-600 hover:text-red-800 "
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
    visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label || "";

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
          onClose={toggleViewDiscussionDetailModal}
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

export default DocumentListTable;
