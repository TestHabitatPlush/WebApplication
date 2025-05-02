"use client";
import { IoChatbubbles, IoNotificationsOutline } from "react-icons/io5";
import Logo from "../../../assets/logo/cocacola2.jpg";
import User from "../../../assets/logo/image2.jpg";
import Image from "next/image";
import SideDrawer from "@/components/shared/SideDrawer";
import { useState } from "react";
import Notification from "../notification/Notifications";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const [sideDrawer, setSideDrawer] = useState(false);

  const toggleNotificationDrawer = () => {
    setSideDrawer((prev) => !prev);
  };

  return (
    <div>
      <div className="flex flex-row justify-between h-[65px] px-3 md:px-5 lg:px-10 bg-turquoise sticky top-0 w-full ">
        <div className="flex flex-row text-black items-center gap-2 md:gap-5 lg:gap-7">
          <div className="relative min-w-[45px] min-h-[45px]">
            <Image
              src={Logo}
              alt="Logo"
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className="text-white font-sans text-sm md:text-base lg:text-lg font-medium hover:text-gray">
            {user?.branchDetail?.branch_name}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="group flex justify-center items-center group">
            <IoChatbubbles className="text-white text-xl group-hover:text-gray-200 transition-all" />
          </button>
          <button
            className="flex justify-center items-center p-1.5 border border-white text-white rounded-full group"
            onClick={toggleNotificationDrawer}
          >
            <IoNotificationsOutline className="text-xl group-hover:text-gray-200 transition-all" />
          </button>
          <div className="relative min-w-[40px] min-h-[40px]">
            <Image
              src={User}
              alt="Logo"
              layout="fill"
              className=" rounded-full"
            />
          </div>
          <div className="hidden md:block">
            <p className="text-white text-[15px] font-normal hover:text-gray">
              {user.r_name}
            </p>
          </div>
        </div>
      </div>

      {sideDrawer && (
        <SideDrawer
          width="w-full lg:w-[500px]"
          // onClose={toggleNotificationDrawer}
          show={sideDrawer}
          position="right"
          hideCloseIcon={true}
        >
          <Notification onClose={toggleNotificationDrawer} />
        </SideDrawer>
      )}
    </div>
  );
};

export default DashboardHeader;
