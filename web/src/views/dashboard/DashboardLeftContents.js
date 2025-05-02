"use client";
import NavigationHandler from "@/handlers/NavigationHandler";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { TbProgressHelp } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

import { LuBuilding2 } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoGridOutline, IoSearch } from "react-icons/io5";
import AuthHandler from "@/handlers/AuthHandler";
import { QuickLinkCategory, QuickLinks } from "@/constants/config.quicklink";

const DashboardLeftContents = () => {
  const { customNavigation } = NavigationHandler();
  const { logoutHandler } = AuthHandler();


  const data = [
    {
      url: "home",
      name: "Dashboard",
      icon: FaUserAlt,
      click: () => customNavigation("/"),
    },
    {
      url: "myunit",
      name: "My Unit",
      icon: LuBuilding2,
      click: () => customNavigation("/myunit"),
    },
    {
      url: "community",
      name: "Community",
      icon: FiUsers,
      click: () => customNavigation("/community"),
    },
    {
      url: "find",
      name: "Find",
      icon: IoSearch,
      click: () => customNavigation("/find"),
    },
    {
      url: "more",
      name: "More",
      icon: IoGridOutline,
      click: () => customNavigation("/more"),
    },
  ];

  const paths = usePathname().split("/").filter(el=>Boolean(el));
  const pathName = paths.reverse()[0];

  
  const activeMenuStyle = "bg-opacity-5 text-turquoise";
  const nonActiveMenuStyle = "bg-gray-50 text-gray-600";
  const defaultMenuStyle = "relative w-full px-4 py-2.5 cursor-pointer flex items-center gap-2.5 text-sm";

  const getCurrentPath = () => {
    return paths.length == 0 ? "home" : pathName;
  }
  const getStyles = (data) => {
    const { url } = data;
    return `${ url === getCurrentPath() ? activeMenuStyle : nonActiveMenuStyle } ${defaultMenuStyle} `;
  }
  const getIconStyles = ({url}) => {
    return `text-base  ${ url === getCurrentPath() ? "text-turquoise" : "text-gray-600" }`;
  }

  return (
    <section className="h-full">
      <div className="h-full flex flex-col justify-between items-between">
        <div className="space-y-1">
          {data.map((el, index) => (
            <div key={index} className={getStyles(el)} onClick={el.click}>
              {<el.icon className={getIconStyles(el)} />}
              {el.name}

              {el.url === getCurrentPath() && (
                <div className="absolute right-0 top-0 h-full w-[2px] flex justify-end items-center">
                  <div className="w-full h-[70%] bg-turquoise rounded-lg translate-x-[1.5px]" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-1 text-sm pr-4">
          <div className="w-full rounded-md p-2 cursor-pointer bg-gray-50 text-turquoise flex items-center gap-2">
            {<TbProgressHelp className="text-base text-turquoise" />}
            Help center
          </div>
          <div
            className="w-full rounded-md p-2 cursor-pointer bg-red-100 text-red-500 flex items-center gap-2"
            onClick={logoutHandler}
          >
            {<FiLogOut className="text-base text-red-500" />}
            logout
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLeftContents;
