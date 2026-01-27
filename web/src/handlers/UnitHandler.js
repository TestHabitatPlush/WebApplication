"use client";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUnitsServices } from "@/services/unitService";

const UnitHandler = () => {
  const token = useSelector((state) => state.auth?.token);
  const societyId = useSelector(
    (state) => state.society.selectedSocietyId
  );

  const getUnitsHandler = async () => {
    if (!societyId) {
      toast.error("Society not selected");
      return [];
    }

    try {
      const res = await getUnitsServices(societyId, token);

      const units =
        res?.data?.units ||
        res?.data?.data?.units ||
        res?.data?.data ||
        res?.data ||
        [];

      return Array.isArray(units) ? units : [];
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch units");
      return [];
    }
  };

  return { getUnitsHandler };
};

export default UnitHandler;
