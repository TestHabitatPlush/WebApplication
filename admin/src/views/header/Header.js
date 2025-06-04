import { React, useState, useEffect, useRef } from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoChatbubble } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png";
import Image1 from "../../assets/images/image2.jpg";
import { useSelector } from "react-redux";
import AuthHandler from "../../handlers/AuthHandler";
import CustomerHandler from "../../handlers/superadmin/CustomerHandler";

const Header = () => {
  const [isopen, setIsopen] = useState(false);
  const [customerName, setCustomerName] = useState(""); // Store name based on societyId
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const { logoutHandler } = AuthHandler();
  const { getCustomerHandler } = CustomerHandler();

  const toggleDropdown = () => {
    setIsopen(!isopen);
  };

  // Fetch customer name using user.societyId
  const fetchSocietiesData = async () => {
    try {
      const result = await getCustomerHandler();
      const customers = result.data.data;

      const matchingCustomer = customers.find(
        (el) => el.customerId === user?.societyId // or use user?.customerId if needed
      );

      if (matchingCustomer) {
        setCustomerName(matchingCustomer.customerName);
      }
    } catch (error) {
      console.error("Failed to fetch societies data:", error);
    }
  };

  useEffect(() => {
    if (user?.societyId) {
      fetchSocietiesData();
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsopen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
// const ViewProfileDetails=async () => {
  
// };

  return (
    <div>
      <div className="h-[65px] flex flex-row w-full px-3 py-2 bg-lime justify-between">
        <div className="flex flex-row items-center space-x-3">
          <img src={Logo} alt="logo" height={40} width={52} />
          <div className="font-sans font-bold text-19px text-slate">
            {customerName || "Loading..."}
          </div>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <div>
            <IoChatbubble className="text-[20px] text-slate" />
          </div>
          <div>
            <IoIosNotifications className="text-[30px] text-slate" />
          </div>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <img
              src={Image1}
              alt="profile"
              height={40}
              width={52}
              className="rounded-full"
              onClick={toggleDropdown}
            />
          </div>
          {isopen && (
            <div className="absolute w-48 mt-1 bg-white rounded-md shadow-lg top-full ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <span className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-200" >
                {/* onClick={ViewProfileDetails} */}
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
