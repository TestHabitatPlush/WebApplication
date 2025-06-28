import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import DefineStructerForm from "./DefineStructerForm";

const DefineStructer = () => {
  const paths = ["Building Management", "Define Structure"];
  const Heading = ["Define Structure"];
  return (
    <div className="px-5">
      <div>
        <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
          <UrlPath paths={paths} />
        </div>
        <PageHeading heading={Heading} />
      </div>
      <DefineStructerForm />
    </div>
  );
};

export default DefineStructer;
