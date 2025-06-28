import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";

const InvoiceScheduler = () => {
  const paths = ["user", "Invoice Scheduler"];
  const Heading = ["Invoice Scheduler"];
  return (
    <div>
      {" "}
      <div className="px-5">
        <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
          <UrlPath paths={paths} />
        </div>
        {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
        <PageHeading heading={Heading} />
        <InvoiceSchedulerForm />
        <InvoiceEffectiveDateDetails />
      </div>
    </div>
  );
};

export default InvoiceScheduler;

const InvoiceSchedulerForm = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Invoice Purpose and Frequency
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label={<div>Invoice Purpose Name:</div>}
          type="text"
          placeholder={"Enter the Name"}
          size={"lg"}
        />
        <div className="flex flex-row pt-[10px] items-center gap-4">
          <div>Invoice Freqency:</div>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-3 px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked className="text-lg" />

              <label className="text-lg">Once/One Time</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Monthly</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Quarterly</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label>Half Yearly</label>
            </div>
            <div className=" flex flex-row items-center gap-3  px-4 py-1 rounded-lg border bg-white">
              <input type="radio" name="drone" checked />

              <label> Yearly</label>
            </div>
          </div>
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
            Note: If you want to generate recurring invoice as per Charge
            Frequency please check the box.
          </label>
        </div>
      </div>
    </div>
  );
};

const InvoiceEffectiveDateDetails = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Invoice Effective Date Details
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          label={<div>Effective Date:</div>}
          type="date"
          placeholder={"Date"}
          size={"lg"}
        />
      </div>
      <div className="flex justify-center mt-5">
        <Button className="max-w-sm" type="submit" size="lg">
          Submit
        </Button>
      </div>
    </div>
  );
};
