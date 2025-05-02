"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Community from "@/views/dashboard/Community";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

const page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<Community />}
      />
    </main>
  );
};

export default page;
