// "use client";
// import Logo from "../../../assets/logo/cocacola2.jpg";
// import Image from "next/image";
// import Link from "next/link";
// // import { useSelector } from "react-redux";
// const Navbar = () => {
//   // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return (
//     <div>
//       <div className="h-20 w-full flex flex-row justify-between items-center shadow-md">
//         <div className="flex flex-row items-center gap-4 ml-[80px]">
//           <div className="ml-[15px]">
//             <Image
//               src={Logo}
//               alt="logo"
//               height={45}
//               width={45}
//               className="rounded-full"
//             />
//           </div>
//           <div className=" text-darkTeal text-xl font-sans subpixel-antialiased font-medium hover:text-turquoise ">
//             HABITATPLUS
//           </div>
//         </div>

//         <div className="flex flex-row justify-end items-center mr-[80px] gap-7">
//           <div className="text-darkTeal text-lg font-sans subpixel-antialiased font-medium hover:text-turquoise nav-item">
//             Home
//           </div>
//           <Link href="/services">
//             <div className=" text-darkTeal text-lg font-sans subpixel-antialiased font-medium hover:text-turquoise nav-item">
//               Services
//             </div>
//           </Link>

//           <Link href="/pricing">
//             <div className=" text-darkTeal text-lg font-sans subpixel-antialiased font-medium hover:text-turquoise nav-item">
//               Pricing
//             </div>
//           </Link>
//           <Link href="/aboutus">
//             <div className="  text-darkTeal text-lg font-sans subpixel-antialiased font-medium hover:text-turquoise nav-item">
//               About Us
//             </div>
//           </Link>
//           <Link href="/contact">
//             <div className="text-darkTeal text-lg font-sans subpixel-antialiased font-medium hover:text-turquoise nav-item">
//               Contact
//             </div>
//           </Link>
//           <div>
//             {/* {isAuthenticated ? (
//               <Link href="/user">
//                 <button
//                   type="button"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Dashboard
//                 </button>
//               </Link>
//             ) : (
//               <Link href="/login">
//                 <button
//                   type="button"
//                   className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   LOGIN
//                 </button>
//               </Link>
//             )} */}
//             <Link href="/login">
//               <button
//                 type="button"
//                 className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 LOGIN
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




"use client";
import Logo from "../../../assets/logo/cocacola2.jpg";
import Image from "next/image";
import Link from "next/link";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", dropdown: true },
    { label: "Pricing", href: "/pricing" },
    { label: "Business", dropdown: true },
    { label: "Contact Us", href: "/contact" },
  ];

const featuresOptions = [
  {
    label: "Home/ Unit Management",
    value: "home-unit-management",
    link: "/features/home-unit-management",
  },
  {
    label: "User Management",
    value: "user-management",
    link: "/features/user-management",
  },
  {
    label: "Accounts & Payments Management",
    value: "accounts-payments",
    link: "/features/accounts-payments",
  },
  {
    label: "Expenses Management",
    value: "expenses-management",
    link: "/features/expenses-management",
  },
  {
    label: "Invoice & Receipt Generation",
    value: "invoice-receipt",
    link: "/features/invoice-receipt",
  },
  {
    label: "Facility Management & Booking",
    value: "facility-booking",
    link: "/features/facility-booking",
  },
  {
    label: "Helpdesk & Communication",
    value: "helpdesk-communication",
    link: "/features/helpdesk-communication",
  },
  {
    label: "Vendor Management",
    value: "vendor-management",
    link: "/features/vendor-management",
  },
  {
    label: "Vehicle & Parking Management",
    value: "vehicle-parking",
    link: "/features/vehicle-parking",
  },
  {
    label: "Visitor Management",
    value: "visitor-management",
    link: "/features/visitor-management",
  },
  {
    label: "Security Alert System",
    value: "security-alert",
    link: "/features/security-alert",
  },
  {
    label: "Identification Management",
    value: "identification-management",
    link: "/features/identification-management",
  },
  {
    label: "Daily Help Management",
    value: "daily-help",
    link: "/features/daily-help",
  },
  {
    label: "Community Connections",
    value: "community-connections",
    link: "/features/community-connections",
  },
  {
    label: "Document Management",
    value: "document-management",
    link: "/features/document-management",
  },
  {
    label: "Notices & Announcements",
    value: "notices-announcements",
    link: "/features/notices-announcements",
  },
  {
    label: "Alerts & Notifications",
    value: "alerts-notifications",
    link: "/features/alerts-notifications",
  },
  {
    label: "Gate Management",
    value: "gate-management",
    link: "/features/gate-management",
  },
  {
    label: "Employee/ Staff Management",
    value: "employee-staff",
    link: "/features/employee-staff",
  },
  {
    label: "Dashboard & Reports",
    value: "dashboard-reports",
    link: "/features/dashboard-reports",
  },
];

  const businessOptions = [
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonial" },
    { label: "Blogs", href: "/blog" },
  ];

  return (
    <div className="shadow-md w-full">
      {/* Top Bar */}
      <div className="bg-gray-100 text-gray-700 py-2 px-8 flex justify-between items-center text-sm">
        <span>Contact: +91-701-960-5700</span>
        <div className="flex space-x-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.habitatplush"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FcGoogle className="text-xl hover:text-blue-500 cursor-pointer" />
          </a>
          <a
            href="https://apps.apple.com/in/app/habitat-plush/id123456789"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillApple className="text-xl hover:text-blue-500 cursor-pointer" />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 w-full flex flex-row justify-between items-center px-8">
        {/* Logo */}
        <div className="flex flex-row items-center gap-4">
          <Image
            src={Logo}
            alt="logo"
            height={45}
            width={45}
            className="rounded-full"
          />
          <span className="text-darkTeal text-xl font-semibold hover:text-turquoise">
            HABITAT PLUS
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {link.dropdown ? (
                <>
                  <span className="flex gap-1 items-center cursor-pointer hover:text-turquoise">
                    {link.label}
                    <MdKeyboardArrowDown className="mt-1 text-xl"/> 
                  </span>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 w-[350px] px-2 py-4 bg-white shadow-lg rounded-md z-50">
                      {link.label === "Features" &&
                        featuresOptions.map((option) => (
                          <Link
                            key={option.label}
                            href={option.link}
                            className="block px-4 py-1 text-gray-700 hover:text-turquoise hover:ml-1 transition-all duration-300"
                          >
                            {option.label}
                          </Link>
                        ))}
                      {link.label === "Business" &&
                        businessOptions.map((option) => (
                          <Link
                            key={option.label}
                            href={option.href}
                            className="block px-4 py-1 text-gray-700 hover:text-turquoise hover:ml-1 transition-all duration-300"
                          >
                            {option.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={link.href} className="hover:text-turquoise">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Login Button */}
        <Link href="/login">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            LOG IN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
