import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Header from "../header";
import Dashboardleftcontent from "../header/Dashboardleftcontent";
import SecurityContent from "./SecurityContent";

const Dashboard = () => {
  return (
    <DashboardLayout
      header={<Header />}
      leftContent={<Dashboardleftcontent />}
      rightContent={<SecurityContent />}
    />
  );
};

export default Dashboard;


// import { useSelector } from "react-redux";

// const Dashboard = () => {
//   const roleCategory = useSelector(
//     (state) => state.auth.user?.role?.roleCategory
//   );

//   return (
//     <DashboardLayout
//       header={<Header />}
//       leftContent={<Dashboardleftcontent role={roleCategory} />}
//       rightContent={<SecurityContent />}
//     />
//   );
// };

// export default Dashboard;
