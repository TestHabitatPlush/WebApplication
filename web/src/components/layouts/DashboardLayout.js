"use client";
import Mobilenav from "@/views/dashboard/Mobilenav";
import QuickLinkContainer from "@/views/dashboard/QuickLinkContainer";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const DashboardLayout = ({ header, leftContent, rightContent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="w-full sticky top-0 z-20">{header}</div>
      <div className="flex max-w-full">
        {/* left section */}
        <div
          className={`hidden lg:block h-full transition-all duration-300 sticky top-[65px]  ${
            isCollapsed ? "w-12" : "w-[270px]"
          }`}
        >
          <button
            className="hidden absolute top-0 -right-3 p-2 text-white bg-gray-600 hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </button>
          <div className="h-[calc(100vh-65px)] flex-1 py-4 pl-2 border-r border-gray">
            {leftContent}
          </div>
        </div>

        {/* right section */}
        <div className="flex-1 px-4 py-6 max-w-full lg:max-w-[calc(100vw-270px)]">
          <QuickLinkContainer />
          {rightContent}
        </div>
      </div>
      <div className="lg:hidden h-20 " />
      <div className="lg:hidden h-[70px] fixed bottom-0 left-0 w-full">
        <Mobilenav />
      </div>
    </div>
  );
};

export default DashboardLayout;
