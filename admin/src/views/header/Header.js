import React, { useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import Logo from "../../assets/logo/Habitat Plush-8.png";
import Image1 from "../../assets/images/image2.jpg";
import { useSelector } from "react-redux";
import AuthHandler from "../../handlers/AuthHandler";
import CustomerHandler from "../../handlers/superadmin/CustomerHandler";
import ProfileModal from "../../components/shared/ProfileModal";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isopen, setIsopen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { logoutHandler } = AuthHandler();
  const { getCustomerHandler } = CustomerHandler();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setIsopen((prev) => !prev);

  // ✅ Navigate to Resident / My Hive page with back support
  // const openMyHive = () => {
  //   navigate("http://localhost:3000/", {
  //     state: { from: location.pathname }, // remember previous page
  //   });
  // }
const openMyHive = () => {
  window.location.href = "http://localhost:3000/";
};

  const fetchSocietiesData = async () => {
    try {
      const result = await getCustomerHandler();
      const customers = result?.data?.data || [];
      console.log(customers)
      const matchingCustomer = customers.find(
        (el) => el.customerId === user?.societyId
      );
      if (matchingCustomer) setCustomerName(matchingCustomer.customerName);
    } catch (error) {
      console.error("Failed to fetch societies data:", error);
    }
  };

  useEffect(() => {
    if (user?.societyId) fetchSocietiesData();
  }, [user?.societyId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsopen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-[65px] flex flex-row w-full px-3 py-2 bg-gradient-to-r bg-sidebar text-white shadow-lg justify-between relative">
        {/* Logo and Society Name */}
        <div className="flex flex-row items-center space-x-3">
          <img src={Logo} alt="logo" height={40} width={52} />
          <div className="font-sans font-bold text-[19px] text-slate">
            {customerName || "Loading..."}
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-row items-center space-x-3">
          {["society_moderator", "management_committee"].includes(
            user?.userRole?.roleCategory
          ) && (
            <button
              onClick={openMyHive}
              className="px-4 py-2 text-sm font-semibold text-white border border-white rounded-md hover:bg-white/10"
            >
              My Hive
            </button>
          )}

          <IoChatbubble className="text-[20px] text-slate" />
          <IoIosNotifications className="text-[30px] text-slate" />

          <div className="relative" ref={dropdownRef}>
            <img
              src={Image1}
              alt="profile"
              height={40}
              width={52}
              className="rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isopen && (
              <div className="absolute right-0 z-50 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <span
                    onClick={() => {
                      setIsProfileOpen(true);
                      setIsopen(false);
                    }}
                    className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    Profile
                  </span>

                  <span className="block px-4 py-2 text-base text-gray-700 cursor-pointer hover:bg-gray-200">
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
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </>
  );
};

export default Header;
