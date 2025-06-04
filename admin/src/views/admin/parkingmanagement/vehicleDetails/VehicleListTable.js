import React, { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";
import ReusableTable from "../../../../components/shared/ReusableTable";
import ParkingHandler from "../../../../handlers/ParkingHandler";
import ViewVehicleDetailsModal from "./ViewVehicleDetailsModal";

const VehicleListTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);

  const { getVehicleHandler, getVehicleByIdHandler } = ParkingHandler();

  const fetchVehicleList = async () => {
    try {
      const result = await getVehicleHandler({ page, pageSize });

      const vehicleData = Array.isArray(result.data?.vehicles)
        ? result.data.vehicles
        : [];

      setTransformedData(vehicleData);
      setTotal(result.data?.total || vehicleData.length);
      setTotalPages(result.data?.totalPages || 1);
    } catch (err) {
      console.error("Error fetching vehicle list:", err);
      setTransformedData([]);
    }
  };

  useEffect(() => {
    fetchVehicleList();
  }, [page, pageSize]);

  const handleViewVehicle = async (id) => {
    try {
      console.log("Fetching vehicle details for ID:", id);
      const resultData = await getVehicleByIdHandler(id);

      if (resultData) {
        setShowViewFormData(resultData);
        setViewModal(true);
      } else {
        console.error("Vehicle data not found.");
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  const handleDeactiveVehicle = async (id) => {
    alert(`Deactivate Vehicle ID: ${id}`);
  };

  const columns = [
    {
      Header: "Sl. No",
      accessor: "serialNumber",
      Cell: ({ row }) => page * pageSize + row.index + 1,
    },
    { Header: "Vehicle ID", accessor: "vehicleId" },
    { Header: "Vehicle Type", accessor: "vehicleType" },
    { Header: "Owner Name", accessor: "ownerName" },
    { Header: "Owner Contact", accessor: "ownerContact" },
    { Header: "Vehicle Number", accessor: "vehicleNumber" },
    { Header: "Fastag Number", accessor: "fastagNumber" },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex space-x-4">
          <button
            className="text-yellow-600 hover:text-yellow-700"
            onClick={() => handleViewVehicle(row.original.vehicleId)}
          >
            <FaEye className="text-lg" />
          </button>
          <button
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeactiveVehicle(row.original.vehicleId)}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <strong>Vehicle List</strong>

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

      <ViewVehicleDetailsModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        formData={showViewFormData}
      />
    </div>
  );
};

export default VehicleListTable;
