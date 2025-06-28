import React from "react";

const Tabs = ({ children, className }) => {
  return (
    <div
      className={`${className} border-b flex items-center gap-5 text-gray-700 overflow-x-scroll no-scrollbar z-0`}
    >
      {children}
    </div>
  );
};

const TabContent = ({
  children,
  className,
  onClick,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} relative w-fit text-sm pb-3 ${
        active ? "text-turquoise" : "text-gray-700"
      }`}
    >
      {children}
      {active && (
        <div className="absolute bottom-0 left-0 w-full h-[3px]">
          <div className="w-full h-[3px] bg-turquoise translate-y-0 rounded-md" />
        </div>
      )}
    </button>
  );
};

export { Tabs, TabContent };
