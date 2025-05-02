"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import Helpdesk from "@/views/helpdesk/Helpdesk";
const Page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<Helpdesk />}
      />
    </main>
  );
};
export default Page;
