
// "use client";
// import React, { useEffect, useState } from "react";
// import Input from "@/components/shared/Input";
// import Button from "@/components/ui/Button";
// import ReusableTable from "@/components/shared/ReusableTable";
// import SuperAdminItHandler from "@/handlers/SuperAdminItHandler";
// import TicketListView from "@/views/helpdesk/TicketListView";
// import TicketListEdit from "@/views/helpdesk/TicketListEdit";

// const TicketListForm = () => {
//   const handler = SuperAdminItHandler();
//   const { getRefTicketStatus, getTicketTable } = handler;

//   const [filters, setFilters] = useState({
//     ticketNumber: "",
//     ticketTitle: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//   });

//   const [searchFilters, setSearchFilters] = useState(filters);
//   const [ticketStatusList, setTicketStatusList] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [viewData, setViewData] = useState(null);
//   const [editData, setEditData] = useState(null);

//   useEffect(() => {
//     getRefTicketStatus().then((res) => setTicketStatusList(res || []));
//   }, []);

//   useEffect(() => {
//     fetchTickets();
//   }, [page, pageSize, searchFilters]);

//   const fetchTickets = async () => {
//     const res = await getTicketTable({ page, pageSize, ...searchFilters });
//     if (res?.data?.rows) {
//       setTickets(res.data.rows);
//       setTotalCount(res.data.total);
//     } else {
//       setTickets([]);
//       setTotalCount(0);
//     }
//   };

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = () => {
//     setPage(1);
//     setSearchFilters(filters);
//   };

//   const handleRefresh = () => {
//     setFilters({
//       ticketNumber: "",
//       ticketTitle: "",
//       startDate: "",
//       endDate: "",
//       status: "",
//     });
//     setSearchFilters({
//       ticketNumber: "",
//       ticketTitle: "",
//       startDate: "",
//       endDate: "",
//       status: "",
//     });
//     setPage(1);
//   };

//   const columns = [
//     { Header: "Ticket Id", accessor: "ticket_Id" },
//     { Header: "Ticket Title", accessor: "ticket_title" },
//     {
//       Header: "Date",
//       accessor: "createdAt",
//       Cell: ({ value }) => new Date(value).toLocaleDateString("en-IN"),
//     },
//     {
//       Header: "Status",
//       Cell: ({ row }) =>
//         row.original.Software_Ticket_Details?.[0]
//           ?.software_ref_ticket_status?.ticket_status_description || "—",
//     },
//     {
//       Header: "Assigned To",
//       Cell: ({ row }) => {
//         const u = row.original.Software_Ticket_Details?.[0]?.assignedTo;
//         return u ? `${u.firstName} ${u.lastName}` : "—";
//       },
//     },
//     {
//       Header: "Action",
//       Cell: ({ row }) => (
//         <div className="flex gap-2">
//           <Button size="sm" onClick={() => setViewData(row.original)}>
//             View
//           </Button>
//           <Button size="sm" onClick={() => setEditData(row.original)}>
//             Edit
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-5 gap-4 my-4 bg-white p-4 rounded shadow">
//         <Input label="Ticket Number" name="ticketNumber" value={filters.ticketNumber} onChange={handleChange} />
//         <Input label="Ticket Title" name="ticketTitle" value={filters.ticketTitle} onChange={handleChange} />
//         <Input type="date" label="Start Date" name="startDate" value={filters.startDate} onChange={handleChange} />
//         <Input type="date" label="End Date" name="endDate" value={filters.endDate} onChange={handleChange} />
//         <div>
//           <label className="text-sm font-medium">Status</label>
//           <select name="status" value={filters.status} onChange={handleChange} className="w-full p-2 border rounded">
//             <option value="">All</option>
//             {ticketStatusList.map((s) => (
//               <option key={s.ticket_status_Id} value={s.ticket_status_description}>
//                 {s.ticket_status_description}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="flex justify-end gap-2 mb-4">
//         <Button onClick={handleSearch}>Submit</Button>
//         <Button variant="secondary" onClick={handleRefresh}>Refresh</Button>
//       </div>

//       <ReusableTable
//         columns={columns}
//         data={tickets}
//         pageIndex={page - 1}
//         pageSize={pageSize}
//         totalCount={totalCount}
//         setPageIndex={(i) => setPage(i + 1)}
//         setPageSize={setPageSize}
//       />

//       {viewData && <TicketListView ticket={viewData} onClose={() => setViewData(null)} />}
//       {editData && <TicketListEdit formData={editData} onClose={() => setEditData(null)} onRefresh={fetchTickets} />}
//     </div>
//   );
// };

// export default TicketListForm;




"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import ReusableTable from "@/components/shared/ReusableTable";
import SuperAdminItHandler from "@/handlers/SuperAdminItHandler";
import TicketListView from "@/views/helpdesk/TicketListView";
import TicketListEdit from "@/views/helpdesk/TicketListEdit";

const TicketListForm = () => {
  const { getRefTicketStatus, getTicketTable } = SuperAdminItHandler();

  const [filters, setFilters] = useState({
    ticketNumber: "",
    ticketTitle: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [searchFilters, setSearchFilters] = useState({ ...filters });

  const [ticketStatusList, setTicketStatusList] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  const fetchStatuses = async () => {
    const list = await getRefTicketStatus();
    setTicketStatusList(list || []);
  };

  const fetchTickets = async () => {
    const response = await getTicketTable({
      page,
      pageSize,
      ...searchFilters,
    });

    if (response?.data) {
      setTickets(response.data.rows || []);
      setTotalCount(response.data.count || 0);
    } else {
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [page, pageSize, searchFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSearch = () => {
  //   setPage(1);
  //   setSearchFilters({ ...filters });
  // };
  const handleSearch = () => {
    setPage(1);
    setSearchFilters({
      ...filters,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
    });
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const columns = [
    {
      Header: "Ticket Id",
      accessor: "ticket_Id",
    },
    {
      Header: "Ticket Title",
      accessor: "ticket_title",
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ value }) => new Date(value).toLocaleDateString("en-IN"),
    },
    {
      Header: "Status",
      accessor: "latestStatus",
      Cell: ({ row }) => {
        const details = row.original.Software_Ticket_Details || [];
        if (!details.length) return "N/A";

        const latestDetail = [...details].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        

        return (
          latestDetail?.software_ref_ticket_status?.ticket_status_description ||
          "N/A"
        );
      },
    },
    {
      Header: "Assigned To",
      Cell: ({ row }) => {
        const latestDetail = [
          ...(row.original.Software_Ticket_Details || []),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        const assignedUser =
          latestDetail?.assignedUser || latestDetail?.assignedTo;

        return assignedUser
          ? `${assignedUser.firstName} ${assignedUser.lastName}`
          : "—";
      },
    },

    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setViewData(row.original)}>
            View
          </Button>
          <Button size="sm" onClick={() => setEditData(row.original)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">

      <div className="grid grid-cols-5 gap-4 my-4 bg-white p-4 rounded shadow">
        <Input
          label="Ticket Number"
          name="ticketNumber"
          value={filters.ticketNumber}
          onChange={handleChange}
        />
        <Input
          label="Ticket Title"
          name="ticketTitle"
          value={filters.ticketTitle}
          onChange={handleChange}
        />
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
        <Input
          label="End Date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">All</option>
            {ticketStatusList.map((el) => (
              <option
                key={el.ticket_status_Id}
                value={el.ticket_status_description}
              >
                {el.ticket_status_description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Button onClick={handleSearch}>Submit</Button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <ReusableTable
          key={JSON.stringify(tickets.map((t) => t.ticket_Id))}
          columns={columns}
          data={tickets || []}
          pageIndex={page - 1}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
          setPageIndex={(pg) => setPage(pg + 1)}
          setPageSize={setPageSize}
        />
      </div>

      {viewData && (
        <TicketListView ticket={viewData} onClose={() => setViewData(null)} />
      )}
      {editData && (
        <TicketListEdit
          formData={editData}
          onClose={() => setEditData(null)}
          onRefresh={fetchTickets}
        />
      )}
    </div>
  );
};

export default TicketListForm;
