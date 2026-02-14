import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import ViewMember from "./ViewMember";



const Member = () => {
  return (
    <main>
       <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <React.Fragment>
          <ViewMember/>
       </React.Fragment>
      }
    />
    </main>
  );
};

export default Member;
