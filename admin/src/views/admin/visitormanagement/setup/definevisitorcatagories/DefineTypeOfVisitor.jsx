import React from "react";
import Button from "../../../../../components/ui/Button";

const DefineTypeOfVisitor = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>Define Type Of Visitor </div>
        <div>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 mb-[15px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select Type Of Visitor</option>
            <option>Recurring</option>
            <option>One Time</option>
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

export default DefineTypeOfVisitor;
