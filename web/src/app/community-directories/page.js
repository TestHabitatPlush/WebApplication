// "use client";

// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import CommunityDirectories from "@/views/communityDirectories";
// import DashboardHeader from "@/views/dashboard/DashboardHeader";
// import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

// export default function CommunityDirectoriesPage() {
//   return (
//     <DashboardLayout
//       header={<DashboardHeader />}
//       leftContent={<DashboardLeftContents />}
//       rightContent={<CommunityDirectories />}
//     />
//   );
//}
"use client";

import CommunityDirectories from "@/views/communityDirectories";
const CommunityDirectoriesPage = () => {
  return (
    <main>
      <CommunityDirectories />
    </main>
  );
};
export default CommunityDirectoriesPage;