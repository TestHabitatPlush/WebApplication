"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import ReusableTable from "@/components/shared/ReusableTable";
import SocietyHelpDeskHandler from "@/handlers/SocietyHelpDesk";
import TicketListView from "@/views/helpdesk/TicketListView";
import TicketListEdit from "@/views/helpdesk/TicketListEdit";

const TicketListForm = () => {
  const handler = SocietyHelpDeskHandler();
  const { getRefTicketStatus, getTicketTable } = handler;

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

  const handleSearch = () => {
    setPage(1);
    setSearchFilters({
      ...filters,
      startDate: filters.startDate || null,
      endDate: filters.endDate || null,
    });
  };

    const handleRefresh = () => {
    const defaultFilters = {
      ticketNumber: "",
      ticketTitle: "",
      startDate: "",
      endDate: "",
      status: "",
    };
    setFilters(defaultFilters);
    setSearchFilters(defaultFilters);
    setPage(1);
    fetchTickets();
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
        const latestDetail = [...row.original.Ticket_Details].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        return (
          latestDetail?.ref_ticket_status?.ticket_status_description || "N/A"
        );
      },
    },
    {
      Header: "Assigned To",
      accessor: "latestAssignedTo",
      Cell: ({ row }) => {
        const latestDetail = [...row.original.Ticket_Details].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        return latestDetail?.assignedUser
          ? `${latestDetail.assignedUser.firstName} ${latestDetail.assignedUser.lastName}`
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
           <Button onClick={handleRefresh} variant="secondary">
          Refresh
        </Button>
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
