


import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import DocumentUploadFacilityForm from "./DocumentUploadFaciltyForm";

const DocumentUploadFacility = () => {
  const paths = ["Document Management", "Document Upload Facility"];
  const Heading = ["Document Upload Facility"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <DocumentUploadFacilityForm/>
    </div>
  );
};

export default DocumentUploadFacility;