import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import ViewFacility from "./ViewFacility";

const Facility = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={<React.Fragment> <ViewFacility/></React.Fragment>}
      />
    </main>
  );
};
export default Facility;
