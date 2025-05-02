import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import AddNewNoticeForm from "./AddNewNoticeForm";

const AddnewNotice = () => {
  const paths = ["user", "Add New Notice"];
  const Heading = ["Add New Notice"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <AddNewNoticeForm />
    </div>
  );
};

export default AddnewNotice;
