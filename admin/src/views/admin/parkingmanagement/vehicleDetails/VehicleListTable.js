import React, { useEffect, useState } from "react";
import { FaEye, FaTimes, FaEdit } from "react-icons/fa";
import ReusableTable from "../../../../components/shared/ReusableTable";
import VehicleHandler from "../../../../handlers/VehicleHandler";
import ViewVehicleDetailsModal from "./ViewVehicleDetailsModal";
import UpdateVehicleDetailsModal from "./UpdateVehicleDetailModal";
import toast from "react-hot-toast";

const VehicleListTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const {
    getVehicleBySocietyHandler,
    getVehicleDataByIdHandler,
    deactivateVehicleHandler,
    updateVehicleHandler,
  } = VehicleHandler();

  // ================= FETCH LIST =================
  const fetchVehicleList = async () => {
    try {
      const res = await getVehicleBySocietyHandler();
      if (res?.vehicles) {
        setData(res.vehicles);
        setTotal(res.vehicles.length);
        setTotalPages(1);
      }
    } catch {
      toast.error("Failed to fetch vehicle list");
    }
  };

  useEffect(() => {
    fetchVehicleList();
  }, []);

  // ================= VIEW =================
  const handleViewVehicle = async (vehicleId) => {
    try {
      const res = await getVehicleDataByIdHandler(vehicleId);
      setSelectedVehicle(res);
      setViewModal(true);
    } catch {
      toast.error("Failed to fetch vehicle details");
    }
  };

  // ================= EDIT (OPEN MODAL) =================
  const handleEditVehicle = async (vehicleId) => {
    try {
      const res = await getVehicleDataByIdHandler(vehicleId);
      console.log(res);
      setSelectedVehicle(res);
      setEditModal(true);
    } catch {
      toast.error("Failed to fetch vehicle data");
    }
  };

  // ================= UPDATE (SUBMIT) =================
const handleUpdateVehicle = async (updatedData) => {
  try {
    await updateVehicleHandler (
      updatedData.societyId,   // REQUIRED
      updatedData.vehicleId,   // REQUIRED
      updatedData
    );

    toast.success("Vehicle updated successfully");
    setEditModal(false);
    fetchVehicleList();
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to update vehicle"
    );
  }
};


  // ================= DEACTIVATE =================
  const handleDeactivateVehicle = async (vehicleId) => {
    if (!window.confirm("Deactivate this vehicle?")) return;

    try {
      await deactivateVehicleHandler(vehicleId);
      toast.success("Vehicle deactivated successfully");
      fetchVehicleList();
    } catch {
      toast.error("Failed to deactivate vehicle");
    }
  };

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      Header: "Sl. No",
      Cell: ({ row }) => row.index + 1,
    },
    { Header: "Vehicle ID", accessor: "vehicleId" },
    { Header: "Vehicle Type", accessor: "vehicleType" },
    { Header: "Owner Name", accessor: "ownerName" },
    { Header: "Owner Contact", accessor: "ownerContact" },
    { Header: "Vehicle Number", accessor: "vehicleNumber" },
    { Header: "Fastag Number", accessor: "fastagNumber" },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="flex gap-4">
          <button
            className="text-yellow-600 "
            onClick={() => handleViewVehicle(row.original.vehicleId)}
          >
            <FaEye className="text-lg" />
          </button>

          <button
            className="text-green-600"
            onClick={() => handleEditVehicle(row.original.vehicleId)}
          >
            <FaEdit className="text-lg"/>
          </button>

          <button
            className="text-red-600"
            onClick={() => handleDeactivateVehicle(row.original.vehicleId)}
          >
            <FaTimes className="text-lg"/>
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
        data={data}
        pageIndex={page}
        pageSize={pageSize}
        totalCount={total}
        totalPages={totalPages}
        setPageIndex={setPage}
        setPageSize={setPageSize}
      />

      {/* VIEW MODAL */}
      <ViewVehicleDetailsModal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        formData={selectedVehicle}
      />

      {/* UPDATE MODAL */}
     <UpdateVehicleDetailsModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        formData={selectedVehicle}
        handleEditParking={handleUpdateVehicle}
      />

    </div>
  );
};

export default VehicleListTable;
