import React from "react";

const DailyHelp = () => {
  return (
    <div>
      <div className="w-full border border-black bg-gray-100 rounded-lg">
        <div className="text-[18px] text-darkTeal font-sans font-bold px-4 py-4">
          DailyHelp
        </div>
        <div className="flex flex-row px-4 gap-4 py-4">
          <div className="p-4 bg-blue-100 font-medium hover:bg-blue-200 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 font-sans">
            Maid
          </div>
          <div className="p-4 bg-blue-100 font-medium hover:bg-blue-200 rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105 font-sans ">
            Cook
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <main>
      <DailyHelp />
    </main>
  );
};

export default Services;
