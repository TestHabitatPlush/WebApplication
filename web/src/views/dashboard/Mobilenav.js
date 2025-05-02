"use client";
import NavigationHandler from "@/handlers/NavigationHandler";
import { usePathname } from "next/navigation";
import React from "react";
import { LuBuilding2 } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoGridOutline, IoSearch } from "react-icons/io5";
import logo from '../../../assets/logo/logo.png';
import Image from "next/image";

const Mobilenav = () => {
  const {
    navigateToDashboard,
    navigateToMyUnit,
    navigateToCommunity,
    navigateToFind,
    navigateToMore,
  } = NavigationHandler();

  const pathName = usePathname().split("/").reverse()[0];
  
  return (
    <div className="h-full w-full flex bg-white justify-between items-center no-scrollbar shadow-lg">
      <div className="w-1/5 flex justify-center" onClick={navigateToMyUnit}>
        <LuBuilding2
          className={` text-2xl ${
            pathName == "myunit" ? "text-turquoise" : "text-gray-600"
          }`}
        />
      </div>
      <div className="w-1/5 flex justify-center" onClick={navigateToCommunity}>
        <FiUsers
          className={` text-2xl ${
            pathName == "community" ? "text-turquoise" : "text-gray-600"
          }`}
        />
      </div>

      <div className="w-1/5 flex justify-center">
        <div className="absolute bottom-2 left-[1/2] h-[60px] w-[60px] bg-white rounded-full p-3 flex items-center justify-normal">
          <div
            className="relative w-full h-full flex justify-center items-center rounded-full p-3"
            onClick={navigateToDashboard}
          >
            <Image alt="image_profile" src={logo} layout="fill" className="rounded-full" />
          </div>
        </div>
      </div>

      <div className="w-1/5 flex justify-center" onClick={navigateToFind}>
        <IoSearch
          className={` text-2xl ${
            pathName == "find" ? "text-turquoise" : "text-gray-600"
          }`}
        />
      </div>
      <div className="w-1/5 flex justify-center" onClick={navigateToMore}>
        <IoGridOutline
          className={` text-2xl ${
            pathName == "more" ? "text-turquoise" : "text-gray-600"
          }`}
        />
      </div>
    </div>
  );
};

export default Mobilenav;
