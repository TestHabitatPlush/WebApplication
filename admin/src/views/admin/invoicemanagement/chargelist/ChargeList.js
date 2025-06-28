import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";

const ChargeList = () => {
  const paths = ["User", "Charge List"];
  const Heading = ["Charge List"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <ChargeListdataTable />
    </div>
  );
};

export default ChargeList;

const ChargeListdataTable = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Charge Type Name
              </th>
              <th scope="col" className="px-6 py-3">
                Charge Applicability
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">Maintenance</td>
              <td className="px-6 py-4">Immidiate</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
