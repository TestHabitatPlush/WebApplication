import React from "react";

const Skeleton = ({ width, height, className }) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={`${className} relative overflow-hidden bg-gray-200`}
    >
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-wave" />
    </div>
  );
};

export default Skeleton;
