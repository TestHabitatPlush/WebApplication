import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const UrlPath = ({ paths }) => {
  return (
    <div className="flex gap-2 items-center text-lime">
      {paths?.map((el, index) => (
        <span>
          {" "}
          {index !== paths.length - 1 ? (
            <span className="flex flex-row items-center ">
              {el} <FaAngleDoubleRight />
            </span>
          ) : (
            <span>{el}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default UrlPath;
