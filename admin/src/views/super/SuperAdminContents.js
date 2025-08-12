import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSociety from "./society/create/CreateSociety";
import SocietyList from "./society/view_society/SocietyList";
import CreateSocietyModerator from "./society/society_user/CreateSocietyModerator";
import CreateEmergencyDetails from "./EmergencyContact/CreateEmergencyDetails";
import EmergencyListSuperAdmin from "../super/EmergencyContact/EmergencyListSuperAdmin/EmergencyListSuperAdmin";
import SocietyModeratorList from "./society/society_user/SocietyModeratorList";


const SuperAdminContents = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Dashboard home</div>} />
      <Route path="/society/create" element={<CreateSociety />} />
      <Route path="/society/view" element={<SocietyList />} />
      <Route path="/society/createuser" element={<CreateSocietyModerator />} />
      <Route path="/society/societyModeratorList" element={<SocietyModeratorList />} />
      <Route path="/emergencycontact/ContactDetails" element={<CreateEmergencyDetails />} />
      <Route path="/emerencycontact/EmergencyList" element={<EmergencyListSuperAdmin />} />
    </Routes>
  );
};

export default SuperAdminContents;
