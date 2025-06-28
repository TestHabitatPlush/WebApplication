import Image from "next/image";
import React from "react";
import Demo from "../../../assets/images/demo.jpg";

const ChatLeftContent = () => {
  return (
    <div>
      <div className="flex flex-row ">
        <div className="flex flex-col space-y-2">
          <div>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/1000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 bg-gray-200 rounded-lg dark:placeholder-gray-400 focus:border-b-blue-500 focus:border-t-gray-300 focus:border-l-gray-300 focus:border-r-gray-300 focus:outline-none"
                placeholder="Search People"
                required
              />
            </div>
          </div>

          <div className="flex flex-row w-full py-2 bg-white rounded-lg hover:bg-gray-100">
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
              <span class="text-xs text-gray-600">Message of James</span>
            </div>
          </div>

          <div className="flex flex-row w-full py-2 bg-white rounded-lg hover:bg-gray-100">
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
              <span class="text-xs text-gray-600">Message of James</span>
            </div>
          </div>
          <div className="flex flex-row w-full py-2 bg-white rounded-lg hover:bg-gray-100">
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
              <span class="text-xs text-gray-600">Message of James</span>
            </div>
          </div>

          <div className="flex flex-row w-full py-2 bg-white rounded-lg hover:bg-gray-100">
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
              <span class="text-xs text-gray-600">Message of James</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLeftContent;
