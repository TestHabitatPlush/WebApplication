// "use client";
// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import Announcement from "@/views/announcement/Announcement";
// import DashboardHeader from "@/views/dashboard/DashboardHeader";
// import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

// const Page = () => {
//   return (
//     <main>
//       <DashboardLayout
//         header={<DashboardHeader />}
//         leftContent={<DashboardLeftContents />}
//         rightContent={<Announcement />}
//       />
//     </main>
//   );
// };

// export default Page;



"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Announcement from "@/views/announcement/Announcement";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

const Page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<Announcement />}
      />
    </main>
  );
};

export default Page;

