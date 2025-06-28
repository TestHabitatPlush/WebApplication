import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";
import BuildingHandler from "../../../../handlers/BuildingHandler";
import Select from "../../../../components/ui/Select";
import FloorHandler from "../../../../handlers/FloorHandler";
import UnitTypeHandler from "../../../../handlers/building_management/UnitTypeHandler";

const DefineUnitForm = () => {
  const { CreateDefineUnitHandler } = DefineUnitHandler();
  const { getFloorHandler } = FloorHandler();
  const { getUnitTypeHandler } = UnitTypeHandler();
  const { getBuildingshandler } = BuildingHandler();

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);
  const [unitTypeOptions, setUnitTypeOptions] = useState([]);

  const [unitName, setUnitName] = useState({
    buildingId: "",
    floorId: "",
    unitNumber: "",
  });

  const [defineUnit, setDefineUnit] = useState({
    buildingId: "",
    floorId: "",
    unitTypeId: "",
    unitNumber: "",
    unitsize: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getBuildings();
    getFloors();
    getUnitTypes();
  }, []);

  const getBuildings = () => {
    getBuildingshandler()
      .then((res) => {
        const optionData = res.data.data.map((el) => ({
          label: el.buildingName,
          value: el.buildingId,
        }));
        setBuildingOptions([{ label: "Select Building", value: "" }, ...optionData]);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
        toast.error("Failed to load buildings");
      });
  };

  const getFloors = () => {
    getFloorHandler()
      .then((res) => {
        const optionData = res.data.data.map((el) => ({
          label: `${el.floorName} (${el.shortForm})`,
          value: el.floorId,
          shortForm: el.shortForm,
        }));
        setFloorOptions([{ label: "Select Floor", value: "" }, ...optionData]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load floors");
      });
  };

  const getUnitTypes = () => {
    getUnitTypeHandler()
      .then((res) => {
        const optionData = res.data.data.map((el) => ({
          label: el.unitTypeName,
          value: el.unitTypeId,
        }));
        setUnitTypeOptions([{ label: "Select Unit Type", value: "" }, ...optionData]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load unit types");
      });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!defineUnit.buildingId) newErrors.buildingId = "Building is required.";
    if (!defineUnit.floorId) newErrors.floorId = "Floor is required.";
    if (!defineUnit.unitTypeId) newErrors.unitTypeId = "Unit Type is required.";

    if (!defineUnit.unitNumber) {
      newErrors.unitNumber = "Unit Number is required.";
    } else if (!/^\d+$/.test(defineUnit.unitNumber)) {
      newErrors.unitNumber = "Unit Number must be digits only.";
    }

    if (!defineUnit.unitsize) {
      newErrors.unitsize = "Unit Size is required.";
    } else if (!/^\d+(\.\d+)?$/.test(defineUnit.unitsize)) {
      newErrors.unitsize = "Unit Size must be a valid number (e.g., 1000 or 1000.5).";
    }

    setErrors(newErrors);

    const errorMessages = Object.values(newErrors);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0]); // show only the first error
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit({
      ...defineUnit,
      [name]: value,
    });
  };

  const resetFormData = () => {
    setDefineUnit({
      buildingId: "",
      floorId: "",
      unitTypeId: "",
      unitNumber: "",
      unitsize: "",
    });
    setUnitName({
      buildingId: "",
      floorId: "",
      unitNumber: "",
    });
    setErrors({});
  };

  const submitHandler = async () => {
    if (!validateFields()) return;

    const unitNameStr = unitName.buildingId + unitName.floorId + unitName.unitNumber;
    try {
      const res = await CreateDefineUnitHandler({ unitName: unitNameStr, ...defineUnit });
      if (res.status === 201) {
        toast.success("Unit created successfully!");
        resetFormData();
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create unit. Please try again.");
    }
  };

  const onBuildingChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit({ ...defineUnit, [name]: value });
    const selected = buildingOptions.find((el) => el.value === parseInt(value));
    setUnitName((prev) => ({ ...prev, buildingId: selected?.label?.toUpperCase() || "" }));
  };

  const onFloorChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit({ ...defineUnit, [name]: value });
    const selected = floorOptions.find((el) => el.value === parseInt(value));
    setUnitName((prev) => ({ ...prev, floorId: selected?.shortForm?.toUpperCase() || "" }));
  };

  const onUnitNumberChange = (e) => {
    const { name, value } = e.target;
    setDefineUnit({ ...defineUnit, [name]: value });
    setUnitName((prev) => ({ ...prev, unitNumber: value }));
  };

  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="grid items-center grid-cols-3 gap-5 py-6">
        <Select
          label={<div>Tower / Building (Name / No.) <span className="text-red-500">*</span></div>}
          options={buildingOptions}
          value={defineUnit.buildingId}
          onChange={onBuildingChange}
          name="buildingId"
          error={errors.buildingId}
        />
        <Select
          label={<div>Select Floor<span className="text-red-500">*</span></div>}
          options={floorOptions}
          value={defineUnit.floorId}
          onChange={onFloorChange}
          name="floorId"
          error={errors.floorId}
        />
        <Select
          label={<div>Unit Type<span className="text-red-500">*</span></div>}
          options={unitTypeOptions}
          value={defineUnit.unitTypeId}
          onChange={handleChange}
          name="unitTypeId"
          error={errors.unitTypeId}
        />
        <Input
          label={<div>Unit Number<span className="text-red-500">*</span></div>}
          type="text"
          name="unitNumber"
          placeholder="Enter Unit No"
          value={defineUnit.unitNumber}
          onChange={onUnitNumberChange}
          error={errors.unitNumber}
        />
        <Input
          label={<div>Unit Size (Sq.feet)<span className="text-red-500">*</span></div>}
          type="text"
          name="unitsize"
          placeholder="Enter Super Built-up Area"
          value={defineUnit.unitsize}
          onChange={handleChange}
          error={errors.unitsize}
        />
        <div>
          <h3><strong>Unit Name</strong>: {`${unitName.buildingId}${unitName.floorId}${unitName.unitNumber}`}</h3>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button className="max-w-sm" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DefineUnitForm;
