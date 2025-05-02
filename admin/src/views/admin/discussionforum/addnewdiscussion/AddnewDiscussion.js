import React from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";

const AddnewDiscussion = () => {
  const paths = ["user", "Add New Discussion"];
  const Heading = ["Add New Discussion"];
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
              label={<div>Discussion Heading</div>}
              type="text"
              placeholder={"Enter Discussion Heading"}
              size={"lg"}
            />
          </div>
          <div>
            <label
              for="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Discussion Description
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div>
            <Input
              label={<div>Upload File</div>}
              type="file"
              placeholder={"Upload File Here"}
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

export default AddnewDiscussion;
