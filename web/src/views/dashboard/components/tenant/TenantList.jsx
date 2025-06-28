import SectionHeading from "@/components/shared/SectionHeading";
import React from "react";

const TenantList = () => {
  const arr = [1, 2, 3, 4];
  return (
    <div>
      <SectionHeading>Your Tenant List</SectionHeading>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {arr.map((el,index) => (
          <div key={index} className=" w-full h-[100px] bg-gray-100 rounded-xl p-3">
            <div className="">
              hello helloh ellohe llohel lo siri hello hellohello hello hello
              hello hello hello
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantList;
