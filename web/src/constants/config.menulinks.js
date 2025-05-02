import NavigationHandler from "@/handlers/NavigationHandler";
import { FaEllipsisH, FaSearch, FaUserAlt } from "react-icons/fa";
import { FaBuilding, FaUsers } from "react-icons/fa6";

const { navigateToDashboard, navigateToMyUnit, navigateToCommunity, navigateToFind, navigateToMore } = NavigationHandler();

export const MenuLinks = [
  {
    url: "dashboard",
    name: "Dashboard",
    icon: FaUserAlt,
    access: ["resident", "security"],
    click: navigateToDashboard,
  },
  {
    url: "myunit",
    name: "My Unit",
    icon: FaBuilding,
    access: ["resident", "security"],
    click: navigateToMyUnit,
  },
  {
    url: "community",
    name: "Community",
    icon: FaUsers,
    access: ["resident", "security"],
    click: navigateToCommunity,
  },
  // {
  //   url: "find",
  //   name: "Find",
  //   icon: FaSearch,
  //   access: ["resident", "security"],
  //   click: navigateToFind,
  // },
  // {
  //   url: "more",
  //   name: "More",
  //   icon: FaEllipsisH,
  //   access: ["resident", "security"],
  //   click: navigateToMore,
  // },
];
