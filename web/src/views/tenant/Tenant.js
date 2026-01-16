import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import ViewTenant from "./ViewTenant";



const Tenant = () => {
  return (
    <main>
       <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <React.Fragment>
          <ViewTenant />
       </React.Fragment>
      }
    />
    </main>
  );
};

export default Tenant;
