// 'use client';

// import React, { useMemo, useState, useEffect } from 'react';

// import { useSelector } from 'react-redux';
// import DocumentHandler from '@/handlers/DocumentHandler';
// import { FaFilePdf, FaFileImage, FaTrashAlt } from 'react-icons/fa';
// import { FiEye, FiDownload, FiFile, FiFileText } from 'react-icons/fi';
// import ReusableTable from '@/components/shared/ReusableTable';
// import ViewDocumentModal from './ViewDocumentModal';
// import Dialog from '@/components/ui/Dialog';
// import toast from 'react-hot-toast';

// const formatDateTime = (value) => {
//   const date = new Date(value);
//   return date.toLocaleString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// const DocumentList = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [documents, setDocuments] = useState([]);
//   const [selectedDoc, setSelectedDoc] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteDocId, setDeleteDocId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedType, setSelectedType] = useState('user');

//   const {
//     getDocumentByUserHandler,
//     getDocumentBySocietyHandler,
//     deleteDocumentHandler,
//   } = DocumentHandler();

//   const handleDownload = (url) => {
//     if (!url) return toast.error('Download URL not found');
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = '';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleView = (doc) => {
//     setSelectedDoc(doc);
//     setViewModalOpen(true);
//   };

//   const confirmDelete = (docId) => {
//     setDeleteDocId(docId);
//     setDeleteDialogOpen(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteDocumentHandler(deleteDocId, token);
//       toast.success('Document deleted successfully');
//       fetchDocuments();
//     } catch (error) {
//       toast.error('Failed to delete document');
//     } finally {
//       setDeleteDialogOpen(false);
//       setDeleteDocId(null);
//     }
//   };

//   const fetchDocuments = async () => {
//     setLoading(true);
//     try {
//       let res = [];

//       if (selectedType === 'user') {
//         res = await getDocumentByUserHandler(token);
//       } else if (selectedType === 'society') {
//         res = await getDocumentBySocietyHandler(token);
//       } else {
//         const userDocs = await getDocumentByUserHandler(token);
//         const societyDocs = await getDocumentBySocietyHandler(token);
//         res = [...(userDocs || []), ...(societyDocs || [])];
//       }

//       setDocuments(res || []);
//     } catch (error) {
//       console.error('Failed to fetch documents:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, [selectedType]);

//   const renderColumns = (pageIndex, pageSize) => [
//     {
//       Header: 'SL.No',
//       Cell: ({ row }) => documents.length - (pageIndex * pageSize + row.index),
//       className: 'text-center',
//     },
//     {
//       Header: 'Document Name',
//       accessor: 'documentName',
//       className: 'text-left',
//     },
//       {
//       Header: 'User Id',
//       accessor: 'userId',
//       className: 'text-left',
//     },
//      {
//       Header: 'Society Id',
//       accessor: 'societyId',
//       className: 'text-left',
//     },
//     {
//       Header: 'Document Type',
//       accessor: 'document',
//       Cell: ({ value }) => {
//         const filePath = value || '';
//         const fileName = filePath.split(/[/\\]/).pop();
//         const extension = fileName?.split('.').pop()?.toLowerCase();

//         const iconMap = {
//           pdf: <FaFilePdf className="inline mr-1 text-red-600" />,
//           png: <FaFileImage className="inline mr-1 text-blue-500" />,
//           jpg: <FaFileImage className="inline mr-1 text-blue-500" />,
//           jpeg: <FaFileImage className="inline mr-1 text-blue-500" />,
//           txt: <FiFileText className="inline mr-1 text-gray-600" />,
//           doc: <FiFileText className="inline mr-1 text-indigo-600" />,
//           docx: <FiFileText className="inline mr-1 text-indigo-600" />,
//         };

//         const icon = iconMap[extension] || <FiFile className="inline mr-1 text-gray-400" />;
//         const displayExt = extension ? `.${extension}` : '—';

//         return (
//           <span className="flex items-center">
//             {icon} {displayExt}
//           </span>
//         );
//       },
//       className: 'text-left',
//     },
//     {
//       Header: 'Uploaded On',
//       accessor: 'createdAt',
//       Cell: ({ value }) => formatDateTime(value),
//       className: 'text-center',
//     },
//     {
//       Header: 'Actions',
//       Cell: ({ row }) => (
//         <div className="flex gap-3">
//           <FiEye
//             className="text-blue-600 cursor-pointer"
//             onClick={() => handleView(row.original)}
//             title="View"
//           />
//           <FiDownload
//             className="text-green-600 cursor-pointer"
//             onClick={() => handleDownload(row.original.document_url)}
//             title="Download"
//           />
//           <FaTrashAlt
//             className="text-red-500 cursor-pointer"
//             onClick={() => confirmDelete(row.original.id)}
//             title="Delete"
//           />
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold">Document List</h2>
//         <select
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md"
//         >
//           <option value="user">User</option>
//           <option value="society">Society</option>
//           <option value="all">All</option>
//         </select>
//       </div>

//       <ReusableTable
//         data={documents}
//         columns={renderColumns(0, 10)}
//         loading={loading}
//         pageSize={10}
//       />

//       <ViewDocumentModal
//         isOpen={viewModalOpen}
//         onClose={() => setViewModalOpen(false)}
//         document={selectedDoc}
//       />

//       <Dialog
//         isOpen={deleteDialogOpen}
//         title="Delete Document"
//         message="Are you sure you want to delete this document?"
//         onCancel={() => setDeleteDialogOpen(false)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// };

// export default DocumentList;
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DocumentHandler from '@/handlers/DocumentHandler';
import { FaFilePdf, FaFileImage, FaTrashAlt } from 'react-icons/fa';
import { FiEye, FiDownload, FiFile, FiFileText } from 'react-icons/fi';
import ReusableTable from '@/components/shared/ReusableTable';
import ViewDocumentModal from './ViewDocumentModal';
import Dialog from '@/components/ui/Dialog';
import toast from 'react-hot-toast';

const formatDateTime = (value) => {
  const date = new Date(value);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const DocumentList = () => {
  // const token = useSelector((state) => state.auth.token);
  // const userId = useSelector((state) => state.auth.user?.id);
  // const societyId = useSelector((state) => state.auth.user?.societyId);


   const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?.userId);
     const societyId = useSelector((state) => state.auth.user?.Customer?.customerId);
     

  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDocId, setDeleteDocId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('user');

  const {
    getDocumentByUserHandler,
    getDocumentBySocietyHandler,
    deleteDocumentHandler,
  } = DocumentHandler();

  const handleDownload = (url) => {
    if (!url) return toast.error('Download URL not found');
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setViewModalOpen(true);
  };

  const confirmDelete = (docId) => {
    setDeleteDocId(docId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDocumentHandler(deleteDocId, token);
      toast.success('Document deleted successfully');
      fetchDocuments();
    } catch (error) {
      toast.error('Failed to delete document');
    } finally {
      setDeleteDialogOpen(false);
      setDeleteDocId(null);
    }
  };

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let res = [];

      if (selectedType === 'user') {
        res = await getDocumentByUserHandler(token);
      } else if (selectedType === 'society') {
        res = await getDocumentBySocietyHandler(societyId, userId, token);
      } else {
        const userDocs = await getDocumentByUserHandler(token);
        const societyDocs = await getDocumentBySocietyHandler(societyId, userId, token);
        res = [...(userDocs || []), ...(societyDocs || [])];
      }

      setDocuments(res || []);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [selectedType]);

  const renderColumns = (pageIndex, pageSize) => [
    {
      Header: 'SL.No',
      Cell: ({ row }) => documents.length - (pageIndex * pageSize + row.index),
      className: 'text-center',
    },
    {
      Header: 'Document Name',
      accessor: 'documentName',
      className: 'text-left',
    },
    {
      Header: 'User Id',
      accessor: 'userId',
      className: 'text-left',
    },
    {
      Header: 'Society Id',
      accessor: 'societyId',
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
      Cell: ({ value }) => formatDateTime(value),
      className: 'text-center',
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="flex gap-3">
          <FiEye
            className="text-blue-600 cursor-pointer"
            onClick={() => handleView(row.original)}
            title="View"
          />
          <FiDownload
            className="text-green-600 cursor-pointer"
            onClick={() => handleDownload(row.original.document_url)}
          />
          <FaTrashAlt
            className="text-red-500 cursor-pointer"
            onClick={() => confirmDelete(row.original.id)}
            title="Delete"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Document List</h2>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="user">User</option>
          <option value="society">Society</option>
          <option value="all">All</option>
        </select>
      </div>

      <ReusableTable
        data={documents}
        columns={renderColumns(0, 10)}
        loading={loading}
        pageSize={10}
      />

      <ViewDocumentModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        document={selectedDoc}
      />

      <Dialog
        isOpen={deleteDialogOpen}
        title="Delete Document"
        message="Are you sure you want to delete this document?"
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default DocumentList;
<<<<<<< HEAD
=======


>>>>>>> origin/himansu
