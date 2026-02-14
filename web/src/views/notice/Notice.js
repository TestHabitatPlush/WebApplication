import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
// import AddNewNoticeForm from "./AddNewNoticeForm";
import NoticeList from "./NoticeList";
const Notice = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={
          <React.Fragment>
            {/* <AddNewNoticeForm /> */}
            <NoticeList />
          </React.Fragment>
        }
      />
    </main>
  );
};

export default Notice;
