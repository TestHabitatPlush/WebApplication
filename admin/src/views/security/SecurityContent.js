import React from "react";
import { Route, Routes } from "react-router-dom";
import GuardUserCreation from "../admin/gatemanagement/guardcreation/GuardUserCreation";
import DashBoard from "../dashboard/DashBoard";
import GateList from "../admin/gatemanagement/gatelist/GateList";
import DefineGate from "../admin/gatemanagement/definegate/DefineGate";
import GateAllocation from "../admin/gatemanagement/gateallocation/GateAllocation";
import ApprovedGateUser from "../admin/gatemanagement/approvedgateusers/ApprovedGateUser";
import DeactivateGateUsers from "../admin/gatemanagement/deactivategateusers/DeactivateGateUsers";
const SecurityContent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/gate/definegate" element={<DefineGate />} />
      <Route path="/gate/allocation" element={<GateAllocation />} />
      <Route path="/gate/guardCreation" element={<GuardUserCreation />} />
      <Route path="/gate/view" element={<GateList />} />
      <Route path="/gate/approvedusers" element={<ApprovedGateUser />} />
      <Route path="/gate/deactivatedusers" element={<DeactivateGateUsers />} />
    </Routes>
  );
};

export default SecurityContent;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import GuardUserCreation from "../admin/gatemanagement/guardcreation/GuardUserCreation";

// const SecurityHome = () => {
//   return <div className="p-6 text-lg">Security Dashboard</div>;
// };

// const SecurityContent = () => {
//   return (
//     <Routes>
//       <Route path="/security/dashboard" element={<SecurityHome />} />
//       <Route
//         path="/security/gate/guardCreation"
//         element={<GuardUserCreation />}
//       />
//     </Routes>
//   );
// };

// export default SecurityContent;
