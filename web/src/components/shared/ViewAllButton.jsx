import Link from "next/link";
import React from "react";
import { IoArrowForward } from "react-icons/io5";

const ViewAllButton = () => {
  return (
    <div className="flex justify-end">
      <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-500 group hover:text-turquoise rounded-lg">
        <Link href="/posts">
          <span className="">view all</span>
        </Link>

        <span className="">
          <IoArrowForward className="text-base group-hover:translate-x-1 transition-all duration-300" />
        </span>
      </button>
    </div>
  );
};

export default ViewAllButton;
