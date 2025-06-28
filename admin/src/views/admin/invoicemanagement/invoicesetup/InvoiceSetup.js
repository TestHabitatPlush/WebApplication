import { React, useState } from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";

const InvoiceSetup = () => {
  const paths = ["user", "Invoice Setup"];
  const Heading = ["Invoice Setup"];
  return (
    <div>
      {" "}
      <div className="px-5">
        <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
          <UrlPath paths={paths} />
        </div>
        {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
        <PageHeading heading={Heading} />
        <InvoiceGeneration />
        <GstDetails />

        <PenaltyDetailsForm />
        <SendNotification />
      </div>
    </div>
  );
};

export default InvoiceSetup;

const PenaltyDetailsForm = () => {
  const [penalty, setPenalty] = useState(false);
  const penaltyEnterHandler = () => {
    setPenalty(true);
  };
  const penaltyLeaveHandler = () => {
    setPenalty(false);
  };
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Penalty Details
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div
          className="flex flex-row items-center relative"
          onMouseEnter={penaltyEnterHandler}
          onMouseLeave={penaltyLeaveHandler}
        >
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
          />
          <label
            for="link-checkbox"
            className="ms-2 text-lg font-base text-gray-900 "
          >
            Penalty Applicability “YES” or “NO”.
          </label>
          {penalty && (
            <div className="absolute top-10 left-5 bg-white p-3 border border-gray-300 rounded shadow-lg z-10 ">
              <div>
                Society can decide the applicability of Penalty / Late Payment
                fee as “YES” or “NO”
              </div>
              <div className="text-[15px] font-sans ">
                a. If “YES”/checked, Late Payment fee will be applied only to
                the units whose invoice is not Paid.
              </div>
              <div className="text-[15px] font-sans ">
                {" "}
                b. If ”NO”/ unchecked, Late Payment fee will not be applied.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          label={<div>Unit Rate</div>}
          type="text"
          placeholder={"Enter Penalty Amount"}
          size={"lg"}
        />
        <Input
          label={<div>Ignore Amount</div>}
          type="text"
          placeholder={"Enter Ignore Amount"}
          size={"lg"}
        />
        <Input
          label={<div>Grace Period</div>}
          type="text"
          placeholder={"Enter No of Calendar Days"}
          size={"lg"}
        />
        <Input
          label={<div>Intrest Start Date For Calculation</div>}
          type="Date"
          size={"lg"}
        />
      </div>
    </div>
  );
};

const InvoiceGeneration = () => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [submittedData, setSubmittedData] = useState({
    Rule1: [],
    Rule2: [],
    Rule3: [],
    Rule4: [],
  });

  // Handle dropdown change
  const handleSelectChange = (e) => {
    setSelectedRule(e.target.value);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setSelectedRule(null);
  };

  // Handle submit for each rule
  const handleSubmit = (rule, values) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      [rule]: values,
    }));
    alert(`Submitted values for ${rule}: ${values.join(", ")}`);
  };

  // Determine the number of input fields based on the selected rule
  const getInputFieldsCount = (rule) => {
    if (rule === "Rule1" || rule === "Rule2") return 2;
    if (rule === "Rule3" || rule === "Rule4") return 4;
    return 0;
  };
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Invoice Generation
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col ">
          <label
            for="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
            onChange={handleSelectChange}
            value={selectedRule || "default"}
          >
            <option value="default" disabled>
              Selected Rule Type
            </option>
            <option value="Rule1">Rule 1</option>
            <option value="Rule2">Rule 2</option>
            <option value="Rule3">Rule 3</option>
            <option value="Rule4">Rule 4</option>
          </select>

          {/* modal  */}
          <Modal
            isOpen={selectedRule === "Rule1"}
            onClose={handleCloseModal}
            title="Rule 1 Modal"
            content="This is the content for Rule 1."
            inputFields={getInputFieldsCount("Rule1")}
            onSubmit={(values) => handleSubmit("Rule1", values)}
          />
          <Modal
            isOpen={selectedRule === "Rule2"}
            onClose={handleCloseModal}
            title="Rule 2 Modal"
            content="This is the content for Rule 2."
            inputFields={getInputFieldsCount("Rule2")}
            onSubmit={(values) => handleSubmit("Rule2", values)}
          />
          <Modal
            isOpen={selectedRule === "Rule3"}
            onClose={handleCloseModal}
            title="Rule 3 Modal"
            content="This is the content for Rule 3."
            inputFields={getInputFieldsCount("Rule3")}
            onSubmit={(values) => handleSubmit("Rule3", values)}
          />
          <Modal
            isOpen={selectedRule === "Rule4"}
            onClose={handleCloseModal}
            title="Rule 4 Modal"
            content="This is the content for Rule 4."
            inputFields={getInputFieldsCount("Rule4")}
            onSubmit={(values) => handleSubmit("Rule4", values)}
          />
        </div>
        <Input
          label={<div>Type Of Unit</div>}
          type="text"
          placeholder={"Enter the Type"}
          size={"lg"}
        />
      </div>
      <div className="grid grid-cols-1 item-center">
        <GstApplicable />
      </div>
    </div>
  );
};

