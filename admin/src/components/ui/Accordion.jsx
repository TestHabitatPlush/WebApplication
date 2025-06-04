import React, { useState } from "react";

const Accordion = ({ title, icon: Icon, children }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="w-full py-2 border-gray-400">
      <div
        className={`flex items-center justify-between cursor-pointer px-2 space-x-3 space-y-1 ${
          isActive ? "text-lime rounded-t-lg" : "text-white rounded-lg"
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="text-2xl text-lime-500" />}
          <span className="font-bold">{title}</span>
        </div>
        <span
          className={`transition-transform duration-300 text-white ${
            isActive ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-[1000px]" : "max-h-0 p-0"
        }`}
      >
        <div className="px-2 rounded-b-lg">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
