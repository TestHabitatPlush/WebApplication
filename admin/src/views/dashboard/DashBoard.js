import React from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Header from "../header";
import Dashboardleftcontent from "../header/Dashboardleftcontent";
import Admincontent from "../admin/Admincontent";
import SuperAdminContents from "../super/SuperAdminContents";
import SecurityContent from "../security/SecurityContent";

const DashBoard = () => {
  const user = useSelector((state) => state.auth.user);
  const roleCategory = user?.userRole?.roleCategory;

  if (!roleCategory) {
    return (
      <div className="mt-10 text-center text-gray-600">
        Loading ...
      </div>
    );
  }

  const renderRightContent = () => {
    switch (roleCategory) {
      case "society_moderator":
        return <Admincontent />;

      case "super_admin":
      case "super_admin_it":
        return <SuperAdminContents />;

      case "society_security_guard":
        return <SecurityContent />;

      default:
        return (
          <div className="p-6 text-gray-500">
            No dashboard assigned for this role
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      header={<Header />}
      leftContent={<Dashboardleftcontent role={roleCategory} />}
      rightContent={renderRightContent()}
    />
  );
};

export default DashBoard;
