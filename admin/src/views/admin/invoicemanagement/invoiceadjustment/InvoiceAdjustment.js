import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";

const InvoiceAdjustment = () => {
  const paths = ["User", "Invoice Adjustment"];
  const Heading = ["Invoice Adjustment"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <InvoiceAdjustmentsearch />
      <InvoiceAdjustmentdataTable />
    </div>
  );
};

export default InvoiceAdjustment;

const InvoiceAdjustmentsearch = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Income Report
      </div>
      <div className="grid grid-cols-3 gap-4 items-center">
        <Input
          label={<div>View By All :</div>}
          type="text"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        <Input
          label={<div>View By Block :</div>}
          type="text"
          placeholder={"View By Amount"}
          size={"lg"}
        />
        <Input
          label={<div>View By Unit Number :</div>}
          type="text"
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
          className="bg-gray-300"
        />
      </div>
    </div>
  );
};

const InvoiceAdjustmentdataTable = () => {
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
                Invoice No
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Due Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Invoice Bill Details
              </th>
              <th scope="col" className="px-6 py-3">
                Adjustment Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Due Amount (As per Total Due amount)
              </th>
              <th scope="col" className="px-6 py-3">
                Remarks
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
