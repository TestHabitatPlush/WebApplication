import React from "react";
import Button from "../../../../../components/ui/Button";

const DefineTypeOfEntry = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>Define Type of Entry</div>
        <div>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-[15px] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Type of Entry</option>
            <option>Approved</option>
            <option>Unapproved</option>
          </select>
        </div>
        <div>
          <Button className="max-w-sm" type="submit" size="md">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DefineTypeOfEntry;
