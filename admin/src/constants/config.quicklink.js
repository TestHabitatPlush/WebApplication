import img from "../../assets/svg&pngicon/booking.png";
import img2 from "../../assets/svg&pngicon/other.png";
import img3 from "../../assets/svg&pngicon/Pay Bill.png";

export const QuickLinks = {
  resident: {
    menulinks: {
      myunit: [
        {
          name: "Post",
          url: "/posts",
          icon: img,
          linkOf: "community",
        },
        {
          name: "Payments",
          url: "/payments",
          icon: img2,
          linkOf: "myUnit",
        },
        {
          name: "Facility",
          url: "/facility",
          icon: img3,
          linkOf: "myunit",
        },
        {
          name: "Tenant",
          url: "/tenant",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Vendors",
          url: "/vendors",
          icon: img,
          linkOf: "community",
        },
        {
          name: "Visitors",
          url: "/visitors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Parking",
          url: "/parking",
          icon: img,
          linkOf: "community",
        },
        {
          name: "HelpDesk",
          url: "/helpdesk",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Documents",
          url: "/documents",
          icon: img,
          linkOf: "myUnit",
        },
      ],
      community: [
        {
          name: "Vendor List",
          url: "/vendors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Notice",
          url: "/notice",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Announcements",
          url: "/announcements",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Post",
          url: "/posts",
          icon: img,
          linkOf: "myUnit",
        },
      ],
      home: [
        {
          name: "Post",
          url: "/posts",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Payments",
          url: "/payments",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Facility",
          url: "/facility",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Visitors",
          url: "/visitors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Vendor List",
          url: "/directories",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "HelpDesk",
          url: "/helpdesk",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Documents",
          url: "/documents",
          icon: img,
          linkOf: "myUnit",
        },
      ],
      find: [
        {
          name: "Vendor List",
          url: "/vendors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Post",
          url: "/posts",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Facility",
          url: "/facility",
          icon: img,
          linkOf: "myUnit",
        },

        {
          name: "HelpDesk",
          url: "/helpdesk",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Documents",
          url: "/documents",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Services",
          url: "vendors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Payment",
          url: "/payments",
          icon: img,
          linkOf: "myUnit",
        },
      ],
      more: [
        {
          name: "Documents",
          url: "/documents",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Vendor List",
          url: "/vendors",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "Setting",
          url: "/setting",
          icon: img,
          linkOf: "myUnit",
        },
        {
          name: "HelpDesk",
          url: "/helpdesk",
          icon: img,
          linkOf: "myUnit",
        },
      ],
    },
  },
  SecurityGuard: {
    menulinks: {
      Guard: [
        {
          name: "Visitor",
          url: "Visitor Management",
          icon: img,
        },
        {
          name: "Vendor",
          url: "Vendor Management",
          icon: img,
        },
        {
          name: "Notice",
          url: "Notice",
          icon: img,
        },
        {
          name: "Announcements",
          url: "Announcements",
          icon: img,
        },
        {
          name: "Directories",
          url: "Directories Neighbours",
          icon: img,
        },
        {
          name: "Vendors",
          url: "Vendors",
          icon: img,
        },
      ],
      home: [
        {
          name: "Facility",
          url: "Bookings Facility Management",
          icon: img,
        },
        {
          name: "Parking",
          url: "Parking Management",
          icon: img,
        },
        {
          name: "Visitors",
          url: "Visitors",
        },
        {
          name: "Directories",
          url: "Directories Neighbours",
        },
        {
          name: "Association",
          url: "Association Members",
        },
        {
          name: "Emergency",
          url: "Emergency Contacts",
        },
        {
          name: "Vendors",
          url: "Vendors",
        },
      ],
      find: [
        {
          name: "Directories",
          url: "Directories Neighbours",
          icon: img,
        },
        {
          name: "Association",
          url: "Association Members",
          icon: img,
        },
        {
          name: "Emergency",
          url: "Emergency Contacts",
          icon: img,
        },
        {
          name: "Vendors",
          url: "Vendors",
          icon: img,
        },
        {
          name: "Facility",
          url: "Bookings Facility Management",
          icon: img,
        },
        {
          name: "Parking",
          url: "Parking Management",
          icon: img,
        },
      ],
      more: [
        {
          name: "Directories",
          url: "Directories Neighbours",
          icon: img,
        },
        {
          name: "Association",
          url: "Association Members",
          icon: img,
        },
        {
          name: "Directories",
          url: "Emergency Contacts",
          icon: img,
        },
        {
          name: "Vendors",
          url: "Vendors",
          icon: img,
        },
        {
          name: "Settings",
          url: "Personal Settings Profile",
          icon: img,
        },
        {
          name: "E-Mail",
          url: "E-Mail Services",
          icon: img,
        },
        {
          name: "HelpDesk",
          url: "Support HelpDesk FAQ",
          icon: img,
        },
        {
          name: "Contact",
          url: "Contact",
          icon: img,
        },
        {
          name: "Call",
          url: "Call",
          icon: img,
        },
        {
          name: "chat",
          url: "Chat/Live chat",
          icon: img,
        },
      ],
    },
  },
};


export const QuickLinkCategory = [
  {
    name: "facility",
    category: "myunit",
  },
];