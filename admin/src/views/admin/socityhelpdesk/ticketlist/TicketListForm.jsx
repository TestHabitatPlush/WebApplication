// import React, { useEffect, useState } from "react";
// import UrlPath from "../../../../components/shared/UrlPath";
// import PageHeading from "../../../../components/shared/PageHeading";
// import Button from "../../../../components/ui/Button";
// import Input from "../../../../components/shared/Input";
// import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
// import ReusableTable from "../../../../components/shared/ReusableTable";
// import TicketListEdit from "./TicketListEdit";
// import TicketListView from "./TicketListView";

// const ActionData = ({ data, updateModal, viewModal, updateForm }) => {
//   const onUpdateTicket = () => {
//     // dispatch(setCustomerId(data.customerId));
//     // dispatch(setFormOperationType('view'));
//     updateForm(data);
//     // console.log(data.Visit_relation_Description);
//     updateModal();
//   };
//   const onViewTicket = () => {
//     // dispatch(setCustomerId(data.customerId));
//     // dispatch(setFormOperationType('edit'));
//     updateForm(data);

//     // console.log(data.Visit_relation_Description);
//     viewModal();
//   };

//   return (
//     <div className="flex gap-2">
//       <button
//         className="px-2 py-1 text-xs bg-lime text-white rounded-md hover:bg-opacity-90"
//         onClick={onUpdateTicket}
//       >
//         Edit
//       </button>
//       <button
//         className="px-2 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-opacity-90"
//         onClick={onViewTicket}
//       >
//         View
//       </button>
//     </div>
//   );
// };

// const TicketListForm = () => {
//   const paths = ["Socity HelpDesk Management", "Ticket List"];
//   const Heading = ["Ticket List"];
//   // const [page, setPage] = useState(0); // Start from page 1
//   // const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
//   const {
//     ticketPurpousListView,
//     ticketStatusListView,
//     getTicketListTable,
//     updateTicketListById,
//   } = SoftwareHelpDeskHandler();

//   const [ticketPurpousData, setTicketPurpousData] = useState([]);
//   const [ticketStatusList, setTicketStatusList] = useState([]);

//   const [page, setPage] = useState(0); // Start from page 1
//   const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
//   const [transformedData, setTransformedData] = useState([]);
//   const [totalPages, setTotalPages] = useState(null);
//   const [total, setTotal] = useState(null);

//   const [updateFormData, setUpdateFormData] = useState(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);

//   const DefinePurpousList = async () => {
//     try {
//       const result = await ticketPurpousListView();
//       console.log("ticket purpose list view", result);
//       setTicketPurpousData(result.data.data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const DefineStatusList = async () => {
//     try {
//       const result = await ticketStatusListView();
//       console.log("ticket status list", result);
//       setTicketStatusList(result.data.data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const fetchTicketTable = async () => {
//     try {
//       const result = await getTicketListTable({
//         page,
//         pageSize,
//       });
//       console.log("ticket list table", result.data.data);
//       setTransformedData(
//         result.data.data.map((el) => {
//           const { createdAt, ticketTitle, ticket_Id } = el;
//           const ticketStatus =
//             el.ticketDetails.ref_ticket_status.ticket_status_description;
//           // const assignedTo = el.
//           console.log(ticketStatus);

//           return {
//             // assignedTo: el.,
//             createdAt,
//             ticketTitle,
//             ticket_Id,
//             ticketStatus,
//             actions: (
//               <ActionData
//                 data={el}
//                 updateModal={() => setShowUpdateModal(true)}
//                 viewModal={() => setShowViewModal(true)}
//                 updateForm={setUpdateFormData}
//               />
//             ),
//           };
//         })
//       );
//       setTotal(result.data.total);
//       setTotalPages(result.data.totalPages);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     DefinePurpousList();
//     DefineStatusList();
//     fetchTicketTable();
//   }, []);

