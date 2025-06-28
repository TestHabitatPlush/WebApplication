import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";

const DefaulterList = () => {
  const paths = ["User", "Defaulter List"];
  const Heading = ["Defaulter List"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <DefaulterListsearch />
      <DefaulterListdataTable />
      <DefaultListNotice />
    </div>
  );
};

export default DefaulterList;

const DefaulterListsearch = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Income Report
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <Input
          label={<div>View By All :</div>}
          type="number"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        <Input
          label={<div>View By Block :</div>}
          type="number"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        <Input
          label={<div>View By Unit Number :</div>}
          type="number"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        <Input
          label={<div>View By Amount :</div>}
          type="number"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        {/* Total Amount Automaticaly Fetch */}
        <Input
          label={<div>Total Due Amount</div>}
          type="number"
          placeholder={"Total Due Amount"}
          size={"lg"}
        />
      </div>
    </div>
  );
};

const DefaulterListdataTable = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Invoice Posting
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Unit Number
              </th>
              <th scope="col" className="px-6 py-3">
                Primary Contact Name
              </th>
              <th scope="col" className="px-6 py-3">
                Primary Contact Number
              </th>
              <th scope="col" className="px-6 py-3">
                Bill to Party Name
              </th>
              <th scope="col" className="px-6 py-3">
                Due Amount (As per Total Due amount)
              </th>
              <th scope="col" className="px-6 py-3">
                View Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">PV-1</td>
              <td className="px-6 py-4">Rs 600</td>
              <td className="px-6 py-4">Parking Fee </td>
              <td className="px-6 py-4">Rs 600</td>
              <td className="px-6 py-4">0 </td>
              <td className="px-6 py-4">view </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DefaultListNotice = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Notifications
      </div>
      <div className="flex flex-row items-center">
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
          Send Notification to Defaulters
        </label>
      </div>
      <div className="flex flex-row">
        <button
          type="button"
          className="text-white bg-turquoise_lite hover:bg-turquoise  font-medium rounded-lg text-sm px-5 py-[16px] mt-2 "
        >
          Send Email
        </button>
      </div>
    </div>
  );
};
