import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSociety from "./society/create/CreateSociety";
import SocietyList from "./society/view_society/SocietyList";
import CreateSocietyModerator from "./society/society_user/CreateSocietyModerator";
import CreateEmergencyDetails from "./EmergencyContact/CreateEmergencyDetails";
import EmergencyListSuperAdmin from "../super/EmergencyContact/EmergencyListSuperAdmin/EmergencyListSuperAdmin";
import CreateTicketForm from "./softwarehelpdesk/createticket/CreateTicketForm";
import ApprovalMatrixForm from "./softwarehelpdesk/setup/approvalmatrix/ApprovalMatrixForm";
import DefinePorpousForm from "./softwarehelpdesk/setup/defineporpous/DefinePorpousForm";
import TicketListForm from "./softwarehelpdesk/ticketlist/TicketListForm";


const SuperAdminContents = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Admin Dashboard home</div>} />
      <Route path="/society/create" element={<CreateSociety />} />
      <Route path="/society/view" element={<SocietyList />} />
      <Route path="/society/createuser" element={<CreateSocietyModerator />} />
      <Route path="/emergencycontact/ContactDetails" element={<CreateEmergencyDetails />} />
      <Route path="/emerencycontact/EmergencyList" element={<EmergencyListSuperAdmin />} />
      {/* <Route path="softwarehelpdesk/softwarehelpdesksetup/softwareapprovalmatrix" element={<ApprovalMatrixForm/>} /> */}
      <Route path="softwarehelpdesk/softwarehelpdesksetup/softwaredefinepurpose" element={<DefinePorpousForm/>} />
      <Route path="/softwarehelpdesk/softwarehelpdeskcreateticket" element={<CreateTicketForm/>} />
      <Route path="/softwarehelpdesk/softwarehelpdeskticketlist" element={<TicketListForm/>} />
    </Routes>
  );
};

export default SuperAdminContents;
