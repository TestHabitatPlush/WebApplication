import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSociety from "./society/create/CreateSociety";
import SocietyList from "./society/view_society/SocietyList";
import CreateSocietyModerator from "./society/society_user/CreateSocietyModerator";
import CreateEmergencyDetails from "./EmergencyContact/CreateEmergencyDetails";
import EmergencyListSuperAdmin from "../super/EmergencyContact/EmergencyListSuperAdmin/EmergencyListSuperAdmin";
<<<<<<< HEAD
=======
import UserList from "./society/society_user/UserList";
>>>>>>> 1b600f60a0553fb6d17f5061ff37aacd30049d47


const SuperAdminContents = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Dashboard home</div>} />
      <Route path="/society/create" element={<CreateSociety />} />
      <Route path="/society/view" element={<SocietyList />} />
      <Route path="/society/user" element={<UserList />} />
      <Route path="/society/createuser" element={<CreateSocietyModerator />} />
      <Route path="/emergencycontact/ContactDetails" element={<CreateEmergencyDetails />} />
      <Route path="/emerencycontact/EmergencyList" element={<EmergencyListSuperAdmin />} />
    </Routes>
  );
};

export default SuperAdminContents;
