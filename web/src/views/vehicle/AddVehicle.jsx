"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaTimes } from "react-icons/fa";
import VehicleHandler from "@/handlers/VehicleHandler";
import UnitHandler from "@/handlers/UnitHandler";
import Button from "@/components/ui/Button";

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      {...props}
      className="px-3 py-2 border rounded"
    />
  </div>
);

const AddVehicle = () => {
  const { createVehicleByUserHandler } = VehicleHandler();
  const { getUnitsHandler } = UnitHandler();

  const societyId = useSelector(
    (state) => state.society.selectedSocietyId
  );

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [unitId, setUnitId] = useState("");

  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    ownerName: "",
    ownerContact: "",
    fastagNumber: "",
  });

  useEffect(() => {
    if (!open) return;

    const fetchUnits = async () => {
      const data = await getUnitsHandler();
      setUnits(data);
    };

    fetchUnits();
  }, [open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!unitId) return alert("Please select a unit");

    setLoading(true);
    try {
      await createVehicleByUserHandler(unitId, {
        ...form,
        societyId, // REQUIRED by backend
      });

      setForm({
        vehicleNumber: "",
        vehicleType: "",
        ownerName: "",
        ownerContact: "",
        fastagNumber: "",
      });

      setUnitId("");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded"
      >
        <FaPlus /> Add Vehicle
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg p-6 bg-white rounded">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Add Vehicle</h2>
              <FaTimes onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* UNIT DROPDOWN */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Select Unit</label>
                <select
                  value={unitId}
                  onChange={(e) => setUnitId(e.target.value)}
                  className="px-3 py-2 border rounded"
                  required
                >
                  <option value="">-- Select Unit --</option>
                  {Array.isArray(units) &&
                    units.map((unit) => (
                      <option key={unit.unitId} value={unit.unitId}>
                        {unit.unitName}
                      </option>
                    ))}
                </select>
              </div>

              <Input label="Vehicle Number" name="vehicleNumber" onChange={handleChange} required />
              <Input label="Vehicle Type" name="vehicleType" onChange={handleChange} required />
              <Input label="FASTag Number" name="fastagNumber" onChange={handleChange} />
              <Input label="Owner Name" name="ownerName" onChange={handleChange} required />
              <Input label="Owner Contact" name="ownerContact" onChange={handleChange} required />

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Vehicle"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVehicle;
