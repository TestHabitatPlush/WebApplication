

import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import VehicleListTable from "./VehicleListTable";

const VehicleList = () => {
  const paths = ["Parking Managemen", "Vehicle List"];
  const Heading = ["Vehicle List"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
         <VehicleListTable /> 
      </div>
    </div>
  );
};

export default VehicleList;
