import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";

const Pricing = () => {
  const Silverplan = [
    "Dashboard",
    "Floor Information",
    "Unit Information",
    "Owner Information",
    "Tenant Information",
    "Vendor Information",
    "Facility Management",
    "Owner Utility Details",
  ];
  const Goldplan = [
    "Dashboard",
    "Floor Information",
    "Unit Information",
    "Owner Information",
    "Tenant Information",
    "Vendor Information",
    "Facility Management",
    "Owner Utility Details",
    "Maintenance Cost Details",
    "Management Committee",
    "Apartment Fund",
  ];

  const Platinumplan = [
    "Dashboard",
    "Floor Information",
    "Unit Information",
    "Owner Information",
    "Tenant Information",
    "Vendor Information",
    "Facility Management",
    "Owner Utility Details",
    "Maintenance Cost Details",
    "Management Committee",
    "Apartment Fund",
    "Bill Deposit",
    "Complain",
    "Visitor",
    "Parking Management",
    "Meeting",
    "Notice Board",
    "Email SMS Alert",
    "Report",
    "Settings",
  ];
  return (
    <div>
      <div className="px-[25px] md:px-[85px] mt-[30px]">
        <div className="text-4xl mx-auto text-center text-darkTeal font-bold font-oswald tracking-wider indent-0.5 transform scale-y-118 pb-[18px]">
          Pick your pricing plan
        </div>
        <div className="text-sm mx-auto text-center text-gray-600 font-bold font-sans tracking-wider indent-0.5">
          Select the perfect plan for your preference
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-[40px]">
          <div className=" p-[20px] rounded-lg md:mx-[40px] bg-white-900 shadow-lg ">
            <div className="text-3xl font-bold text-lightpink">Silver</div>
            <div className="text-base font-sans text-gray-600 pt-[30px] pb-[45px]">
              In this plan we offer you following things{" "}
            </div>
            <div className="flex flex-col space-y-2">
              {Silverplan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-3"
                >
                  <FaChevronCircleRight className="text-lightpink" />
                  <span className="text-base font-sans text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
              <button
                type="button"
                className="text-gray-600 hover:text-white  hover:bg-lightpink border border-lightpink focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className=" p-[20px] rounded-lg md:mx-[40px] bg-white-900 shadow-lg">
            <div className="text-3xl font-bold text-lightpurple">Gold</div>
            <div className="text-base font-sans text-gray-600 pt-[30px] pb-[45px]">
              In this plan we offer you following things{" "}
            </div>
            <div className="flex flex-col space-y-2">
              {Goldplan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-3"
                >
                  <FaChevronCircleRight className="text-lightpurple" />
                  <span className="text-base font-sans text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
              <button
                type="button"
                className="text-gray-600 hover:text-white  hover:bg-lightpurple border border-lightpurple focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className=" p-[20px] rounded-lg md:mx-[40px] bg-white-900 shadow-lg">
            <div className="text-3xl font-bold text-lightyellow">Platinum</div>
            <div className="text-base font-sans text-gray-600 pt-[30px] pb-[45px]">
              In this plan we offer you following things{" "}
            </div>
            <div className="flex flex-col space-y-2">
              {Platinumplan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-3"
                >
                  <FaChevronCircleRight className="text-lightyellow" />
                  <span className="text-base font-sans text-gray-600">
                    {item}
                  </span>
                </div>
              ))}
              <button
                type="button"
                className="text-gray-600 hover:text-white  hover:bg-lightyellow border border-lightyellow focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
