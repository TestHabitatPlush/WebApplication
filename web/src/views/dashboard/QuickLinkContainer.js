"use client";
import { QuickLinks } from "@/constants/config.quicklink";
import NavigationHandler from "@/handlers/NavigationHandler";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const QuickLinkContainer = () => {
  let pathName = usePathname().split("/").reverse()[0];
  if (pathName == "") {
    pathName = "home";
  }

  const QL = QuickLinks.resident.menulinks[pathName] || [];

  const { customNavigation } = NavigationHandler();

  const onClick = (data, index) => {
    customNavigation(data.url);
  };

  return (
    <div className="">
      <div className="flex gap-4 overflow-auto w-full no-scrollbar">
        {QL.map((data, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer`}
            title={data.name}
            onClick={() => onClick(data, index)}
          >
            <div className="p-2 group rounded-full">
              <div className="relative h-[50px] w-[50px] md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px]">
                <Image
                  src={data.icon}
                  alt={data.name}
                  layout="fill"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="max-w-[70px] md:max-w-[80px] lg:max-w-[100px] flex items-start justify-center text-center overflow-hidden">
              <span className="text-darkTeal text-xs font-medium font-sans break-words text-center leading-1">
                {data.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinkContainer;