//   const toggleUpdateTicketListModal = () => {
//     setShowUpdateModal((prev) => !prev);
//   };
//   const toggleViewTicketListModal = () => {
//     setShowViewModal((prev) => !prev);
//   };
//   const onSubmitEdit = (formData) => {
//     console.log("Submit Handler Is working ");
//     // updateTicketListById(formData)
//   };

//   const columns = [
//     { Header: "Ticket Id", accessor: "ticket_Id" },
//     { Header: "Ticket Title", accessor: "ticketTitle" },
//     { Header: "Date", accessor: "createdAt" },
//     { Header: "Status", accessor: "ticketStatus" },
//     { Header: " Assign To", accessor: "assignedTo" },
//     { Header: " Action", accessor: "actions" },
//   ];
//   return (
//     <div className="px-5 ">
//       <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
//         <UrlPath paths={paths} />
//       </div>
//       <PageHeading heading={Heading} />

//       <div className="p-10 my-5 border rounded-lg bg-gray-100">
//         <div className="text-[15px] font-sans font-bold">Search By</div>
//         <div> Date Range(Max. allowed 6 months) </div>
//         <div className="grid grid-cols-5 gap-4 items-center">
//           <Input
//             label={<div>Start Date </div>}
//             type="date"
//             // placeholder={"Enter the Name"}
//             size={"lg"}
//           />{" "}
//           <Input
//             label={<div>End Date </div>}
//             type="date"
//             // placeholder={"Enter the Name"}
//             size={"lg"}
//           />{" "}
//           <div>
//             <label
//               for="countries"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               {" "}
//               Ticket Purpose{" "}
//             </label>
//             <select
//               id="countries"
//               class="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
//             >
//               {ticketPurpousData.length > 0 &&
//                 ticketPurpousData.map((el) => (
//                   <option value={el.ticket_purpose_Id}>
//                     {el.purpose_Details}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <Input
//             label={<div>Ticket Id </div>}
//             type="text"
//             // placeholder={"Enter the Name"}
//             size={"lg"}
//           />{" "}
//           <div>
//             <label
//               for="countries"
//               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//             >
//               {" "}
//               Ticket Status{" "}
//             </label>
//             <select
//               id="countries"
//               class="bg-gray-50 mb-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
//             >
//               {ticketStatusList.length > 0 &&
//                 ticketStatusList.map((el) => (
//                   <option value="US">{el.ticket_status_description}</option>
//                 ))}
//             </select>
//           </div>
//           <div>
//             <Button className="max-w-sm" type="submit" size="lg">
//               Search
//             </Button>{" "}
//           </div>
//         </div>
//       </div>

//       <div className="p-10 my-5 border rounded-lg bg-gray-100">
//         <ReusableTable
//           columns={columns}
//           data={transformedData}
//           pageIndex={page}
//           pageSize={pageSize}
//           totalCount={total}
//           totalPages={totalPages}
//           setPageIndex={(index) => setPage(index)}
//           setPageSize={(size) => setPageSize(size)}
//         />
//       </div>

//       {showUpdateModal && (
//         <TicketListEdit
//           isOpen={showUpdateModal}
//           onClose={toggleUpdateTicketListModal}
//           formData={updateFormData}
//           onEditHandler={onSubmitEdit}
//         />
//       )}

//       {/* view Ticket List */}
//       {showViewModal && (
//         <TicketListView
//           isOpen={showViewModal}
//           onClose={toggleViewTicketListModal}
//           formData={updateFormData}
//           // onEditHandler={onSubmitEdit}
//         />
//       )}
//     </div>
//   );
// };

// export default TicketListForm;


