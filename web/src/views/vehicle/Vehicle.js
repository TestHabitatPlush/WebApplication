import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import AddVehicle from "./AddVehicle";
import VehicleList from "./VehicleList";

const Vehicle = () => {
  return (
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
  );
};
export default Vehicle;
