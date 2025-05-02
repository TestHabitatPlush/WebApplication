import React from "react";

const PageHeading = ({ heading }) => {
  return (
    <div>
      {heading.map((ele) => (
        <div className="text-2xl font-semibold text-lime mt-4">{ele}</div>
      ))}
    </div>
  );
};
export default PageHeading;
