// import React from "react";
// // import { FaFilePdf } from "react-icons/fa6";
// import { BsPersonWalking } from "react-icons/bs";

// export const VendorList = () => {
//   //   const arr = [1, 2, 3, 4];
//   return (
//     <div>
//       <div className="space-y-2">
//         <div className=" ">
//           <h3 className="font-bold text-xl text-center">Vendor List</h3>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//           <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium ">
//               Name :
//             </p>
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Role :
//             </p>
//           </div>
//           <div className="  py-[40px] px-[20px]  bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Name :
//             </p>
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Role :
//             </p>
//           </div>
//           <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Name :
//             </p>
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Role :
//             </p>
//           </div>
//           <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Name :
//             </p>
//             <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
//               Role :
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VendorList;
// import React, { useState } from "react";
// import { useTable, usePagination, useSortBy } from "react-table";
// import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

// const VendorList = () => {
//   const originalData = React.useMemo(
//     () => [
//       {
//         id: 1,
//         name: "Sasmita",
//         phone: "9876543214",
//         // email: "sasmitasubhashree@gmail.com",
//         vendorservicetype: "Auditor",
//         // address: "Cuttack",
//         entrydate: "02-12-2024",
//         tilldate:"04-12-2024",
//       },
//       {
//         id: 2,
//         name: "Subhashree",
//         phone: "8637237481",
//         //  email: "sasmita@gmail.com",
//         vendorservicetype: "Electrician",
//         // address: "Bhubaneswar",
//         entrydate: "03-12-2024",
//         tilldate:"05-12-2024",
//       },
//     ],
//     []
//   );

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredData, setFilteredData] = useState(originalData);

//   // Define table columns
//   const columns = React.useMemo(
//     () => [
//       { Header: "ID", accessor: "id" },
//       { Header: "Name", accessor: "name" },
//       { Header: "Phone", accessor: "phone" },
//       // { Header: "Email", accessor: "email" },
//       { Header: "Vendor Service Type", accessor: "vendorservicetype" },
//       // { Header: "Address", accessor: "address" },
//       { Header: "Entry Date", accessor: "entrydate" },
//       { Header: "Till Date", accessor: "tilldate" },
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
//             {/* <button
//               onClick={() => handleEdit(row.original)}
//               className="text-yellow-500 hover:text-yellow-700"
//             >
//               <FaEdit />
//             </button> */}
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

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageCount,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     useSortBy,
//     usePagination
//   );

//   // Handlers
//   const handleSearch = () => {
//     const filtered = originalData.filter((item) =>
//       Object.values(item)
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   const handleView = (row) => alert(`Viewing details for: ${row.name}`);
//   // const handleEdit = (row) => alert(`Editing details for: ${row.name}`);
//   const handleDelete = (row) => alert(`Deleting details for: ${row.name}`);

//   return (
//     <div className="p-6">
//       <h3 className="text-2xl font-bold mb-4">Vendor List</h3>

//       {/* Search Bar */}
//       <div className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-64"
//         />
//         <button
//           onClick={handleSearch}
//           className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table
//           className="table-auto w-full border-collapse border border-gray-200"
//           {...getTableProps()}
//         >
//           <thead className="bg-gray-100">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     className="py-2 px-4 border border-gray-200 text-left"
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
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
//                 <tr {...row.getRowProps()} className="hover:bg-gray-50">
//                   {row.cells.map((cell) => (
//                     <td
//                       className="py-2 px-4 border border-gray-200"
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

//       <div className="flex justify-between items-center mt-4">
//         <button
//           onClick={previousPage}
//           disabled={!canPreviousPage}
//           className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {pageIndex + 1} of {pageCount}
//         </span>
//         <button
//           onClick={nextPage}
//           disabled={!canNextPage}
//           className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VendorList;
