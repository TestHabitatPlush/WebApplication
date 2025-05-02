import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";

const VendorList = () => {
  const paths = ["User", "Vendor List"];
  const Heading = ["Vendor List"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <SearchVendor />
      <VendorTableData />
    </div>
  );
};

export default VendorList;

const SearchVendor = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl font-sans font-semibold text-lime">
        Search Vendors
      </div>
      <div className="grid grid-cols-4 gap-3 items-center py-4">
        <Input
          label={<div>Vendor ID</div>}
          type="text"
          placeholder={"Serch Vendor ID"}
          size={"lg"}
        />
        <Input
          label={<div>Vendor Name</div>}
          type="text"
          placeholder={"Serch Vendor Name"}
          size={"lg"}
        />
        <Input
          label={<div>Expenses Type :</div>}
          type="text"
          placeholder={"Search Expens Type"}
          size={"lg"}
        />
        <Input
          label={<div>Status</div>}
          type="text"
          placeholder={"Search Expens Type"}
          size={"lg"}
        />
      </div>
    </div>
  );
};

const VendorTableData = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Vendor I.D.
              </th>
              <th scope="col" className="px-6 py-3">
                Vendor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Vendor Legaltype
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-6 py-4">vendor1</td>
              <td className="px-6 py-4">Electronics</td>
              <td className="px-6 py-4">Active</td>
              <td className="px-6 py-4">karnataka</td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </th>
              <td className="px-6 py-4">vendor2</td>
              <td className="px-6 py-4">Plumber</td>
              <td className="px-6 py-4">Active</td>
              <td className="px-6 py-4">Karnataka</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
