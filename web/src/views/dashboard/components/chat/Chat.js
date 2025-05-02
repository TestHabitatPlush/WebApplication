import Image from "next/image";
import React from "react";
import Demo from "../../../assets/images/demo.jpg";

const Chat = () => {
  return (
    <div>
      <div className="text-darkTeal text-lg font-medium font-sans ">
        <div className="flex flex-row w-full py-2 bg-white rounded-md border border-b-black">
          <div className="px-2">
            <Image
              src={Demo}
              alt="demo"
              height={38}
              width={38}
              className="rounded-full"
            />
          </div>
          <div class="flex flex-col justify-center px-2">
            <span class="text-sm font-medium">James Boston</span>
            <span class="text-xs text-gray-600">online</span>
          </div>
        </div>
        <div className="flex flex-row w-full h-[81vh] mt-[1px] bg-white rounded-md border border-t-gray-100">
          <div className="text-center text-gray-400 text-[12px] p-[5px] ">
            Today
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
