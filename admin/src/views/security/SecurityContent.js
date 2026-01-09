// import React from 'react'
// import { Route, Routes } from "react-router-dom";
// import GuardUserCreation from '../admin/gatemanagement/guardcreation/GuardUserCreation';
// import DashBoard from '../dashboard/DashBoard';
// const SecurityContent = () => {
//   return (
//    <Routes>
//     <Route path="/dashboard" element={<DashBoard />} />
//       <Route path="/gate/guardCreation" element={<GuardUserCreation />} />
//    </Routes>
//   )
// }

// export default SecurityContent


import React from "react";
import { Routes, Route } from "react-router-dom";
import GuardUserCreation from "../admin/gatemanagement/guardcreation/GuardUserCreation";

const SecurityHome = () => {
  return <div className="p-6 text-lg">Security Dashboard</div>;
};

const SecurityContent = () => {
  return (
    <Routes>
      <Route path="/security/dashboard" element={<SecurityHome />} />
      <Route
        path="/security/gate/guardCreation"
        element={<GuardUserCreation />}
      />
    </Routes>
  );
};

export default SecurityContent;
