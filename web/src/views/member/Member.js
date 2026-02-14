import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import AddMember from "./AddMember";



const Member = () => {
  return (
    <main>
       <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <React.Fragment>
          <AddMember/>
       </React.Fragment>
      }
    />
    </main>
  );
};

export default Member;
