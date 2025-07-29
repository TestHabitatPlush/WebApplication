// import React, { useEffect, useState } from "react";
// import { FaSearch, FaFilter, FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
// import UrlPath from "../../../../components/shared/UrlPath";
// import PageHeading from "../../../../components/shared/PageHeading";
// import {
//   MdKeyboardDoubleArrowLeft,
//   MdKeyboardDoubleArrowRight,
// } from "react-icons/md";
// import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// import NoticeHandler from "../../../../handlers/NoticeHandler";
// import UpdateNoticeDetailsModal from "./UpdateNoticeDetailsModal";
// import ViewNoticeDetailsModal from "./ViewNoticeDetailsModal";

// const NoticeList = () => {
//   const paths = ["Notice Announcement", "Notice List"];
//   const Heading = ["Notice List"];
//   const [notices, setNotices] = useState([]);
//   const { getNoticeHandler, deleteNoticeByIdHandler, updateNoticeHandler } =
//     NoticeHandler();
//   const { getUserGroupHandler } = UserGroupHandler();
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [totalNotices, setTotalNotices] = useState(0);
//   const [disscussionheading, setDisscussionheading] = useState("");
//   const [selectedOption, setSelectedOption] = useState([]);
//   const [userGroupId, setUserGroupId] = useState("");

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const result = await getNoticeHandler({
//           page,
//           pageSize,
//           disscussionheading,
//           userGroupId,
//         });
//         setNotices(result.data.data);
//         setTotalNotices(result.data.total);
//       } catch (err) {
//         console.error(err.message);
//       }
//     };
//     fetchNotices();

//     const getUserGroup = async () => {
//       try {
//         const result = await getUserGroupHandler();
//         setSelectedOption(result.data.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getUserGroup();
//   }, [page, pageSize, disscussionheading, userGroupId]);

//   const totalPages = Math.ceil(totalNotices / pageSize);

//   const handleSearchChange = (e) => {
//     setDisscussionheading(e.target.value);
//   };

//   const handleDelete = (id) => {
//     deleteNoticeByIdHandler(id)
//       .then((res) => {
//         if (res.status === 200) {
//           setNotices((prev) => prev.filter((el) => el.noticeId !== id));
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [updateFormData, setUpdateFormData] = useState(null);

//   const toggleUpdateNoticeDetailModal = () => {
//     setShowUpdateModal((prev) => !prev);
//   };

//   const onEditHandler = (noticeId) => {
//     const findNoticeData = notices.find(
//       (element) => element.noticeId === noticeId
//     );
//     setUpdateFormData(findNoticeData);
//     toggleUpdateNoticeDetailModal();
//   };

//   const onSubmitEdit = (formData) => {
//     updateNoticeHandler(formData);
//     toggleUpdateNoticeDetailModal();
//   };

//   const [viewmodal, setViewModal] = useState(false);
//   const [showViewFormData, setShowViewFormData] = useState(null);

//   const toggleViewNoticeDetailModal = () => {
//     setViewModal((prev) => !prev);
//   };

//   const onViewHandler = (noticeId) => {
//     const viewNoticeData = notices.find(
//       (element) => element.noticeId === noticeId
//     );
//     setShowViewFormData(viewNoticeData);
//     setViewModal(true);
//   };

//   return (
//     <div className="relative">
//       <UrlPath paths={paths} />
//       <PageHeading heading={Heading} />
//       <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
//         TOTAL {totalNotices} NOTICES
//       </div>

//       <div className="flex flex-row justify-end mt-4">
//       <select
//   name="userGroupId"
//   onChange={(e) => setUserGroupId(e.target.value)}
//   className="py-2 uppercase border border-gray-300 rounded-md"
// >
//   {selectedOption && selectedOption.length > 0 &&
//     [...selectedOption]
//       .sort((a, b) => a.userGroupName.localeCompare(b.userGroupName))
//       .map((item) => (
//         <option key={item.userGroupId} value={item.userGroupId}>
//           {item.userGroupName}
//         </option>
//       ))
//   }
// </select>

// </div>

//       <div className="flex flex-row mt-4">
//         <div className="relative w-full">
//           <input
//             type="text"
//             onChange={handleSearchChange}
//             placeholder="Search by Discussion Heading..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
//           />
//         </div>
//       </div>

//       {notices.map((el) => (
//         <div key={el.noticeId} className="flex flex-col mt-4 space-y-2">
//           <div className="relative flex flex-col p-4 bg-gray-100 rounded-lg shadow-md">
//             <div className="text-xl font-semibold text-gray-800">
//               {el.noticeHeading}
//             </div>
//             <div className="absolute flex flex-row gap-2 right-2 top-2">
//               <div className="relative group">
//                 <FaEye
//                   className="text-lg text-yellow-600 cursor-pointer hover:text-yellow-700"
//                   onClick={() => onViewHandler(el.noticeId)}
//                 />
//                 <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-yellow-600 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
//                   View
//                 </span>
//               </div>
//               <div className="relative group">
//                 <FaEdit
//                   className="text-lg text-green-500 cursor-pointer hover:text-green-700"
//                   onClick={() => onEditHandler(el.noticeId)}
//                 />
//                 <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-green-500 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
//                   Edit
//                 </span>
//               </div>
//               <div className="relative group">
//                 <FaTrashAlt
//                   className="text-lg text-red-500 cursor-pointer hover:text-red-700"
//                   onClick={() => handleDelete(el.noticeId)}
//                 />
//                 <span className="absolute px-2 py-1 mb-2 text-xs text-white transition transform -translate-x-1/2 bg-red-500 rounded opacity-0 bottom-full left-1/2 group-hover:opacity-100">
//                   Delete
//                 </span>
//               </div>
//             </div>
//             <div className="mt-2 text-gray-600">{el.noticeDescription}</div>
//             <div className="absolute text-gray-500 right-2 bottom-2">
//               Expired Date {new Date(el.noticeExpireDate).toLocaleDateString()}
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center justify-between mt-4">
//         <div>
//           {page > 1 && (
//             <>
//               <button onClick={() => setPage(1)}>
//                 <MdKeyboardDoubleArrowLeft />
//               </button>
//               <button onClick={() => setPage((prev) => prev - 1)}>
//                 <SlArrowLeft />
//               </button>
//             </>
//           )}
//         </div>
//         <div>
//           Showing {(page - 1) * pageSize + 1} -{" "}
//           {Math.min(page * pageSize, totalNotices)} of {totalNotices}
//         </div>
//         <div>
//           {page < totalPages && (
//             <>
//               <button onClick={() => setPage((prev) => prev + 1)}>
//                 <SlArrowRight />
//               </button>
//               <button onClick={() => setPage(totalPages)}>
//                 <MdKeyboardDoubleArrowRight />
//               </button>
//             </>
//           )}
//         </div>
//         <select
//           value={pageSize}
//           onChange={(e) => setPageSize(Number(e.target.value))}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//         </select>
//       </div>

//       {showUpdateModal && (
//         <UpdateNoticeDetailsModal
//           isOpen={showUpdateModal}
//           onClose={toggleUpdateNoticeDetailModal}
//           formData={updateFormData}
//           onEditHandler={onSubmitEdit}
//         />
//       )}

//       {viewmodal && (
//         <ViewNoticeDetailsModal
//           isOpen={viewmodal}
//           onClose={toggleViewNoticeDetailModal}
//           formData={showViewFormData}
//         />
//       )}
//     </div>
//   );
// };

// export default NoticeList;

// import React, { useEffect, useMemo, useState } from "react";
// import { FiEye, FiTrash } from "react-icons/fi";
// import toast from "react-hot-toast";
// import NoticeHandler from "../../../../handlers/NoticeHandler";
// import ReusableTable from "../../../../components/shared/ReusableTable";
// import ViewNoticeModal from "../noticelist/ViewNoticeDetailsModal";

// const visibilityOptions = [
//   { value: "", label: "All Groups" },
//   { value: "owner", label: "Owner" },
//   { value: "tenant", label: "Tenant" },
//   { value: "primary", label: "Primary Member" },
//   { value: "all", label: "All" },
// ];

// const NoticeList = () => {
//   const [notices, setNotices] = useState([]);
//   const [filteredNotices, setFilteredNotices] = useState([]);
//   const [visibilityFilter, setVisibilityFilter] = useState("");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [viewModal, setViewModal] = useState(false);
//   const [viewData, setViewData] = useState(null);

//   const {
//     getNoticesBySocietyHandler,
//     deleteNoticeHandler,
//   } = NoticeHandler();

//   const toggleViewModal = () => setViewModal((prev) => !prev);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       setLoading(true);
//       try {
//         const response = await getNoticesBySocietyHandler();
//         const fetched = response?.data || [];
//         setNotices(fetched);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         toast.error("Failed to load notices");
//         console.error("Notice fetch error:", err);
//       }
//     };

//     fetchNotices();
//   }, []);

//   // Filtering by role category
//   useEffect(() => {
//     if (!visibilityFilter) {
//       setFilteredNotices(notices);
//     } else {
//       const filtered = notices.filter((notice) => {
//         if (visibilityFilter === "all") return true;
//         return (
//           Array.isArray(notice.roleCategories) &&
//           notice.roleCategories.includes(visibilityFilter)
//         );
//       });
//       setFilteredNotices(filtered);
//     }
//   }, [notices, visibilityFilter]);

//   // Paginated list
//   const pagedNotices = useMemo(() => {
//     const reversed = [...filteredNotices].reverse();
//     const start = pageIndex * pageSize;
//     return reversed.slice(start, start + pageSize);
//   }, [filteredNotices, pageIndex, pageSize]);

//   const totalPages = Math.ceil(filteredNotices.length / pageSize);

//   const onViewHandler = (notice) => {
//     setViewData(notice);
//     setViewModal(true);
//   };

//   const handleDelete = async (noticeId) => {
//     if (window.confirm("Are you sure you want to delete this notice?")) {
//       const res = await deleteNoticeHandler(noticeId);
//       if (res?.status === 200) {
//         toast.success("Notice deleted.");
//         setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
//       } else {
//         toast.error("Failed to delete notice.");
//       }
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         Cell: ({ row }) =>
//           filteredNotices.length - (pageIndex * pageSize + row.index),
//         className: "text-center",
//       },
//       {
//         Header: "Title",
//         accessor: "noticeHeading",
//         className: "text-left",
//       },
//       {
//         Header: "Applicable For",
//         accessor: "roleCategories",
//         Cell: ({ value }) => {
//           if (!Array.isArray(value) || value.length === 0) return "—";
//           const roleMap = {
//             owner: "Owner",
//             tenant: "Tenant",
//             primary: "Primary Member",
//             primary_member: "Primary Member",
//             society_owner: "Owner",
//             society_tenant: "Tenant",
//             society_primary: "Primary Member",
//             all: "All",
//           };
//           return value.map((role) => roleMap[role] || role).join(", ");
//         },
//       },
//       {
//         Header: "Created On",
//         accessor: "createdAt",
//         Cell: ({ value }) =>
//           value ? new Date(value).toLocaleDateString() : "—",
//         className: "text-center",
//       },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <button
//               title="View"
//               className="text-orange-600 hover:text-orange-800"
//               onClick={() => onViewHandler(row.original)}
//             >
//               <FiEye size={18} />
//             </button>
//             <button
//               title="Delete"
//               className="text-red-600 hover:text-red-800"
//               onClick={() => handleDelete(row.original.noticeId)}
//             >
//               <FiTrash size={18} />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [pageIndex, pageSize, filteredNotices]
//   );

//   const activeGroupName =
//     visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label ||
//     "";

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-lg font-medium text-gray-700">
//           TOTAL {filteredNotices.length} NOTICES
//         </div>
//         <div>
//           <select
//             value={visibilityFilter}
//             onChange={(e) => {
//               setPageIndex(0);
//               setVisibilityFilter(e.target.value);
//             }}
//             className="px-3 py-2 text-sm uppercase border border-gray-300 rounded-md"
//           >
//             {visibilityOptions.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {visibilityFilter && (
//         <div className="text-sm text-gray-600 mb-2">
//           Showing notices for:{" "}
//           <span className="font-semibold">{activeGroupName}</span>
//         </div>
//       )}

//       {viewModal && (
//         <ViewNoticeModal
//           isOpen={viewModal}
//           onClose={toggleViewModal}
//           notice={viewData}
//         />
//       )}

//       <ReusableTable
//         columns={columns}
//         data={pagedNotices}
//         pageIndex={pageIndex}
//         pageSize={pageSize}
//         totalCount={filteredNotices.length}
//         totalPages={totalPages}
//         setPageIndex={setPageIndex}
//         setPageSize={setPageSize}
//         loading={loading}
//       />
//     </div>
//   );
// };

// export default NoticeList;

// import React, { useEffect, useMemo, useState } from "react";
// import { FiEye, FiTrash } from "react-icons/fi";
// import toast from "react-hot-toast";
// import NoticeHandler from "../../../../handlers/NoticeHandler";
// import ViewNoticeModal from "../noticelist/ViewNoticeDetailsModal";

// const visibilityOptions = [
//   { value: "", label: "All Groups" },
//   { value: "owner", label: "Owner" },
//   { value: "tenant", label: "Tenant" },
//   { value: "primary", label: "Primary Member" },
//   { value: "all", label: "All" },
// ];

// const NoticeList = () => {
//   const [notices, setNotices] = useState([]);
//   const [filteredNotices, setFilteredNotices] = useState([]);
//   const [visibilityFilter, setVisibilityFilter] = useState("");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [viewModal, setViewModal] = useState(false);
//   const [viewData, setViewData] = useState(null);

//   const { getNoticesBySocietyHandler, deleteNoticeHandler } = NoticeHandler();

//   const toggleViewModal = () => setViewModal((prev) => !prev);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       setLoading(true);
//       try {
//         const response = await getNoticesBySocietyHandler();
//         const fetched = response?.data || [];
//         setNotices(fetched);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         toast.error("Failed to load notices");
//         console.error("Notice fetch error:", err);
//       }
//     };
//     fetchNotices();
//   }, []);

//   useEffect(() => {
//     if (!visibilityFilter) {
//       setFilteredNotices(notices);
//     } else {
//       const filtered = notices.filter((notice) => {
//         if (visibilityFilter === "all") return true;
//         return (
//           Array.isArray(notice.roleCategories) &&
//           notice.roleCategories.includes(visibilityFilter)
//         );
//       });
//       setFilteredNotices(filtered);
//     }
//   }, [notices, visibilityFilter]);

//   const pagedNotices = useMemo(() => {
//     const reversed = [...filteredNotices].reverse();
//     const start = pageIndex * pageSize;
//     return reversed.slice(start, start + pageSize);
//   }, [filteredNotices, pageIndex, pageSize]);

//   const totalPages = Math.ceil(filteredNotices.length / pageSize);

//   const onViewHandler = (notice) => {
//     setViewData(notice);
//     setViewModal(true);
//   };

//   const handleDelete = async (noticeId) => {
//     if (window.confirm("Are you sure you want to delete this notice?")) {
//       const res = await deleteNoticeHandler(noticeId);
//       if (res?.status === 200) {
//         toast.success("Notice deleted.");
//         setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
//       } else {
//         toast.error("Failed to delete notice.");
//       }
//     }
//   };

//   const activeGroupName =
//     visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label ||
//     "";

//   return (
//     <div className="p-4">
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
//         <div className="text-lg font-semibold text-gray-800">
//           TOTAL {filteredNotices.length} NOTICES
//         </div>
//         <div>
//           <select
//             value={visibilityFilter}
//             onChange={(e) => {
//               setPageIndex(0);
//               setVisibilityFilter(e.target.value);
//             }}
//             className="px-3 py-2 text-sm uppercase border border-gray-300 rounded-md"
//           >
//             {visibilityOptions.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {visibilityFilter && (
//         <div className="text-sm text-gray-600 mb-2">
//           Showing notices for: <span className="font-semibold">{activeGroupName}</span>
//         </div>
//       )}

//       {viewModal && (
//         <ViewNoticeModal
//           isOpen={viewModal}
//           onClose={toggleViewModal}
//           notice={viewData}
//         />
//       )}

//       <div className="overflow-x-auto border rounded-md">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left">S.No</th>
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Applicable For</th>
//               <th className="p-3 text-left">Created On</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pagedNotices.map((notice, index) => (
//               <tr key={notice.noticeId} className="border-t">
//                 <td className="p-3">
//                   {filteredNotices.length - (pageIndex * pageSize + index)}
//                 </td>
//                 <td className="p-3">{notice.noticeHeading}</td>
//                 <td className="p-3">
//                   {Array.isArray(notice.roleCategories) && notice.roleCategories.length > 0
//                     ? notice.roleCategories.map((role) => {
//                         const roleMap = {
//                           owner: "Owner",
//                           tenant: "Tenant",
//                           primary: "Primary Member",
//                           primary_member: "Primary Member",
//                           society_owner: "Owner",
//                           society_tenant: "Tenant",
//                           society_primary: "Primary Member",
//                           all: "All",
//                         };
//                         return roleMap[role] || role;
//                       }).join(", ")
//                     : "—"}
//                 </td>
//                 <td className="p-3">
//                   {notice.createdAt
//                     ? new Date(notice.createdAt).toLocaleDateString()
//                     : "—"}
//                 </td>
//                 <td className="p-3 text-center">
//                   <div className="flex items-center justify-center gap-2">
//                     <button
//                       title="View"
//                       className="text-orange-600 hover:text-orange-800"
//                       onClick={() => onViewHandler(notice)}
//                     >
//                       <FiEye size={18} />
//                     </button>
//                     <button
//                       title="Delete"
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(notice.noticeId)}
//                     >
//                       <FiTrash size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="text-sm">
//           Page {pageIndex + 1} of {totalPages}
//         </div>
//         <div className="flex gap-2">
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
//             disabled={pageIndex === 0}
//           >
//             Previous
//           </button>
//           <button
//             className="px-3 py-1 border rounded disabled:opacity-50"
//             onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
//             disabled={pageIndex >= totalPages - 1}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoticeList;

import React, { useEffect, useMemo, useState } from "react";
import { FiEye, FiTrash, FiEdit } from "react-icons/fi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import toast from "react-hot-toast";

import NoticeHandler from "../../../../handlers/NoticeHandler";
import ViewNoticeModal from "../noticelist/ViewNoticeDetailsModal";
import UpdateNoticeDetailsModal from "./UpdateNoticeDetailsModal";
const visibilityOptions = [
  { value: "", label: "All Groups" },
  { value: "owner", label: "Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "primary", label: "Primary Member" },
  { value: "all", label: "All" },
];

const visibilityMap = {
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

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editNotice, setEditNotice] = useState(null);

  const {
    getNoticesByUserHandler,
    getNoticesBySocietyHandler,
    updateNoticeHandler,
    deleteNoticeHandler,
  } = NoticeHandler();

  const toggleViewModal = () => setViewModal((prev) => !prev);

  useEffect(() => {
    const fetchAllNotices = async () => {
      setLoading(true);
      try {
        const userRes = await getNoticesByUserHandler();
        const societyRes = await getNoticesBySocietyHandler();

        let allNotices = [
          ...(userRes?.data?.notices || []),
          ...(societyRes?.data || []),
        ];

        console.log("userRes", userRes);
        console.log("societyRes", societyRes);
        console.log("allNotices (before filter)", allNotices);

        // Filtering using roleCategories from backend (JSON field)
        if (visibilityFilter && visibilityMap[visibilityFilter]) {
          const filterCategories = visibilityMap[visibilityFilter];
          allNotices = allNotices.filter((notice) =>
            Array.isArray(notice.roleCategories)
              ? notice.roleCategories.some((category) =>
                  filterCategories.includes(category)
                )
              : false
          );
        }

        setNotices(allNotices);
        setPageIndex(0);
      } catch (err) {
        toast.error("Failed to fetch notices");
        console.error("Notice fetch error:", err);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotices();
  }, [visibilityFilter, pageSize]);

  const pagedNotices = useMemo(() => {
    const reversed = [...notices].reverse();
    const start = pageIndex * pageSize;
    return reversed.slice(start, start + pageSize);
  }, [notices, pageIndex, pageSize]);

  const totalPages = Math.ceil(notices.length / pageSize);

  const handleDelete = async (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const res = await deleteNoticeHandler(noticeId);
      if (res?.status === 200) {
        toast.success("Notice deleted.");
        setNotices((prev) => prev.filter((n) => n.noticeId !== noticeId));
      } else {
        toast.error("Failed to delete notice.");
      }
    }
  };

  const handleView = (notice) => {
    setSelectedNotice(notice);
    setViewModal(true);
  };

  const handleEdit = (notice) => {
    setEditNotice(notice);
    setEditModal(true);
  };

  const toggleEditModal = () => {
    setEditModal(false);
    setEditNotice(null);
  };

  const activeGroupName =
    visibilityOptions.find((opt) => opt.value === visibilityFilter)?.label ||
    "";

  return (
    <div className="relative px-4 py-6">
      <div className="text-2xl font-semibold text-lime mt-4">Notice List</div>
      <div className="text-gray-700 font-sans text-lg mt-2">
        TOTAL {notices.length} NOTICES
      </div>

      <div className="flex flex-col md:flex-row justify-end items-center mt-4 gap-2">
        <select
          value={visibilityFilter}
          onChange={(e) => {
            setPageIndex(0);
            setVisibilityFilter(e.target.value);
          }}
          className="px-3 py-2 uppercase border border-gray-300 rounded-md text-sm"
        >
          {visibilityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {visibilityFilter && (
        <div className="mt-2 text-sm text-gray-600">
          Showing notices for:{" "}
          <span className="font-semibold">{activeGroupName}</span>
        </div>
      )}

      {viewModal && selectedNotice && (
        <ViewNoticeModal
          isOpen={viewModal}
          onClose={toggleViewModal}
          notice={selectedNotice}
        />
      )}

      {editModal && editNotice && (
        <UpdateNoticeDetailsModal
          isOpen={editModal}
          onClose={toggleEditModal}
          formData={editNotice}
          onEditHandler={async (updatedForm) => {
            const res = await updateNoticeHandler(
              editNotice.noticeId,
              updatedForm
            );
            if (res?.status === 200) {
              setNotices((prev) =>
                prev.map((n) =>
                  n.noticeId === editNotice.noticeId
                    ? { ...n, ...updatedForm }
                    : n
                )
              );
              toggleEditModal();
            }
          }}
        />
      )}

      {loading ? (
        <div className="text-center mt-6 text-gray-500">Loading notices...</div>
      ) : pagedNotices.length > 0 ? (
        <div className="mt-4 space-y-4">
          {pagedNotices.map((notice, index) => (
            <div
              key={notice.noticeId || index}
              className="relative p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="text-xl font-semibold text-gray-800">
                {notice.noticeHeading}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Created On:{" "}
                {notice.createdAt
                  ? new Date(notice.createdAt).toLocaleDateString()
                  : "—"}
              </div>

              <div className="absolute flex gap-2 right-2 top-2">
                <div className="relative group">
                  <FiEye
                    className="text-orange-600 hover:text-orange-800 cursor-pointer"
                    size={18}
                    onClick={() => handleView(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-orange-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    View
                  </span>
                </div>
                <div className="relative group">
                  <FiEdit
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    size={18}
                    onClick={() => handleEdit(notice)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-blue-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    Edit
                  </span>
                </div>
                <div className="relative group">
                  <FiTrash
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    size={18}
                    onClick={() => handleDelete(notice.noticeId)}
                  />
                  <span className="absolute px-2 py-1 mb-2 text-xs text-white bg-red-600 rounded opacity-0 bottom-full left-1/2 transform -translate-x-1/2 group-hover:opacity-100">
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6 text-gray-500">
          No notices to display.
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {pageIndex > 0 && (
            <>
              <button onClick={() => setPageIndex(0)}>
                <MdKeyboardDoubleArrowLeft />
              </button>
              <button
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              >
                <SlArrowLeft />
              </button>
            </>
          )}
        </div>

        <div className="text-sm text-gray-700">
          {notices.length > 0
            ? `Showing ${pageIndex * pageSize + 1} - ${Math.min(
                (pageIndex + 1) * pageSize,
                notices.length
              )} of ${notices.length}`
            : "No notices found."}
        </div>

        <div className="flex items-center gap-2">
          {pageIndex < totalPages - 1 && (
            <>
              <button onClick={() => setPageIndex((prev) => prev + 1)}>
                <SlArrowRight />
              </button>
              <button onClick={() => setPageIndex(totalPages - 1)}>
                <MdKeyboardDoubleArrowRight />
              </button>
            </>
          )}
        </div>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="ml-4 px-2 py-1 border border-gray-300 rounded-md text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default NoticeList;
