  import React from "react";

  import DashboardLayout from "@/components/layouts/DashboardLayout";
  import DashboardHeader from "@/views/dashboard/DashboardHeader";
  import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
  import ViewParking from "./ViewParking";

  const Parking = () => {
    return (
      <main>
        <DashboardLayout
          header={<DashboardHeader />}
          leftContent={<DashboardLeftContents />}
          rightContent={<React.Fragment> <ViewParking/> </React.Fragment>}
        />
      </main>
    );
  };

  export default Parking;
