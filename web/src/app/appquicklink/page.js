"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Appquicklink from "@/views/app/Appquicklink";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

const Page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<Appquicklink />}
      />
    </main>
  );
};
export default Page;
