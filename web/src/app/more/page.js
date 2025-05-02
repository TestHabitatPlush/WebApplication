"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import More from "@/views/dashboard/components/More";
// import MyUnitInfo from "@/views/dashboard/myUnit/MyUnitInfo";

const Page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<More />}
      />
    </main>
  );
};

export default Page;
