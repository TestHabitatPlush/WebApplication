// src/constants/config.quicklink.js

import {
  FaUsers,
  FaUserFriends,
  FaBell,
  FaHandsHelping,
  FaBuilding,
  FaCar,
  FaUser,
  FaBullhorn,
  FaFolderOpen,
  FaUserClock,
  FaTools,
  FaIdBadge,
  FaClipboardList,FaParking
} from "react-icons/fa";

import {
  FaWarehouse,
} from "react-icons/fa6";

export const QuickLinks = {
  resident: {
    menulinks: {
      myunit: [
        { name: "Post", url: "/posts", icon: FaBell },
        { name: "Tenant", url: "/tenant", icon: FaUserFriends },
        { name: "Member", url: "/member", icon: FaUsers },
        { name: "Parking", url: "/parking", icon: FaParking },
        { name: "Visitors", url: "/visitors", icon: FaUserClock },
        { name: "CommunityDirectories", url: "/community-directories", icon: FaBuilding },
        { name: "Vehicle", url: "/vehicle", icon: FaCar },
        { name: "Staff", url: "/staff", icon: FaIdBadge },
        { name: "Society HelpDesk", url: "/helpdesk", icon: FaHandsHelping },
        { name: "My File", url: "/documents", icon: FaFolderOpen },
        { name: "Facility", url: "/facility", icon: FaWarehouse },
      ],

      community: [
        { name: "Post", url: "/posts", icon: FaBell },
        { name: "Announcements", url: "/announcements", icon: FaBullhorn },
        { name: "CommunityDirectories", url: "/community-directories", icon: FaBuilding },
    
      

    
      ],

      home: [
        { name: "Post", url: "/posts", icon: FaBell },
        { name: "Tenant", url: "/tenant", icon: FaUserFriends },
        { name: "Member", url: "/member", icon: FaUsers },
        { name: "Parking", url: "/parking", icon: FaParking },
        { name: "Visitors", url: "/visitors", icon: FaUserClock },
        { name: "CommunityDirectories", url: "/community-directories", icon: FaBuilding },
        { name: "Vehicle", url: "/vehicle", icon: FaCar },
        { name: "Staff", url: "/staff", icon: FaIdBadge },
        { name: "Society HelpDesk", url: "/helpdesk", icon: FaHandsHelping },
        { name: "My File", url: "/documents", icon: FaFolderOpen },
        { name: "Facility", url: "/facility", icon: FaWarehouse },
        { name: "Announcements", url: "/announcements", icon: FaBullhorn },
      ],

      help: [
        { name: "Software HelpDesk", url: "/softwarehelpdesk", icon: FaTools },
        { name: "Society HelpDesk", url: "/helpdesk", icon: FaHandsHelping },
      ],

   
    },
  },
};
