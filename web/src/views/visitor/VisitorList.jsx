// import React, { useState, useEffect } from "react";
// import { useTable, usePagination, useSortBy } from "react-table";
// import { FaEye, FaTrashAlt, FaQrcode } from "react-icons/fa";
// import VisitHandler from "@/handlers/VisitHandler";
// import toast from "react-hot-toast";

// const VisitorList = () => {
//   const { getVisitorListBySenderId, handleViewQRCodeById, getVisitorById, deleteVisitorById } =
//     VisitHandler();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState([]);
//   const [transformedData, setTransformedData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(5);
//   const [qrCodeData, setQrCodeData] = useState(null);

//   // Fetch visitor list
//   const fetchVisitorList = async () => {
//     try {
//       const result = await getVisitorListBySenderId({
//         page: currentPage,
//         pageSize,
//       });
//       if (result && result.data) {
//         const fetchedData = result.data.data || [];
//         setTransformedData(fetchedData);
//         setFilteredData(fetchedData);
//         setTotalPages(result.data.totalPages || 0);
//       } else {
//         setTransformedData([]);
//         setFilteredData([]);
//       }
//     } catch (err) {
//       console.error("Error fetching visitor list:", err);
//       setTransformedData([]);
//       setFilteredData([]);
//     }
//   };

//   useEffect(() => {
//     fetchVisitorList();
//   }, [currentPage, pageSize]);

//   // Handle view QR code
//   const handleViewQRCode = async (row) => {
//     try {
//       const response = await handleViewQRCodeById(row.visit_entry_Id);
//       if (response && response.qrCode) {
//         setQrCodeData({ id: row.visit_entry_Id, qrCode: response.qrCode });
//         toast.success("QR Code fetched successfully.");
//       } else {
//         toast.error("Failed to fetch QR Code.");
//       }
//     } catch (err) {
//       toast.error("Error fetching QR Code.");
//     }
//   };

//   // Handle delete visitor
//   const handleDelete = async (row) => {
//     try {
//       await deleteVisitorById(row.visit_entry_Id);
//       toast.success("Visitor deleted successfully.");
//       fetchVisitorList();
//     } catch (error) {
//       console.error("Error deleting visitor:", error);
//     }
//   };

//   // Handle view visitor details
//   const handleView = async (row) => {
//     try {
//       const viewData = await getVisitorById(row.visit_entry_Id);
//       if (viewData?.data) {
//         console.log("Visitor Details:", viewData.data);
//         toast.success("Visitor details fetched successfully.");
//       }
//     } catch (error) {
//       console.error("Error fetching visitor details:", error);
//     }
//   };

//   // Define table columns
//   const columns = React.useMemo(
//     () => [
//       { Header: "ID", accessor: "visit_entry_Id" },
//       { Header: "Name", accessor: "visit_name" },
//       { Header: "Phone", accessor: "visit_mobileno" },
//       { Header: "Purpose", accessor: "visit_porpous" },
//       { Header: "Address", accessor: "visit_location" },
//       { Header: "Entry Date", accessor: "visit_expect_date_of_entry_date" },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleView(row.original)}
//               className="text-blue-500 hover:text-blue-700"
//             >
//               <FaEye />
//             </button>
//             <button
//               onClick={() => handleViewQRCode(row.original)}
//               className="text-black-500 hover:text-green-700"
//             >
//               <FaQrcode />
//             </button>
//             <button
//               onClick={() => handleDelete(row.original)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <FaTrashAlt />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   // Table setup
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canNextPage,
//     canPreviousPage,
//     pageCount,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     useSortBy,
//     usePagination
//   );

//   // Handle search
//   const handleSearch = () => {
//     const filtered = transformedData.filter((item) =>
//       Object.values(item)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <div className="p-6">
//       <h3 className="mb-4 text-2xl font-bold">Visitor List</h3>

//       {/* Search Bar */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-64 p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table
//           className="w-full border border-collapse border-gray-200 table-auto"
//           {...getTableProps()}
//         >
//           <thead className="bg-gray-100">
//             {headerGroups.map((headerGroup, index) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                 {headerGroup.headers.map((column, columnIndex) => (
//                   <th
//                     className="px-4 py-2 text-left border border-gray-200"
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     key={columnIndex}
//                   >
//                     {column.render("Header")}
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? " 🔽"
//                         : " 🔼"
//                       : ""}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={row.original.visit_entry_Id}>
//                   {row.cells.map((cell, cellIndex) => (
//                     <td
//                       key={cellIndex}
//                       className="px-4 py-2 border border-gray-200"
//                       {...cell.getCellProps()}
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between mt-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
//           disabled={!canPreviousPage}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageIndex + 1} of {pageCount}
//         </span>
//         <button
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//           disabled={!canNextPage}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VisitorList;
