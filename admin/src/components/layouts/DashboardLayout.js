"use client";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const DashboardLayout = ({ header, leftContent, rightContent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-full bg-black-50">
      <div className="w-full sticky top-0 z-20">{header}</div>
      <div className="flex max-w-full">
        {/* left section */}
        <div
          className={`hidden lg:block h-full transition-all duration-300 sticky top-[65px]  ${
            isCollapsed ? "w-12" : "w-[270px]"
          }`}
        >
          <button
            className="hidden absolute top-0 -right-3 p-2 bg-darkTeal focus:outline-none rounded-full"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <IoIosArrowBack className="text-white" />
            ) : (
              <IoIosArrowForward className="text-white" />
            )}
          </button>
          <div className="h-[calc(100vh-65px)] flex-1 bg-gray-300 border-r border-gray">
            {leftContent}
          </div>
        </div>

        {/* right section */}
        <div className="flex-1 p-4 max-w-full lg:max-w-[calc(100vw-270px)]">
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
