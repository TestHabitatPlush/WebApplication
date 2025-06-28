import React from "react";
// import { FaFilePdf } from "react-icons/fa6";
import { BsPersonWalking } from "react-icons/bs";

export const VisitorList = () => {
  //   const arr = [1, 2, 3, 4];
  return (
    <div>
      <div className="space-y-2">
        <div className=" ">
          <h3 className="font-bold text-xl text-center">Visitor List</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium ">
              Name :
            </p>
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Role :
            </p>
          </div>
          <div className="  py-[40px] px-[20px]  bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Name :
            </p>
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Role :
            </p>
          </div>
          <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200  rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Name :
            </p>
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Role :
            </p>
          </div>
          <div className="  py-[40px] px-[20px] bg-blue-100 hover:bg-blue-200 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-95 duration-300">
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Name :
            </p>
            <p className="text-[18px] font-sans font-base text-darkTeal font-medium">
              Role :
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VisitorList;
