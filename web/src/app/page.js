// "use client";
// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import Dashboard from "@/views/dashboard/Dashboard";
// import DashboardHeader from "@/views/dashboard/DashboardHeader";
// import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
// import Home from "@/views/home";
// import { useSelector } from "react-redux";

// export default function Page() {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
//   return (
//     <main className="h-full">
//       {isAuthenticated ? (
//         <DashboardLayout
//           header={<DashboardHeader />}
//           leftContent={<DashboardLeftContents />}
//           rightContent={<Dashboard />}
//         />
//       ) : (
//         <Home />
//       )}
//     </main>
//   );
// }
"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/views/dashboard/Dashboard";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import Home from "@/views/home";
import { useSelector } from "react-redux";
// import QuickLinksMenu from "@/components/shared/QuickLinksMenu";

export default function Page() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <main className="h-full">
      {isAuthenticated ? (
        <DashboardLayout
          header={<DashboardHeader />}
          leftContent={<DashboardLeftContents />}
          rightContent={
            <div className="space-y-6">
              <Dashboard /> {/* Your existing dashboard content */}
              
              {/* Quick Links section */}
              {/* <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="mb-4 text-lg font-bold">Quick Links</h2>
                <QuickLinksMenu category="myunit" />
              </div> */}
            </div>
          }
        />
      ) : (
        <Home />
      )}
    </main>
  );
}
