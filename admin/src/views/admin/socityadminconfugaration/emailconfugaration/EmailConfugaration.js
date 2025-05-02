import React from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import EmailConfugarationForm from "./EmailConfugarationForm";

const EmailConfugaration = () => {
  const paths = ["User", "Email Confugaration"];
  const Heading = ["Email Confugaration"];

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <EmailConfugarationForm />
    </div>
  );
};

export default EmailConfugaration;
