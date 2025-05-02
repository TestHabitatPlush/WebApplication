import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Header from "../header";
import Dashboardleftcontent from "../header/Dashboardleftcontent";
import Admincontent from "../admin/Admincontent";
import SuperAdminContents from "../super/SuperAdminContents";

const DashBoard = ({ user }) => {
 
  return (
    <div className="">
      <DashboardLayout
        header={<Header />}
        leftContent={<Dashboardleftcontent role={user.role.roleCategory} />}
        rightContent={
          user.role.roleCategory === "society_moderator" ? <Admincontent /> : <SuperAdminContents />
         }
      />
    </div>
  );
};

export default DashBoard;
