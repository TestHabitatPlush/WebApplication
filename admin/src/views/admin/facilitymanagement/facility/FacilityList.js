import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import FacilityListTable from "./FacilityListTable";

const FacilityList = () => {
  const paths = ["Facility Management", "Facility List"];
  const Heading = ["Facility List"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <FacilityListTable />
      </div>
    </div>
  );
};

export default FacilityList;
