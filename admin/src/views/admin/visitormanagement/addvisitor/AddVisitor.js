import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import AddVisitorForm from "./AddVisitorForm";

const AddVisitor = () => {
  const paths = ["User", "New Visitor Entry"];
  const Heading = ["New Visitor Entry"];
  return (
    <div className="px-5 ">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <AddVisitorForm />
    
    </div>
  );
};

 export default AddVisitor;
