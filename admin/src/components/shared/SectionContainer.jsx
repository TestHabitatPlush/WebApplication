import React from "react";

const SectionContainer = ({ className, children }) => {
  return (
    <div className={`${className} p-5 rounded-lg bg-white max-w-full`}>{children}</div>
  );
};

export default SectionContainer;
