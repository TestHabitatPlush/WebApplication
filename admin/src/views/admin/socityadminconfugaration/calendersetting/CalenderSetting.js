import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import CalenderSettingForm from "./CalenderSettingForm";

const CalenderSetting = () => {
  const paths = ["User", "Calender Setting"];
  const Heading = ["Calender Setting"];
  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <CalenderSettingForm />
    </div>
  );
};

export default CalenderSetting;
