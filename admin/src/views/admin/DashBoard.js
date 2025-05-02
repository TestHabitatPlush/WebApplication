import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Header from "../header";
import Admincontent from "./Admincontent";

const Dashboard = () => {
  return (
    <DashboardLayout
      header={<Header />}
      leftContent={<Dashboardleftcontent />}
      rightContent={<Admincontent />}
    />
  );
};

export default Dashboard;
