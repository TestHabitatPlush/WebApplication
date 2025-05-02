import React from "react";
import { FaSearch } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import { MdBlock } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const DiscussionDetails = () => {
  const paths = ["users", "Discussion Details"];
  const Heading = ["Discussion Details"];
  return (
    <div className="">
      <UrlPath paths={paths} />
      <div className="flex">
        <div className="w-full">
          <PageHeading heading={Heading} />

          <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL 120 UNITS AND 190 USERS
          </div>
          <div className="flex flex-row mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by Discussion Heading..."
                className="px-4 py-4 border w-full border-gray-300 rounded-md focus:outline-none"
              />
              <FaSearch className="absolute right-7 top-5 text-lg text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 space-y-2">
        <div className="flex flex-col relative p-4 bg-gray-100 shadow-md rounded-lg">
          <div className="text-xl font-semibold text-gray-800">
            Discussion Heading 1
          </div>
          <div className="absolute right-2 top-2 flex flex-row gap-2">
            <MdBlock className="text-lg text-gray-700 hover:text-yellow-700" />
            <MdDelete className="text-lg text-gray-700 hover:text-red-700" />
            <MdEdit className="text-lg text-gray-700 hover:text-green-700" />
          </div>
          <div className="text-gray-600 mt-2">
            This is a brief detail of the discussion. It gives an overview or
            summary of the todivic being discussed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetails;
