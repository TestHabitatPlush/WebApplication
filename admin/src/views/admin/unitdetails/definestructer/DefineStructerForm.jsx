import React, { useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import BuildingHandler from "../../../../handlers/BuildingHandler";
import FloorHandler from "../../../../handlers/FloorHandler";
import UnitTypeHandler from "../../../../handlers/building_management/UnitTypeHandler";

const CreateBuilding = () => {
  const { createBuildingHandler } = BuildingHandler();
  const [building, setBuilding] = useState("");

  const handleBuildingSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBuildingHandler(building);
      console.log(res);
      setBuilding("");
    } catch (error) {
      console.error("Error creating building:", error);
    }
  };
  return (
    <form
      onSubmit={handleBuildingSubmit}
      className="  items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg grid grid-cols-4"
    >
 <label className="flex flex-col float-end ">
  <span>Define Tower/Building <span className="text-red-500">*</span></span>
  <span className="font-light text-xs mt-1">(e.g-Name / No.)</span>
 </label>
      <Input
        type="text"
        name="building"
        placeholder="Enter Tower/Building No."
        size="lg"
        value={building}
        onChange={(e) => setBuilding(e.target.value)}
      
      />
        <div className="flex justify-end w-full">
        <Button className="max-w-sm" type="submit" size="md">
          Submit
        </Button>
      </div>
    </form>
  );
};

const CreateFloor = () => {
  const [floors, setFloors] = useState("");
  const { createFloorHandler } = FloorHandler();

  const onFloorChange = (event) => {
    const { name, value } = event.target;
    if (name === "shortForm") {
      if (value.length > 4) {
        return;
      }
    }
    setFloors((prev) => ({ ...prev, [name]: value }));
  };

  const handleFloorsSubmit = async (e) => {
    e.preventDefault();
    console.log("Floors Submitted:", floors);
    await createFloorHandler(floors)
      .then((res) => {
        console.log(res);
        setFloors({ floorName: "", shortForm: "" }); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleFloorsSubmit}
      className=" items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg grid grid-cols-4"
    >
      <label>Define Floors <span className="text-red-500">*</span></label>
      <Input
        label="Enter Floor Name"
        type="text"
        name="floorName" 
        placeholder="Enter Define Floors"
        size="lg"
        value={floors.floorName}
        onChange={onFloorChange}
      />

      
      <Input 
        label="Short Form"
        type="text"
        maxlength="4"
        name="shortForm" 
        placeholder="Enter Short From (Max-4)"
        size="lg"
        value={floors.shortForm}
        onChange={onFloorChange}
      />
   
      <div className="flex justify-end w-full">
        <Button className="max-w-sm" type="submit" size="md">
          Submit
        </Button>
      </div>
    </form>
  );
};

const CreateUnitType = () => {
  const [unitType, setUnitType] = useState("");
  const { createUnitTypeHandler } = UnitTypeHandler();

  const handleUnitTypeSubmit = (e) => {
    console.log(unitType);
    e.preventDefault();
    createUnitTypeHandler(unitType)
      .then((res) => {
        console.log(res);
        setUnitType("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleUnitTypeSubmit}
      // className="grid grid-cols-3 gap-4 mb-4 bg-gray-100"
      className=" items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg grid grid-cols-4"
    >
 <label className="flex flex-col">
  <span>Define Unit Type <span className="text-red-500">*</span></span>
  <span className="font-light text-xs mt-1">(e.g. 1BHK, 2BHK, 3BHK) </span>
 </label>
 
      <Input
       type="text"
        name="unitTypeName"
        placeholder="Enter  Unit Type"
        size="lg"
        value={unitType}
        onChange={(e) => setUnitType(e.target.value)}
      />
    <div className="justify-end">
        <Button className="max-w-sm" type="submit" size="md">
          Submit
        </Button>
      </div>
    </form>
  );
};

const DefineStructerForm = () => {
  return (
    <div className="p-10 my-5 border rounded-lg space-y-5">
      <CreateBuilding />
      <CreateFloor />
      <CreateUnitType />
    </div>
  );
};

export default DefineStructerForm;
