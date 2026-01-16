
// "use client";

// import { QuickLinks } from "@/constants/config.quicklink";
// import NavigationHandler from "@/handlers/NavigationHandler";

// const QuickLinksMenu = ({ role = "resident", section = "myunit" }) => {
//   const links = QuickLinks?.[role]?.menulinks?.[section] || [];
//   const { navigateTo } = NavigationHandler();

//   return (
//     <div className="w-full">
//       <div className="grid grid-cols-12 gap-6">
//         {links.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={index}
//               onClick={() => navigateTo(item.url)} // Navigate to the page
//               className="col-span-6 cursor-pointer sm:col-span-4 md:col-span-3 lg:col-span-2"
//             >
//               <div className="flex flex-col items-center p-5 bg-white shadow rounded-xl transition hover:shadow-md hover:scale-[1.02]">
//                 {Icon && <Icon className="text-3xl text-blue-600" />}
//                 <span className="mt-2 text-sm font-medium text-center">{item.name}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default QuickLinksMenu;
"use client";

import { QuickLinks } from "@/constants/config.quicklink";
import NavigationHandler from "@/handlers/NavigationHandler";

const QuickLinksMenu = ({ role = "resident", section = "myunit" }) => {
  const links = QuickLinks?.[role]?.menulinks?.[section] || [];
  const { navigateTo } = NavigationHandler();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {links.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              onClick={() => navigateTo(item.url)}
              className="cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center p-6 transition-all shadow bg-blue-50 rounded-xl hover:shadow-md hover:scale-[1.02]">
                
                {/* ICON (same as StatCard) */}
                {Icon && (
                  <div className="my-3 text-3xl text-blue-500">
                    <Icon />
                  </div>
                )}

                {/* LABEL */}
                <div className="font-medium text-center text-blue-800">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinksMenu;

