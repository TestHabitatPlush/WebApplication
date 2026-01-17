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

<<<<<<< HEAD
=======
// export const QuickLinkCategory = [
//   {
//     name: "facility",
//     category: "myunit",
//   },
// ];
// import { FaUserAlt, FaBuilding, FaBullhorn, FaComments, FaFileAlt, FaFileInvoice, FaParking, FaCog, FaHeadset, FaLaptopCode, FaUserFriends, FaHome, FaUserTie } from 'react-icons/fa';
// import img from "../../assets/svg&pngicon/booking.png";

import tentantIcon from "../../assets/svg&pngicon/tentant-icon.png";
import documentIcon from "../../assets/svg&pngicon/document-icon.webp";
import visitorIcon from "../../assets/svg&pngicon/visitor-icon.png";
import helpIcon from "../../assets/svg&pngicon/helpdesk-icon.png";
import noticeIcon from "../../assets/svg&pngicon/notice-icon.png";
import vendorIcon from "../../assets/svg&pngicon/vendor-icons.png";
import announcementIcon from "../../assets/svg&pngicon/annoucment-icon.png";
import directoryIcon from "../../assets/svg&pngicon/directoryIcon.png";
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
export const QuickLinks = {
  resident: {
    menulinks: {
      myunit: [
<<<<<<< HEAD
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
=======
        {
          name: "Post",
          url: "/posts",
          icon: noticeIcon, 
          linkOf: "community",
        },
        {
          name: "Tenant",
          url: "/tenant",
          icon: tentantIcon,
          linkOf: "myUnit",
        },
        // {
        //   name: "Vendors",
        //   url: "/vendors",
        //   icon: vendorIcon, 
        //   linkOf: "community",
        // },
        {
          name: "Visitors",
          url: "/visitors",
          icon: visitorIcon, 
          linkOf: "myUnit",
        },
        
        {
          name: "Directories",
          url: "/community",
          icon: directoryIcon, 
          linkOf: "myUnit",
        },
        {
          name: "Vehicle List",
          url: " /vehicle",
          icon: vendorIcon, 
          linkOf: "myUnit",
        },
        {
          name: "Society HelpDesk",
          url: "/helpdesk",
          icon: helpIcon, 
          linkOf: "myUnit",
        },
        {
          name: "My File",
          url: "/documents",
          icon: documentIcon, 
          linkOf: "myUnit",
        },
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
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

      help:[
        {
          name: "Software HelpDesk",
          url: "/softwarehelpdesk",
          icon: helpIcon, 
          linkOf: "help",
        },
      ]
    },
  },
};
