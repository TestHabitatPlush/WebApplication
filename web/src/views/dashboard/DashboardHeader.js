"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import { IoChatbubbles, IoNotificationsOutline } from "react-icons/io5";

import Logo from "../../../assets/svg&pngicon/user (1).png";
import defultLogo from "../../../assets/Habitat_Plush_Logo Details/H+_Playstore_Live Chat.png";


import SideDrawer from "@/components/shared/SideDrawer";
import Notification from "../notification/Notifications";
import ProfileModal from "@/components/shared/ProfileModal";
import AuthHandler from "@/handlers/AuthHandler";
=======
import AuthHandler from "@/handlers/AuthHandler";
import ProfileModal from "@/components/shared/ProfileModal";
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);

  const [sideDrawer, setSideDrawer] = useState(false);
<<<<<<< HEAD
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const { logoutHandler } = AuthHandler();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
=======
const [isopen, setIsopen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

 const { logoutHandler } = AuthHandler();
  const toggleNotificationDrawer = () => {
    setSideDrawer((prev) => !prev);
  };
const toggleDropdown = () => {
    setIsopen(!isopen);
  };

<<<<<<< HEAD
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const router = useRouter();

const profileImage = user?.photo
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.photo.replace(/\\/g, "/")}`
  : Logo;


  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full shadow-md bg-turquoise">
        <div className="flex items-center justify-between h-[65px] px-3 md:px-5 lg:px-10">
          
          {/* LEFT */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative w-[45px] h-[45px]">
            <Image
                src={defultLogo}
                alt="Profile"
                fill
                onClick={toggleDropdown}
                
              />

            </div>

            <span className="text-sm font-medium text-white md:text-base lg:text-lg">
              {user?.Customer?.customerName}
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* Chat */}
            <button className="text-white">
              <IoChatbubbles className="text-xl" />
            </button>

            {/* Notification */}
            <button
              onClick={toggleNotificationDrawer}
              className="relative flex items-center justify-center p-2 text-white border border-white rounded-full"
            >
              <IoNotificationsOutline className="text-xl" />
              {/* Notification dot */}
              <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1" />
            </button>

            {/* Profile */}
            <div
              ref={dropdownRef}
              className="relative w-[40px] h-[40px] cursor-pointer"
            >
              <Image
                src={profileImage}
                alt="Profile"
                fill               
                onClick={toggleDropdown}
                className="object-contain brightness-0 invert"
              />

              {/* DROPDOWN */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <span
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      Profile
                    </span>

                    <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                      Contact Us
                    </span>
                    <span
                      onClick={() => {
                        router.push("/helpdesk");
                        setIsDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    >
                      Software Helpdesk
                    </span>


                    <span
                      onClick={logoutHandler}
                      className="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100"
                    >
                      Logout
                    </span>
                  </div>
                </div>
              )}
            </div>

            <span className="hidden text-sm text-white md:block">
              {user?.email}
            </span>
          </div>
        </div>
      </header>

      {/* PROFILE MODAL */}
      <ProfileModal
=======
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
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
<<<<<<< HEAD

      {/* NOTIFICATION DRAWER */}
=======
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
      {sideDrawer && (
        <SideDrawer
          width="w-full lg:w-[500px]"
          show={sideDrawer}
          position="right"
          hideCloseIcon
        >
          <Notification onClose={toggleNotificationDrawer} />
        </SideDrawer>
      )}
    </>
  );
};

export default DashboardHeader;
