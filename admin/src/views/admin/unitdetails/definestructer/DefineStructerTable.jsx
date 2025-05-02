import React from "react";

const DefineStructerTable = () => {
  return (
    <div className="flex mt-[35px]">
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs bg-lime text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tower/Building(Name / No.)
              </th>
              <th scope="col" className="px-6 py-3">
                Floors
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Type(e.g. 1BHK, 2BHK, 3BHK ...)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">moon</td>
              <td className="px-6 py-4">12</td>
              <td className="px-6 py-4">1bhk</td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">moon</td>
              <td className="px-6 py-4">13</td>
              <td className="px-6 py-4">3bhk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DefineStructerTable;
