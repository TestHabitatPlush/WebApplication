"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReusableTable from "@/components/shared/ReusableTable";
import VehicleHandler from "@/handlers/VehicleHandler";
import ViewVehicleModal from "./ViewVehicleModal";
import { FaEye, FaTrash } from "react-icons/fa";

const VehicleList = () => {
  const { getVehicleByUserHandler, deleteVehicleHandler } = VehicleHandler();

  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // 📄 LOAD VEHICLES
  useEffect(() => {
    const loadVehicles = async () => {
      const data = await getVehicleByUserHandler();
      setVehicles(data);
    };
    loadVehicles();
  }, []);

  // 🔍 SEARCH
  const filteredData = useMemo(() => {
    return vehicles.filter((v) =>
      [
        v.vehicleType,
        v.vehicleNumber,
        v.ownerName,
        v.ownerContact,
        v.fastagNumber,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [vehicles, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // 👁 VIEW
  const handleView = (vehicle) => setSelectedVehicle(vehicle);

  // ❌ DELETE
  const handleDelete = async (vehicleId) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    await deleteVehicleHandler(vehicleId);
    setVehicles((prev) =>
      prev.filter((v) => v.vehicleId !== vehicleId)
    );
  };

  // 📊 TABLE COLUMNS
  const columns = useMemo(
    () => [
      {
        Header: "S.No",
        Cell: ({ row }) => pageIndex * pageSize + row.index + 1,
      },
      { Header: "Vehicle Type", accessor: "vehicleType" },
      { Header: "Vehicle Number", accessor: "vehicleNumber" },
      { Header: "Owner Name", accessor: "ownerName" },
      { Header: "Owner Contact", accessor: "ownerContact" },
      { Header: "Fastag Number", accessor: "fastagNumber" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex gap-3">
            <FaEye
              className="text-blue-600 cursor-pointer"
              onClick={() => handleView(row.original)}
            />
            <FaTrash
              className="text-red-600 cursor-pointer"
              onClick={() => handleDelete(row.original.vehicleId)}
            />
          </div>
        ),
      },
    ],
    [pageIndex, pageSize]
  );

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, pageIndex, pageSize]);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Vehicle List</h2>

      <input
        type="text"
        placeholder="Search..."
        className="p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPageIndex(0);
        }}
      />

      <ReusableTable
        columns={columns}
        data={paginatedData}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalPages={totalPages}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />

      {selectedVehicle && (
        <ViewVehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
};

export default VehicleList;
