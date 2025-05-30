import React, { useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const VehicleList = () => {
  const originalData = React.useMemo(
    () => [
      {
        "id": 1,
        "Vehicle Type": "Car",
        "Vehicle Registration Number": "OD-05-AB-1234"
      },
      {
        "id": 2,
        "Vehicle Type": "Bike",
        "Vehicle Registration Number": "OD-07-XY-5678"
      },
      {
        "id": 3,
        "Vehicle Type": "Truck",
        "Vehicle Registration Number": "OD-09-ZZ-9101"
      }
    ],
    []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(originalData);

  // Define table columns
  const columns = React.useMemo(
    () => [
      { Header: "Parking ID", accessor: "id" },
      { Header: "Vehicle Type", accessor: "Vehicle Type" },
      { Header: "Vehicle_Reg_Number", accessor: "Vehicle Registartion Number" },
      // { Header: "Vehicle_Make_Brand", accessor: "Vehicle Make Brand" },
      // { Header: "Vehicle_Digital_Id", accessor: " Vehicle Digital Id" },
    //   { Header: "Address", accessor: "address" },
    //   { Header: "Entry Date", accessor: "entrydate" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              key={`view-${row.original.id}`}
              onClick={() => handleView(row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEye />
            </button>
            <button
              key={`delete-${row.original.id}`}
              onClick={() => handleDelete(row.original)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  // Handlers
  const handleSearch = () => {
    const filtered = originalData.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleView = (row) => alert(`Viewing details for: ${row.name}`);
  const handleDelete = (row) => alert(`Deleting details for: ${row.name}`);

  return (
    <div className="p-6">
      <h3 className="mb-4 text-2xl font-bold">Vehicle List</h3>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          className="w-full border border-collapse border-gray-200 table-auto"
          {...getTableProps()}
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    className="px-4 py-2 text-left border border-gray-200"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={columnIndex}
                  >
                    {column.render("Header")}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.original.id}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-2 border border-gray-200"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VehicleList;