import React, { useEffect, useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/shared/Input";
import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
import ReusableTable from "../../../../components/shared/ReusableTable";
import TicketListEdit from "./TicketListEdit";
import TicketListView from "./TicketListView";

const ActionData = ({ data, updateModal, viewModal, updateForm }) => {
  const onUpdateTicket = () => {
    updateForm(data);
    updateModal();
  };
  const onViewTicket = () => {
    updateForm(data);
    viewModal();
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-opacity-90"
        onClick={onViewTicket}
      >
        View
      </button>
      <button
        className="px-3 py-1 text-xs bg-lime-600 text-white rounded hover:bg-opacity-90"
        onClick={onUpdateTicket}
      >
        Edit
      </button>
    </div>
  );
};

const TicketListForm = () => {
  const paths = ["Socity HelpDesk Management", "Ticket List"];
  const Heading = ["Ticket List"];

  const {
    ticketPurpousListView,
    ticketStatusListView,
    getTicketListTable,
    updateTicketListById,
  } = SoftwareHelpDeskHandler();

  const [ticketPurpousData, setTicketPurpousData] = useState([]);
  const [ticketStatusList, setTicketStatusList] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [total, setTotal] = useState(null);

  const [updateFormData, setUpdateFormData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const DefinePurpousList = async () => {
    try {
      const result = await ticketPurpousListView();
      setTicketPurpousData(result.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const DefineStatusList = async () => {
    try {
      const result = await ticketStatusListView();
      setTicketStatusList(result.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTicketTable = async () => {
    try {
      const result = await getTicketListTable({ page, pageSize });
      setTransformedData(
        result.data.data.map((el) => {
          const { createdAt, ticketTitle, ticket_Id } = el;
          const ticketStatus = el.ticketDetails?.ref_ticket_status?.ticket_status_description || "N/A";
          const assignedTo = el.assignedTo || "—";

          return {
            createdAt,
            ticketTitle,
            ticket_Id,
            ticketStatus,
            assignedTo,
            actions: (
              <ActionData
                data={el}
                updateModal={() => setShowUpdateModal(true)}
                viewModal={() => setShowViewModal(true)}
                updateForm={setUpdateFormData}
              />
            ),
          };
        })
      );
      setTotal(result.data.total);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    DefinePurpousList();
    DefineStatusList();
    fetchTicketTable();
  }, []);

  const toggleUpdateTicketListModal = () => setShowUpdateModal((prev) => !prev);
  const toggleViewTicketListModal = () => setShowViewModal((prev) => !prev);

  const onSubmitEdit = (formData) => {
    console.log("Submit Handler Is working ");
    // updateTicketListById(formData)
  };

  const columns = [
    { Header: "Ticket Id", accessor: "ticket_Id" },
    { Header: "Ticket Title", accessor: "ticketTitle" },
    { Header: "Date", accessor: "createdAt" },
    { Header: "Status", accessor: "ticketStatus" },
    { Header: "Assign To", accessor: "assignedTo" },
    { Header: "Action", accessor: "actions" },
  ];

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-600">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <div className="p-6 border rounded-md bg-white shadow-sm mb-6">
        <h3 className="text-lg font-bold mb-4">Search by</h3>
        <div className="grid grid-cols-5 gap-4">
          <Input label="Ticket Number" type="text" size="lg" />
          <Input label="Ticket Title" type="text" size="lg" />
          <Input label="Start Date" type="date" size="lg" />
          <Input label="End Date" type="date" size="lg" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-3.5">
              {ticketStatusList.map((el, idx) => (
                <option key={idx} value={el.ticket_status_description}>
                  {el.ticket_status_description}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-5 flex justify-end">
            <Button className="rounded bg-lime-500 text-white px-6 py-2 font-bold" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </div>

      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <ReusableTable
          columns={columns}
          data={transformedData}
          pageIndex={page}
          pageSize={pageSize}
          totalCount={total}
          totalPages={totalPages}
          setPageIndex={setPage}
          setPageSize={setPageSize}
        />
      </div>

      {showUpdateModal && (
        <TicketListEdit
          isOpen={showUpdateModal}
          onClose={toggleUpdateTicketListModal}
          formData={updateFormData}
          onEditHandler={onSubmitEdit}
        />
      )}

      {showViewModal && (
        <TicketListView
          isOpen={showViewModal}
          onClose={toggleViewTicketListModal}
          formData={updateFormData}
        />
      )}
    </div>
  );
};

export default TicketListForm;
