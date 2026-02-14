
// const MemberDetailTable = ({ unitId, members }) => {
//   if (!members || !members.length)
//     return <p>No members found for Unit {unitId}</p>;

//   return (
//     <div>
//       <h3 className="mb-2 text-lg font-semibold">
//         Members of Unit {unitId}
//       </h3>

//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">User ID</th>
//             <th className="p-2 border">Unit ID</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Phone</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Role Category</th>
//           </tr>
//         </thead>

//         <tbody>
//           {members.map((m, idx) => (
//             <tr key={m.userId || idx}>
//               <td className="p-2 border">{m.userId || "-"}</td>
//               <td className="p-2 border">{m.unitId || units.unitId || "-"}</td>
//               <td className="p-2 border">
//                 {(m.firstName || "") + " " + (m.lastName || "")}
//               </td>
//               <td className="p-2 border">{m.mobileNumber || "mobileNumber"}</td>
//               <td className="p-2 border">{m.email || m.role.roleCategory}</td>
//               <td className="p-2 border">
//                 {m.userRole?.roleCategory || m.role.roleCategory}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MemberDetailTable;

// //export default MemberDetailTable;
"use client";

import { useMemo, useState } from "react";
import ReusableTable from "@/components/shared/ReusableTable";

const MemberDetailTable = ({ unitId, members = [] }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns = useMemo(
    () => [
      { Header: "User ID", accessor: "userId" },
      { Header: "Unit ID", accessor: "unitId" },
      {
        Header: "Name",
        Cell: ({ row }) =>
          `${row.original.firstName || ""} ${
            row.original.lastName || ""
          }`,
      },
      { Header: "Phone", accessor: "mobileNumber" },
      { Header: "Email", accessor: "email" },
      {
        Header: "Role",
        Cell: ({ row }) =>
          row.original.userRole?.roleCategory ||
          row.original.role?.roleCategory ||
          "-",
      },
    ],
    []
  );

  if (members.length === 0) {
    return <p>No members found for Unit {unitId}</p>;
  }

  return (
    <ReusableTable
      columns={columns}
      data={members}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalCount={members.length}
      totalPages={Math.ceil(members.length / pageSize)}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
    />
  );
};

export default MemberDetailTable;
