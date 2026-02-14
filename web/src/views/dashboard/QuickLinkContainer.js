"use client";

import { QuickLinks } from "@/constants/config.quicklink";
import NavigationHandler from "@/handlers/NavigationHandler";
import { usePathname } from "next/navigation";

const QuickLinkContainer = () => {
  let pathName = usePathname().split("/").reverse()[0];
  if (pathName === "") pathName = "home";

  const QL = QuickLinks.resident.menulinks[pathName] || [];
  const { customNavigation } = NavigationHandler();

  return (
    <div className="w-full">
      {/* GRID WITH AUTO WRAP */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {QL.map((data, index) => {
          const Icon = data.icon;

          return (
            <div
              key={index}
              onClick={() => customNavigation(data.url)}
              className="cursor-pointer"
            >
              {/* CARD */}
              <div className="flex flex-col items-center justify-center p-8 transition-all bg-blue-50 shadow-sm rounded-xl hover:shadow-md hover:scale-[1.05]">

                {/* ICON */}
                {Icon && (
                  <div
                    className="mb-4 text-4xl"
                    style={{ color: "#0B7285" }}
                  >
                    <Icon />
                  </div>

                )}

                {/* NAME */}
                <span className="text-base font-medium text-center text-gray-700" >
                  {data.name}
                </span>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinkContainer;
