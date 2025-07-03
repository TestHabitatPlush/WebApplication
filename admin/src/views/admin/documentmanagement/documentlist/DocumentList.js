


import React from "react";
import UrlPath from "../../../../../src/components/shared/UrlPath";
import PageHeading from "../../../../../src/components/shared/PageHeading";
import DocumentListTable from "./DocumentListTable";


const DocumentList = () => {
  const paths = ["Document Management", "Document List"];
  const Heading = ["Document List"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="mt-4 text-2xl font-semibold text-lime">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
    <DocumentListTable/>
      </div>
    </div>
  );
};

export default DocumentList;
