import { React, useState } from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";
import GateHandler from "../../../../handlers/GateHandler";

const DefineGate = () => {
  const [gateName, setGateName] = useState("");
  const [gateNumber, setGateNumber] = useState("");
  const [showAllGates, setShowAllGates] = useState([]);
  const [error, setError] = useState("");
  const paths = ["Gate Management", "Define Gate"];
  const Heading = ["Define Gate"];
  const { GateRelationshipHandler } = GateHandler();

  const addGateHandler = () => {
    if (!gateName.trim() || !gateNumber.trim()) {
      setError("Both Gate Name and Gate Number are required.");
      return;
    }

    const parsedGateNumber = parseInt(gateNumber, 10);
    if (isNaN(parsedGateNumber) || parsedGateNumber <= 0) {
      setError("Gate Number must be a valid positive number.");
      return;
    }

    setShowAllGates([
      ...showAllGates,
      { gateName, gateNumber: parsedGateNumber },
    ]);
    setGateName("");
    setGateNumber("");
    setError("");
  };

  const removeGateHandler = (indexToRemove) => {
    setShowAllGates((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async () => {
    if (showAllGates.length === 0) {
      setError("Please add at least one gate.");
      return;
    }

    try {
      // console.log(showAllGates);
      await GateRelationshipHandler(showAllGates);
      setShowAllGates([]);
      toast.success("Gates added successfully.");
      setError("");
    } catch (err) {
      toast.error("Failed to submit gates.");
      console.error(err.message);
    }
  };

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-center">
          <div className="col-span-1">
            <label className="font-medium text-gray-600">Gate Name</label>
            <Input
              value={gateName}
              onChange={(e) => setGateName(e.target.value)}
              type="text"
              placeholder="Enter gate name"
              size="lg"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium text-gray-600">Gate Number</label>
            <Input
              value={gateNumber}
              onChange={(e) => setGateNumber(e.target.value)}
              placeholder="Enter gate number"
              size="lg"
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <Button onClick={addGateHandler} className="flex items-center">
              <FaPlus className="mr-2" /> Add Gate
            </Button>
          </div>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mt-4">
          {showAllGates.map((gate, index) => (
            <div
              key={index}
              className="relative p-4 mb-4 border rounded-lg bg-white shadow-md"
            >
              <MdOutlineCancel
                onClick={() => removeGateHandler(index)}
                className="absolute right-3 top-3 text-red-600 cursor-pointer text-xl"
              />
              <p className="font-medium text-gray-700">
                <strong>Gate {index + 1}:</strong> {gate.gateName} (Number:{" "}
                {gate.gateNumber})
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto mt-6 flex justify-center">
          <Button onClick={handleSubmit} size="md">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DefineGate;