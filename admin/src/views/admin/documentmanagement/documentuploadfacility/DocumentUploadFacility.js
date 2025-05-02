import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";

const DocumentUploadFacility = () => {
  const paths = ["user", "Document Upload Facility"];
  const Heading = ["Document Upload Facility"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="flex flex-col w-full gap-5 py-6">
          <div>
            <Input
              label={
                <div>
                  Upload Documents (Image,Doc.,Pdf,Excel,zip . Max size 5MB .)
                </div>
              }
              type="file"
              placeholder={"Enter Notice Heading"}
              size={"lg"}
            />
            <Input
              label={<div>Upload Video (Max size allowed 1GB)</div>}
              type="file"
              placeholder={"Enter Notice Heading"}
              size={"lg"}
            />
          </div>

          <div className="grid grid-cols-4 gap-5 items-center my-5">
            {" "}
            <div className="flex flex-row items-center gap-3">
              <label> Only for Owners</label>
              <input type="radio" name="drone" checked className="text-lg" />
            </div>
            <div className=" flex flex-row items-center gap-3">
              <label>Only for Tenants</label>
              <input type="radio" name="drone" checked />
            </div>
            <div className=" flex flex-row items-center gap-3">
              <label>All members</label>
              <input type="radio" name="drone" checked />
            </div>
            <div className=" flex flex-row items-center gap-3">
              <label>All Primary Contacts</label>
              <input type="radio" name="drone" checked />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button className="max-w-sm" type="submit" size="lg">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadFacility;
