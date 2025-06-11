import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import AddNewNoticeForm from "./AddNewNoticeForm";

const AddnewNotice = () => {
  const paths = ["Notice Announcement", "Add New Notice"];
  const Heading = ["Add New Notice"];
  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="mt-4 text-2xl font-semibold text-lime">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <AddNewNoticeForm />
    </div>
  );
};

export default AddnewNotice;