const GstApplicable = () => {
  const [isHover, setIsHover] = useState(false);
  const [exemption, setExemption] = useState(false);

  const mouseEnterHandler = () => {
    setIsHover(true);
  };
  const mouseLeaveHandler = () => {
    setIsHover(false);
  };
  const exsemptionEnterHandler = () => {
    setExemption(true);
  };
  const exsemptionLeaveHandler = () => {
    setExemption(false);
  };
  return (
    <div className="grid grid-cols-1 gap-4">
      <div
        className="flex flex-row items-center relative"
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
        />
        <label
          for="link-checkbox"
          className="ms-2 text-lg font-base text-gray-900 "
        >
          GST Applicability “YES” or “NO”.
        </label>{" "}
        {isHover && (
          <div className="absolute top-10 left-0 bg-white p-3 border border-gray-300 rounded shadow-lg z-10 ">
            <div>
              Society can decide the applicability of GST as “YES” or “NO”.
            </div>
            <div className="text-[15px] font-sans ">
              a. If “YES”/checked, GST will be applied only to the units whose
              monthly principal amount exceeds ₹ 7500. For units that have a
              monthly principal amount below ₹ 7500, GST will not apply.
            </div>
            <div className="text-[15px] font-sans ">
              {" "}
              b. If ”NO”/unchecked, GST will apply to ALL units, irrespective of
              the monthly principal amount.
            </div>
          </div>
        )}
      </div>
      <div
        className="flex flex-row items-center relative"
        onMouseEnter={exsemptionEnterHandler}
        onMouseLeave={exsemptionLeaveHandler}
      >
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
        />
        <label
          for="link-checkbox"
          className="ms-2 text-lg font-base text-gray-900 "
        >
          Exemption Applicability “YES” or “NO”.
        </label>
        {exemption && (
          <div className="absolute top-10 left-0 bg-white p-3 border border-gray-300 rounded shadow-lg z-10 ">
            <div>
              Society can decide the applicability of GST Exemption as “YES” or
              “NO”
            </div>
            <div className="text-[15px] font-sans ">
              a. If “YES”/checked, GST will be computed on the full Monthly
              Principal Amount. E.g., if the Monthly Principal Amount is ₹ 9000,
              GST will be calculated on ₹9000.
            </div>
            <div className="text-[15px] font-sans ">
              {" "}
              b. If ”NO”/ unchecked, first an exemption of ₹ 7500 will be
              applied on the Monthly Principal amount, on the remaining amount
              GST will be calculated. E.g., if the Monthly Principal Amount is ₹
              10000, GST will be calculated on ₹ 2500. (₹10000 - ₹ 7500)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const GstDetails = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        GST Details
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          label={<div>HSN Code</div>}
          type="text"
          placeholder={"Enter HSN Code"}
          size={"lg"}
        />
        <Input
          label={<div>GST %</div>}
          type="text"
          placeholder={"Enter GST %"}
          size={"lg"}
        />
      </div>
    </div>
  );
};

const SendNotification = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Penalty Details
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-row items-center ">
          <input
            id="link-checkbox"
            type="checkbox"
            value=""
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
          />
          <label
            for="link-checkbox"
            className="ms-2 text-lg font-base text-gray-900 "
          >
            Penalty Applicability “YES” or “NO”.
          </label>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, content, inputFields, onSubmit }) => {
  const [inputValues, setInputValues] = useState(
    Array(inputFields).fill("") // Create an array of empty strings based on number of input fields
  );

  // Handle input change for each input field
  const handleInputChange = (index, e) => {
    const newValues = [...inputValues];
    newValues[index] = e.target.value;
    setInputValues(newValues);
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(inputValues); // Pass all input values to onSubmit
    setInputValues(Array(inputFields).fill("")); // Reset all input fields after submit
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex  justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>{content}</p>

        {/* Render input fields dynamically */}
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full mt-4"
            placeholder={`Input ${index + 1}`}
            value={value}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}

        {/* Submit and Close Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
