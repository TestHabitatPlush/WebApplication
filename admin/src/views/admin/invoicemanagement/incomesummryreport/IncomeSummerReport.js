import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";

const IncomeSummerReport = () => {
  const paths = ["User", "Income Summary Report"];
  const Heading = ["Income Summary Report"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <IncomeSummary />
    </div>
  );
};

export default IncomeSummerReport;

const IncomeSummary = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Income Report
      </div>
      <div className="grid grid-cols-5 gap-4 items-center">
        <div>
          <label
            for="countries"
            className="block  text-sm font-medium text-gray-900 dark:text-white"
          >
            View By
          </label>
          <select
            id="countries"
            className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="CA">All</option>
            <option value="FR">Block</option>
            <option value="DE">Unit Number</option>
          </select>
        </div>
        <Input
          label={<div>Start Date :</div>}
          type="date"
          // placeholder={"Enter Parking Slot Allocation"}
          size={"lg"}
        />
        <Input
          label={<div>End Date :</div>}
          type="date"
          // placeholder={"Enter Parking Slot Allocation"}
          size={"lg"}
        />
        <button
          type="button"
          className="text-white bg-turquoise_lite hover:bg-turquoise  font-medium rounded-lg text-sm px-5 py-[16px] mt-2 "
        >
          Show On Screen
        </button>
        <button
          type="button"
          className="text-white bg-turquoise_lite hover:bg-turquoise  font-medium rounded-lg text-sm px-5 py-[16px] mt-2 "
        >
          Export To Excel
        </button>
      </div>
    </div>
  );
};
