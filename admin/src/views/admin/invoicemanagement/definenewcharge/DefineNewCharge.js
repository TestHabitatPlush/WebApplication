import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/shared/Input";

const DefineNewCharge = () => {
  const paths = ["user", "Define New Charge"];
  const Heading = ["Define New Charge"];
  return (
    <div>
      {" "}
      <div className="px-5">
        <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
          <UrlPath paths={paths} />
        </div>
        {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
        <PageHeading heading={Heading} />
        <NewChargeForm />
      </div>
    </div>
  );
};

export default DefineNewCharge;

const NewChargeForm = () => {
  return (
    <div className="px-10 py-5 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl py-4 font-sans font-semibold text-lime">
        Charge Purpose
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label={<div>Charge Type Name:</div>}
          type="text"
          placeholder={"Enter the Name"}
          size={"lg"}
        />
        <Input
          label={<div>Charge Applicability:</div>}
          type="text"
          placeholder={"Enter the Name"}
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
