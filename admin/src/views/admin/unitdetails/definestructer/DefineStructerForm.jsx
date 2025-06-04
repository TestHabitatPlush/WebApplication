import React, { useEffect, useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import BuildingHandler from "../../../../handlers/BuildingHandler";
import FloorHandler from "../../../../handlers/FloorHandler";
import UnitTypeHandler from "../../../../handlers/building_management/UnitTypeHandler";
import { FaTimes, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const DefineStructureForm = () => {
  const {
    getBuildingshandler,
    createBuildingHandler,
    deleteBuildingHandler,
    updateBuildingHandler,
  } = BuildingHandler();

  const {
    createFloorHandler,
    deleteFloorHandler,
    getFloorHandler,
    updateFloorHandler,
  } = FloorHandler();

  const {
    createUnitTypeHandler,
    deleteUnitTypeHandler,
    updateUnitTypeHandler,
    getUnitTypeHandler,
  } = UnitTypeHandler();

  const [token] = useState(localStorage.getItem("token"));
  const [buildings, setBuildings] = useState([]);
  const [newBuilding, setNewBuilding] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ buildingId: null, buildingName: "" });

  const [floors, setFloors] = useState({ floorName: "", shortForm: "" });
  const [allFloors, setAllFloors] = useState([]);
  const [editFloorMode, setEditFloorMode] = useState(false);
  const [editFloorData, setEditFloorData] = useState({ floorId: null, floorName: "", shortForm: "" });

  const [unitType, setUnitType] = useState("");
  const [unitTypes, setUnitTypes] = useState([]);
  const [editUnitTypeMode, setEditUnitTypeMode] = useState(false);
  const [editUnitTypeData, setEditUnitTypeData] = useState({ unitTypeId: null, unitTypeName: "" });

  const fetchBuildings = async () => {
    try {
      const res = await getBuildingshandler();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setBuildings(data);
    } catch {
      toast.error("Failed to fetch buildings");
    }
  };

  const fetchFloors = async () => {
    try {
      const res = await getFloorHandler();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setAllFloors(data);
    } catch {
      toast.error("Failed to fetch floors");
    }
  };

  const fetchUnitType = async () => {
    try {
      const res = await getUnitTypeHandler();
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      setUnitTypes(data);
    } catch {
      toast.error("Failed to fetch unit types");
    }
  };

  useEffect(() => {
    fetchBuildings();
    fetchFloors();
    fetchUnitType();
  }, []);

  const handleCreateBuilding = async (e) => {
    e.preventDefault();
    if (!newBuilding.trim()) return toast.warning("Enter a building name");

    try {
      const res = await createBuildingHandler(newBuilding);
      if (res?.data?.data) {
        setBuildings((prev) => [...prev, res.data.data]);
        setNewBuilding("");
        toast.success("Building created");
      }
    } catch {
      toast.error("Creation failed");
    }
  };

  const handleEdit = (building) => {
    setEditMode(true);
    setEditData({ buildingId: building.buildingId, buildingName: building.buildingName });
  };

  const handleEditFloor = (floor) => {
    setEditFloorMode(true);
    setEditFloorData({ floorId: floor.floorId, floorName: floor.floorName, shortForm: floor.shortForm });
  };

  const handleEditUnitType = (unit) => {
    setEditUnitTypeMode(true);
    setEditUnitTypeData({ unitTypeId: unit.unitTypeId, unitTypeName: unit.unitTypeName });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateBuildingHandler(editData);
      if (res?.buildingId) {
        setBuildings((prev) =>
          prev.map((b) => (b.buildingId === res.buildingId ? res : b))
        );
        toast.success("Building updated");
        setEditMode(false);
        setEditData({ buildingId: null, buildingName: "" });
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleUpdateFloorSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateFloorHandler(editFloorData);
      if (res?.floorId) {
        setAllFloors((prev) =>
          prev.map((f) => (f.floorId === res.floorId ? res : f))
        );
        toast.success("Floor updated");
        setEditFloorMode(false);
        setEditFloorData({ floorId: null, floorName: "", shortForm: "" });
      }
    } catch {
      toast.error("Failed to update floor");
    }
  };

  const handleUpdateUnitTypeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUnitTypeHandler(editUnitTypeData);
      if (res?.unitTypeId) {
        setUnitTypes((prev) =>
          prev.map((u) => (u.unitTypeId === res.unitTypeId ? res : u))
        );
        toast.success("Unit type updated");
        setEditUnitTypeMode(false);
        setEditUnitTypeData({ unitTypeId: null, unitTypeName: "" });
      }
    } catch {
      toast.error("Failed to update unit type");
    }
  };

  const handleDelete = async (type, id) => {
    try {
     if (!window.confirm(`Delete this ${type}?`)) return;

      switch (type) {
        case "building":
          await deleteBuildingHandler(id, token);
          setBuildings((prev) => prev.filter((b) => b.buildingId !== id));
          toast.success("Building deleted");
          break;
        case "floor":
          await deleteFloorHandler(id, token);
          setAllFloors((prev) => prev.filter((f) => f.floorId !== id));
          toast.success("Floor deleted");
          break;
        case "unit":
          await deleteUnitTypeHandler(id, token);
          setUnitTypes((prev) => prev.filter((u) => u.unitTypeId !== id));
          toast.success("Unit type deleted");
          break;
        default:
          toast.error("Unknown type");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete");
    }
  };

  const handleFloorsSubmit = async (e) => {
    e.preventDefault();
    if (!floors.floorName.trim() || !floors.shortForm.trim()) {
      toast.warning("Please fill in all required fields");
      return;
    }
    try {
      const res = await createFloorHandler(floors);
      if (res?.data?.data) {
        setAllFloors((prev) => [...prev, res.data.data]);
      }
      toast.success("Floor created successfully");
      setFloors({ floorName: "", shortForm: "" });
    } catch {
      toast.error("Failed to create floor");
    }
  };

  const onFloorChange = (e) => {
    const { name, value } = e.target;
    if (name === "shortForm" && value.length > 4) return;
    const setter = editFloorMode ? setEditFloorData : setFloors;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnitTypeSubmit = async (e) => {
    e.preventDefault();
    if (editUnitTypeMode) {
      handleUpdateUnitTypeSubmit(e);
      return;
    }
    if (!unitType.trim()) {
      toast.warning("Please enter a unit type");
      return;
    }
    try {
      const res = await createUnitTypeHandler(unitType);
      if (res?.data?.data) {
        setUnitTypes((prev) => [...prev, res.data.data]);
      }
      toast.success("Unit type created");
      setUnitType("");
    } catch {
      toast.error("Failed to create unit type");
    }
  };

  return (
    <div className="p-10 my-5 space-y-8 border rounded-lg shadow-md bg-gray-50">

      {/* Building Form */}
      <form onSubmit={editMode ? handleUpdateSubmit : handleCreateBuilding} className="grid items-end grid-cols-4 gap-4 p-5 bg-white rounded-md shadow-sm">
        <label className="col-span-1 mt-4 mb-8 text-sm font-semibold text-gray-700">
          {editMode ? "Edit Building" : "Define Building"} <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          label="Enter Building Name"
          value={editMode ? editData.buildingName : newBuilding}
          placeholder="Enter building name"
          onChange={(e) =>
            editMode
              ? setEditData((prev) => ({ ...prev, buildingName: e.target.value }))
              : setNewBuilding(e.target.value)
          }
          className="col-span-2"
          size="lg"
        />
        <Button className="w-full mb-4" type="submit" size="lg">
          {editMode ? "Update" : "Submit"}
        </Button>
      </form>

      {/* Floor Form */}
      <form onSubmit={editFloorMode ? handleUpdateFloorSubmit : handleFloorsSubmit} className="grid grid-cols-4 gap-4 p-5 bg-white rounded-md shadow-sm">
        <label className="col-span-1 mt-8 text-sm font-semibold text-gray-700">
          {editFloorMode ? "Edit Floor" : "Define Floors"} <span className="text-red-500">*</span>
        </label>
        <Input
          label="Enter Floor Name"
          type="text"
          name="floorName"
          placeholder="Enter Floor Name"
          size="lg"
          value={editFloorMode ? editFloorData.floorName : floors.floorName}
          onChange={onFloorChange}
          className="col-span-1"
        />
        <Input
          label="Short Form (Max-4 characters)"
          type="text"
          name="shortForm"
          placeholder="Enter Short Form"
          size="lg"
          maxLength="4"
          value={editFloorMode ? editFloorData.shortForm : floors.shortForm}
          onChange={onFloorChange}
          className="col-span-1"
        />
        <Button className="w-full mt-8 mb-4" type="submit" size="lg">
          {editFloorMode ? "Update" : "Submit"}
        </Button>
      </form>

      {/* Unit Type Form */}
      <form onSubmit={handleUnitTypeSubmit} className="grid grid-cols-4 gap-4 p-5 bg-white rounded-md shadow-sm">
        <label className="col-span-1 mt-8 text-sm font-semibold text-gray-700">
          {editUnitTypeMode ? "Edit Unit Type" : "Define Unit Type"} <span className="text-red-500">*</span>
          <span className="block text-xs font-light text-gray-500">(e.g. 1BHK, 2BHK)</span>
        </label>
        <Input
          type="text"
          name="unitTypeName"
          placeholder="Enter Unit Type"
          label="Enter Unit Type"
          size="lg"
          value={editUnitTypeMode ? editUnitTypeData.unitTypeName : unitType}
          onChange={(e) =>
            editUnitTypeMode
              ? setEditUnitTypeData((prev) => ({ ...prev, unitTypeName: e.target.value }))
              : setUnitType(e.target.value)
          }
          className="col-span-2 mt-1"
        />
        <Button className="w-full mt-8 mb-4" type="submit" size="lg">
          {editUnitTypeMode ? "Update" : "Submit"}
        </Button>
      </form>

      {/* Display Section */}
      <section>
        <h2 className="mb-6 text-3xl font-extrabold text-gray-800">View Structure Data</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Buildings */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-green-900">Buildings</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {[...buildings].reverse().map((bld) => (
                <div key={bld.buildingId} className="relative p-4 border border-blue-200 rounded-xl bg-gradient-to-br from-blue-50 to-white hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-blue-800">{bld.buildingName}</h4>
                    <span className="px-2 py-0.5 text-xs text-white bg-blue-500 rounded-full">Building</span>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button onClick={() => handleEdit(bld)} title="Edit">
                      <FaEdit className="text-green-600 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete("building", bld.buildingId)} title="Delete">
                      <FaTimes className="text-red-600 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floors */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-green-900">Floors</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {[...allFloors].reverse().map((floor) => (
                <div key={floor.floorId} className="relative p-4 border border-green-200 rounded-xl bg-gradient-to-br from-green-50 to-white hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-green-800">
                      {floor.floorName} <span className="text-sm text-gray-500">({floor.shortForm})</span>
                    </h4>
                    <span className="px-2 py-0.5 text-xs text-white bg-green-500 rounded-full">Floor</span>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button onClick={() => handleEditFloor(floor)} title="Edit">
                      <FaEdit className="text-green-600 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete("floor", floor.floorId)} title="Delete">
                      <FaTimes className="text-red-600 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unit Types */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-green-900">Unit Types</h3>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {[...unitTypes].reverse().map((unit) => (
                <div key={unit.unitTypeId} className="relative p-4 border border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-white hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-yellow-800">{unit.unitTypeName}</h4>
                    <span className="px-2 py-0.5 text-xs text-white bg-yellow-500 rounded-full">Unit</span>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button onClick={() => handleEditUnitType(unit)} title="Edit">
                      <FaEdit className="text-green-600 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete("unit", unit.unitTypeId)} title="Delete">
                      <FaTimes className="text-red-600 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default DefineStructureForm;
