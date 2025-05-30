import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import FloorHandler from "../../../../../handlers/FloorHandler";
import BuildingHandler from "../../../../../handlers/BuildingHandler";
import Select from "../../../../../components/ui/Select";
import Button from "../../../../../components/ui/Button";
import DefineUnitHandler from "../../../../../handlers/DefineUnitHandler";
import Input from "../../../../../components/shared/Input";
import UnitTypeHandler from "../../../../../handlers/building_management/UnitTypeHandler";

const UnitAllocationForUser = () => {
  const { getFloorHandler } = FloorHandler();
  const { getBuildingshandler } = BuildingHandler();

  const [buildingOptions, setBuildingOptions] = useState([]);
  const [floorOptions, setFloorOptions] = useState([]);

  const [unitName, setUnitName] = useState({
    buildingId: "",
    floorId: "",
    unitNumber: "",
  });

    const [units, setUnits] = useState([]);

  const getBuildings = () => {
    getBuildingshandler()
      .then((res) => {
        console.log(res);
        const optionData = res.data.data.map((el) => ({
          label: el.buildingName,
          value: el.buildingId,
        }));
        console.log(optionData);
        setBuildingOptions([
          { label: "Select Building", value: "" },
          ...optionData,
        ]);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  };

  const getFloors = () => {
    getFloorHandler()
      .then((res) => {
        console.log(res);
        const optionData = res.data.data.map((el) => ({
          label: `${el.floorName} (${el.shortForm})`,
          value: el.floorId,
          shortForm: el.shortForm,
        }));

        setFloorOptions([{ label: "Select Floor", value: "" }, ...optionData]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBuildings();
    getFloors();
  }, []);

  const [defineUnit, setDefineUnit] = useState({
    buildingId: "",
    floorId: "",
    unitNumber: "",
  });

  const resetFormData = () => {
    setDefineUnit({
      buildingId: "",
      floorId: "",
      unitNumber: "",
    });
    setUnitName({
      buildingId: "",
      floorId: "",
      unitNumber: "",
    });
  };

  const submitHandler = async () => {
    console.log("define unit", defineUnit);
      const un = unitName.buildingId + unitName.floorId + unitName.unitNumber;
      setUnits((prev) => [...prev, un]);
      resetFormData();
    
    //   await CreateDefineUnitHandler({ unitName: un, ...defineUnit })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       console.log(res);
    //       resetFormData();
    //     }
    //   })
    //   .catch((err) => {});
  };

  const onBuildingChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDefineUnit({
      ...defineUnit,
      [name]: value,
    });
    const id = parseInt(value);
    const bName = buildingOptions.find((el) => el.value === id);
    setUnitName((prev) => ({ ...prev, buildingId: bName.label.toUpperCase() }));
  };

  function onFloorChange(e) {
    const { name, value } = e.target;
    setDefineUnit({
      ...defineUnit,
      [name]: value,
    });
    const id = parseInt(value);
    const bName = floorOptions.find((el) => el.value === id);
    setUnitName((prev) => ({
      ...prev,
      floorId: bName.shortForm.toUpperCase(),
    }));
  }

  function onUnitNumberChange(e) {
    const { name, value } = e.target;
    setDefineUnit({
      ...defineUnit,
      [name]: value,
    });
    setUnitName((prev) => ({
      ...prev,
      unitNumber: value,
    }));
  }

  return (
    <div className="my-5 rounded-lg ">
      <div className="grid items-center grid-cols-3 gap-5 py-6">
        <Select
          label="Tower /Building (Name / No.)"
          options={buildingOptions}
          value={defineUnit.buildingId}
          onChange={onBuildingChange}
          name="buildingId"
          color="blue"
          size="md"
          className="py-[14px]"
        />
        <Select
          label="Select Floor"
          options={floorOptions}
          value={defineUnit.floorId}
          onChange={onFloorChange}
          name="floorId"
          color="blue"
          size="md"
          className="py-[14px]"
        />
        <Input
          label={"Unit Number"}
          type="text"
          name="unitNumber"
          placeholder="Enter Unit No"
          size="lg"
          value={defineUnit.unitNumber}
          onChange={onUnitNumberChange}
        />
        <div>
          <h3 className="">
            <strong>Unit Name</strong> :{" "}
            {`${unitName.buildingId}${unitName.floorId}${unitName.unitNumber}`}{" "}
          </h3>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          className="max-w-sm"
          type="submit"
          onClick={submitHandler}
          size="lg"
        >
          Add Unit
        </Button>
      </div>

      <div className="mt-5">
        <h5>Unit Names List</h5>
        <div className="grid grid-cols-3 gap-3 py-5">
          {units.map((el) => (
            <div className="p-2 text-center bg-gray-200 border rounded-md">
              <span className="font-bold text-turquoise">{el}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitAllocationForUser;
