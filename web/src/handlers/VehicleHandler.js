"use client";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  createVehicleByUserService,
  getVehicleByUserService,
  deleteVehicleByIdService,
} from "@/services/vehicleService";

const VehicleHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);

  // ✅ CREATE VEHICLE
  const createVehicleByUserHandler = async (unitId, vehicleData) => {
    if (!unitId) {
      toast.error("Unit not selected");
      throw new Error("Unit ID missing");
    }

    const res = await createVehicleByUserService(
      userId,
      unitId,
      vehicleData,
      token
    );

    toast.success("Vehicle created successfully");
    return res?.data?.vehicle;
  };

  // ✅ GET VEHICLES (MATCHES BACKEND)
  const getVehicleByUserHandler = async () => {
    try {
      if (!userId) {
        toast.error("User not logged in");
        return [];
      }

      const res = await getVehicleByUserService(userId, token);

      // 🔥 BACKEND RETURNS { vehicles: [] }
      return Array.isArray(res?.data?.vehicles)
        ? res.data.vehicles
        : [];
    } catch (err) {
      if (err?.response?.status === 404) {
        return []; // No vehicles found
      }

      console.error(err);
      toast.error("Failed to load vehicles");
      return [];
    }
  };

  // ✅ DELETE VEHICLE
  const deleteVehicleHandler = async (vehicleId) => {
    try {
      await deleteVehicleByIdService(vehicleId, token);
      toast.success("Vehicle deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
      throw err;
    }
  };

  return {
    createVehicleByUserHandler,
    getVehicleByUserHandler,
    deleteVehicleHandler,
  };
};

export default VehicleHandler;
