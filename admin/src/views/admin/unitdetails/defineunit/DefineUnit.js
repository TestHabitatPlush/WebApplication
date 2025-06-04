import { React } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import DefineUnitForm from "./DefineUnitForm";


const DefineUnit = () => {

  const paths = ["Building Management", "Define Unit"];
  const Heading = ["Define Units"];

  
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="mt-4 text-2xl font-semibold text-lime">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <DefineUnitForm />
    </div>
  );
};

export default DefineUnit;
