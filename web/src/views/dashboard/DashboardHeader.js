"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { IoChatbubbles, IoNotificationsOutline } from "react-icons/io5";

import defultLogo from "../../../assets/svg&pngicon/user (1).png";
import Logo from "../../../assets/logo/Habitat Plush-8.png";


import SideDrawer from "@/components/shared/SideDrawer";
import Notification from "../notification/Notifications";
import ProfileModal from "@/components/shared/ProfileModal";
import AuthHandler from "@/handlers/AuthHandler";

const DashboardHeader = () => {
  const user = useSelector((state) => state.auth.user);
const selectedSociety = useSelector(
  (state) => state.society.selectedSocietyId
);

  const [sideDrawer, setSideDrawer] = useState(false);
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

  const toggleNotificationDrawer = () => {
    setSideDrawer((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleAdminRedirect = async () => {
  try {
    const token = localStorage.getItem("authData")
      ? JSON.parse(localStorage.getItem("authData")).token
      : null;

    if (!token) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/admin-redirect`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Unauthorized");
    }

    // backend should return redirect url
    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  } catch (err) {
    console.error(err);
  }
};

// const handleAdminRedirect = async () => {
//   try {
//     const authData = JSON.parse(localStorage.getItem("authData"));
//     if (!authData?.token) return;

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/auth/admin-redirect`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authData.token}`,
//         },
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message || "You are not allowed");
//       return;
//     }

//     if (data.redirectUrl) {
//       window.location.href = data.redirectUrl;
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

const profileImage = user?.photo
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.photo.replace(/\\/g, "/")}`
  : defultLogo;


  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full shadow-md bg-turquoise">
        <div className="flex items-center justify-between h-[65px] px-3 md:px-5 lg:px-10">
          
          {/* LEFT */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative w-[45px] h-[45px]">
            <Image
                src={Logo}
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
            {/* Admin Login */}
          
             <button
                onClick={handleAdminRedirect}
                title="Admin Login"
                className="px-4 py-2 text-sm font-semibold text-white border border-white rounded-md hover:bg-white/10"
              >
                Admin Login
              </button>


       
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

             <div
              ref={dropdownRef}
              className={
                  user?.photo
                    ? "relative w-[40px] h-[40px] cursor-pointer rounded-full border border-white"
                    : "relative w-[40px] h-[40px] cursor-pointer"
                }
            
            >
              <Image
                src={profileImage}
                alt="Profile"
                fill
                onClick={toggleDropdown}
                className={
                  user?.photo
                    ? "object-cover rounded-full"
                    : "object-contain brightness-0 invert"
                }
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
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />

      {/* NOTIFICATION DRAWER */}
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
