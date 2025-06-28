// import React, { useEffect, useState } from "react";
// import UrlPath from "../../../../../components/shared/UrlPath";
// import PageHeading from "../../../../../components/shared/PageHeading";
// import Input from "../../../../../components/shared/Input";
// import Button from "../../../../../components/ui/Button";
// import SoftwareHelpDeskHandler from "../../../../../handlers/SoftwareHelpDesk";
// import ReusableTable from "../../../../../components/shared/ReusableTable";

// const ApprovalMatrixForm = () => {
//   const paths = ["Socity HelpDesk Management", "Setup", "Approval Matrix"];
//   const Heading = ["Approval Matrix"];

//   const [page, setPage] = useState(0); // Start from page 1
//   const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
//   const [transformedData, setTransformedData] = useState([]);
//   const [totalPages, setTotalPages] = useState(null);
//   const [total, setTotal] = useState(null);

//   const { accessManagementTable } = SoftwareHelpDeskHandler();

//   const fetchAccessManagementTable = async () => {
//     console.log("hello accessmanagement members");
//     try {
//       const result = await accessManagementTable({
//         page,
//         pageSize,
//       });
//       console.log("access management list", result);
//       setTransformedData(result.data.data);
//       setTotal(result.data.total);
//       setTotalPages(result.data.totalPages);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };
//   useEffect(() => {
//     fetchAccessManagementTable();
//   }, [page, pageSize]);

//   const columns = [
//     { Header: "Management Committee", accessor: "firstName" },
//     { Header: "Role/Design", accessor: "managementDesignation" },
//     { Header: "Approval", accessor: "actions" },
//   ];
//   return (
//     <div className="px-5 ">
//       <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
//         <UrlPath paths={paths} />
//       </div>
//       <PageHeading heading={Heading} />
//       <div className="p-10 my-5 border rounded-lg bg-gray-100">
//         <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <div>Know your management committee member</div>
//           <Button className="max-w-sm" type="submit" size="lg">
//             Refresh
//           </Button>
//           {/* <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" class="px-6 py-3">
//                   Management Committee
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                   Role / Designation
//                 </th>
//                 <th scope="col" class="px-6 py-3">
//                   Approval
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                 <th
//                   scope="row"
//                   class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   Management committee number 1
//                 </th>
//                 <td class="px-6 py-4">moderatoe</td>
//                 <td class="px-6 py-4">Yes/No</td>
//               </tr>
//               <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                 <th
//                   scope="row"
//                   class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   Management committee number 2{" "}
//                 </th>
//                 <td class="px-6 py-4">Security</td>
//                 <td class="px-6 py-4">Yes/No</td>
//               </tr>
//             </tbody>
//           </table> */}
//           <div className="p-10 my-5 border rounded-lg bg-gray-100">
//             <ReusableTable
//               columns={columns}
//               data={transformedData}
//               pageIndex={page}
//               pageSize={pageSize}
//               totalCount={total}
//               totalPages={totalPages}
//               setPageIndex={(index) => setPage(index)}
//               setPageSize={(size) => setPageSize(size)}
//             />
//           </div>
//         </div>

//         <div class="flex items-center mt-[30px]">
//           <input
//             id="checked-checkbox"
//             type="checkbox"
//             value=""
//             class="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//           />
//           <label
//             for="checked-checkbox"
//             class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//           >
//             YES - Send Notification by Email
//           </label>
//         </div>
//       </div>

//       <div className="flex justify-center mt-5">
//         <Button className="max-w-sm" type="submit" size="lg">
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ApprovalMatrixForm;

import React, { useEffect, useState } from "react";
import UrlPath from "../../../../../components/shared/UrlPath";
import PageHeading from "../../../../../components/shared/PageHeading";
import Input from "../../../../../components/shared/Input";
import Button from "../../../../../components/ui/Button";
import SoftwareHelpDeskHandler from "../../../../../handlers/SoftwareHelpDesk";
import ReusableTable from "../../../../../components/shared/ReusableTable";

const ApprovalMatrixForm = () => {
  const paths = ["Socity HelpDesk Management", "Setup", "Approval Matrix"];
  const Heading = ["Approval Matrix"];

  const [page, setPage] = useState(0); // Start from page 1
  const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [total, setTotal] = useState(null);

  const { accessManagementTable, sendAccessManagementData } =
    SoftwareHelpDeskHandler();

  const fetchAccessManagementTable = async () => {
    try {
      const result = await accessManagementTable({
        page,
        pageSize,
      });
      setTransformedData(result.data.data);
      setTotal(result.data.total);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchAccessManagementTable();
  }, [page, pageSize]);

  // Handle radio button state for each row
  const handleApprovalChange = (id, value) => {
    console.log("radio button", value);

    setTransformedData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, approval: value } : row))
    );
  };

  const refreshHandler = () => {
    fetchAccessManagementTable();
  };

  const columns = [
    { Header: "Management Committee", accessor: "firstName" },
    { Header: "Role/Design", accessor: "managementDesignation" },
    {
      Header: "Approval",
      accessor: "approval",
      Cell: ({ row }) => (
        <div>
          <label>
            <input
              type="radio"
              name={`approval-${row.original.id}`}
              value="yes"
              checked={row.original.approval === "yes"}
              onChange={() => handleApprovalChange(row.original.id, "yes")}
            />
            Yes
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name={`approval-${row.original.id}`}
              value="no"
              checked={row.original.approval === "no"}
              onChange={() => handleApprovalChange(row.original.id, "no")}
            />
            No
          </label>
        </div>
      ),
    },
  ];

  const handleSubmit = () => {
    console.log("Submitting data:", transformedData);
    sendAccessManagementData(transformedData);
  };

  return (
    <div className="px-5 ">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div>Know your management committee member</div>
          <Button
            className="max-w-sm"
            onClick={refreshHandler}
            type="submit"
            size="lg"
          >
            Refresh
          </Button>
          <div className="p-10 my-5 border rounded-lg bg-gray-100">
            <ReusableTable
              columns={columns}
              data={transformedData}
              pageIndex={page}
              pageSize={pageSize}
              totalCount={total}
              totalPages={totalPages}
              setPageIndex={(index) => setPage(index)}
              setPageSize={(size) => setPageSize(size)}
            />
          </div>
        </div>

        <div className="flex items-center mt-[30px]">
          <input
            id="checked-checkbox"
            type="checkbox"
            value=""
            className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checked-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            YES - Send Notification by Email
          </label>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          className="max-w-sm"
          onClick={handleSubmit}
          type="submit"
          size="lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ApprovalMatrixForm;
