"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Chat from "@/views/chat";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

const page = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<Chat />}
      />
    </main>
  );
};

export default page;
