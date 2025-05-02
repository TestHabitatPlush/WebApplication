import { React, useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png";
import Image1 from "../../assets/images/image2.jpg";
import { useSelector } from "react-redux";
import AuthHandler from "../../handlers/AuthHandler";

const Header = () => {
  const [isopen, setIsopen] = useState(false);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const { logoutHandler } = AuthHandler();
  // console.log(user);

  const toggleDropdown = () => {
    setIsopen(!isopen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsopen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div>
      {/* bg-gradient-to-b from-topheader to-bottomheader */}
      <div className="h-[65px] flex flex-row w-full px-3 py-2 bg-lime justify-between">
        <div className="flex flex-row space-x-3 items-center">
          <img src={Logo} alt="image" height={40} width={52} />
          <div className="text-19px font-bold text-slate font-sans">
            White Field
          </div>
        </div>
        <div className="flex flex-row space-x-3 items-center">
          {/* <span onClick={logoutHandler} className="text-red-500">
            logout
          </span> */}
          <div>
            <IoChatbubble className="text-[20px] text-slate" />
          </div>
          <div>
            <IoIosNotifications className="text-[30px] text-slate" />
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <img
              src={Image1}
              alt="image"
              height={40}
              width={52}
              className="rounded-full"
              onClick={toggleDropdown}
            />
          </div>
          {isopen && (
            <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <span className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-200">
                  Profile
                </span>
                <span className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-200">
                  Contact Us
                </span>
                <span
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-base text-red-500 hover:bg-gray-200"
                >
                  Logout
                </span>
              </div>
            </div>
          )}
          <span className="text-white">{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
