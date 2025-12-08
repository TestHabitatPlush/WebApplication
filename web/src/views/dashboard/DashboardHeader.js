"use client";
import { IoChatbubbles, IoNotificationsOutline } from "react-icons/io5";
import Logo from "../../../assets/logo/cocacola2.jpg";
import User from "../../../assets/logo/image2.jpg";
import Image from "next/image";
import SideDrawer from "@/components/shared/SideDrawer";
import { useState } from "react";
import Notification from "../notification/Notifications";
import { useSelector } from "react-redux";
import AuthHandler from "@/handlers/AuthHandler";
import ProfileModal from "@/components/shared/ProfileModal";

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const [sideDrawer, setSideDrawer] = useState(false);
const [isopen, setIsopen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

 const { logoutHandler } = AuthHandler();
  const toggleNotificationDrawer = () => {
    setSideDrawer((prev) => !prev);
  };
const toggleDropdown = () => {
    setIsopen(!isopen);
  };

  return (
    <div>
      <div className="flex flex-row justify-between h-[65px] px-3 md:px-5 lg:px-10 bg-turquoise sticky top-0 w-full ">
        <div className="flex flex-row items-center gap-2 text-black md:gap-5 lg:gap-7">
          <div className="relative min-w-[45px] min-h-[45px]">
            <Image
              src={Logo}
              alt="Logo"
              layout="fill"
              className="rounded-full"
            />
          </div>
          <div className="font-sans text-sm font-medium text-white md:text-base lg:text-lg hover:text-gray">
            {user?.branchDetail?.branch_name}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="flex items-center justify-center group">
            <IoChatbubbles className="text-xl text-white transition-all group-hover:text-gray-200" />
          </button>
          <button
            className="flex justify-center items-center p-1.5 border border-white text-white rounded-full group"
            onClick={toggleNotificationDrawer}
          >
            <IoNotificationsOutline className="text-xl transition-all group-hover:text-gray-200" />
          </button>
          <div className="relative min-w-[40px] min-h-[40px]">
            <Image
              src={User}
              alt="Logo"
              layout="fill"
              className="rounded-full "
                 onClick={toggleDropdown}
            />

            {isopen && (
              <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <span
                    onClick={() => setIsProfileOpen(true)}
                    className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    Profile
                  </span>
                  <span
                    className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    Contact Us
                  </span>
                  <span
                    onClick={logoutHandler}
                    className="block px-4 py-2 text-base text-red-500 cursor-pointer hover:bg-gray-200"
                  >
                    Logout
                  </span>
                </div>
              </div>
            )}
          </div>

          <span className="text-white">{user?.email}</span>
   
         
          <div className="hidden md:block">
            <p className="text-white text-[15px] font-normal hover:text-gray">
              {/* {user.r_name} */}
            </p>
          </div>
        </div>
      </div>
<ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
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
