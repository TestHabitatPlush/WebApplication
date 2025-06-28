import React, { useState } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import NotificationContainer from "./NotificationContainer";

const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      avatar: "",
      message: "You have a new message from Chinmaya",
      timestamp: "2 mins ago",
      color: "primary",
    },
    {
      avatar: "",
      message: "One message from admin",
      timestamp: "1 hour ago",
      color: "success",
    },
    {
      avatar: "",
      message: "One message from admin",
      timestamp: "1 hour ago",
      color: "lime",
    },
    {
      avatar: "",
      message: "One message from admin",
      timestamp: "1 hour ago",
      color: "turquoise",
    },
  ]);

  const closeNotification = (index) => {
    console.log(index);
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-5">
        <h4 className="text-base lg:text-lg font-semibold text-turquoise">
          Notifications
        </h4>
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-turquoise hover:text-opacity-80 transition-all duration-150"
            fill="red"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <NotificationContainer
        notifications={notifications}
        onCloseNotification={closeNotification}
      />
    </div>
  );
};

export default Notifications;
