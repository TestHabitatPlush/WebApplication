import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import AddVehicle from "./AddVehicle";
import VehicleList from "./VehicleList";

const Tenant = () => {
  return (
    <main>
      {" "}
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={
          <React.Fragment>
            <AddVehicle />
            <VehicleList />
          </React.Fragment>
        }
      />
    </main>
  );
};

export default Tenant;
