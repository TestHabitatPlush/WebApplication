import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
// import Select from "../../../../components/ui/Select";

const DefineVisitorcatagories = () => {
  const paths = ["user", "Define Visitor catagories"];
  const Heading = ["Define Visitor catagories"];
  const visitorOptions = ["Recurring", "Onetime"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="mt-4 text-2xl font-semibold text-lime">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
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
            <Button className="max-w-sm" type="" size="md">
              Submit
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>Visitor Relationship</div>
          <div>
            <Input
              // labelsubmit={<div>First Name</div>}
              type="text"
              placeholder={"Visitor Relationship"}
              size={"lg"}
            />
          </div>
          <div>
            <Button className="w-full" type="submit" size="lg">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefineVisitorcatagories;
