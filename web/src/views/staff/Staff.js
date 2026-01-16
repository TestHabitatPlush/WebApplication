import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import StaffList from "./StaffList";



const Staff = () => {
  return (
    <main>
       <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={
                 <React.Fragment>
                     <StaffList />
                </React.Fragment>
      }
    />
    </main>
  );
};

export default Staff;
