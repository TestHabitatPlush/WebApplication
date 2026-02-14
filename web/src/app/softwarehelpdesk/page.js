"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
// import Softwarehelpdesk from "@/views/softwarehelpdesk";
const Page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        // rightContent={<Softwarehelpdesk/>}
      />
    </main>
  );
};
export default Page;