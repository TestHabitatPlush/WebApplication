import React, { useState } from "react";

const Accordion = ({ title, children, isMainItem }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full border-gray-400 py-2">
      <div
        className={`flex items-center justify-between cursor-pointer ${
          isActive ? " text-lime rounded-t-lg" : "text-white  rounded-lg"
        } `}
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        <span
          className={`transition-transform duration-300 text-white ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        >
          {/* Arrow icon (You can use an SVG or any icon library) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-[1000px]" : "max-h-0 p-0"
        }`}
      >
        <div className="rounded-b-lg">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
