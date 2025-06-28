import React from "react";
import Demo from "../../../assets/images/demo.jpg";
import Image from "next/image";
import { BG_COLORS, COLORS_HEX, hexToRgba } from "@/constants/config.color";

const ColorSpan = ({ color = "primary" }) => {
    const colorStyle = {
        position: 'absolute',
        height: '100%',
        top: 0,
        left:0,
        backgroundColor: COLORS_HEX[color],
        width:'3px',
    }
    return <div style={colorStyle}></div>;
};


const Notification = ({ data, onClose, index, color = "primary" }) => {
  const { message, timestamp } = data;
  console.log(color);
    
    const style = {
        position:"relative",
        backgroundColor: hexToRgba(COLORS_HEX[color], 0.1),
        width: "100%",
    };

    return (
      <div style={style}>
        <ColorSpan color={color} />
        <div className="w-full p-3 flex">
          <div className="relative w-8 h-8">
            <Image
              src={Demo}
              alt="avatar"
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>
          <div className="w-full flex justify-between">
            <div className="ml-3 flex-3">
              <div className="text-sm font-medium">{message}</div>
              <div className="text-xs text-gray-500">{timestamp}</div>
            </div>
            <button
              onClick={() => onClose(index)}
              className="text-gray-700 hover:text-gray-900"
            >
            </button>
          </div>
        </div>
      </div>
    );
};

const NotificationContainer = ({ notifications, onCloseNotification }) => {
  return (
    <div className="space-y-1">
      {notifications.map((el, index) => ( 
        <Notification
          key={index}
          data={el}
          index={index}
          onClose={onCloseNotification}
          color={el.color}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
