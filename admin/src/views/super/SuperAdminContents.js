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
import SocietyModeratorList from "./society/society_user/SocietyModeratorList";
import PlanDetails from "../super/subcriptionPlan/PlanDetails";
import Dashboard from "../super/Dashboard";
import SubscriptionList from "./subcriptionPlan/SubscriptionList/SubscriptionList";
import CreatePackage from "./Product Subscription Management/PackageDetails/CreatePackage";
import CustomerSubscriptionList from "./Product Subscription Management/CustomerSubscriptionList/CustomerSubscription";
import AddNewNoticeForm from "./noticeannouncement/addnewnotice/AddNewNoticeForm";
import NoticeList from "./noticeannouncement/noticelist/NoticeList";
import DocumentUploadFacilityForm from "./documentmanagement/documentuploadfacility/DocumentUploadFaciltyForm";
import DocumentListTable from "./documentmanagement/documentlist/DocumentList";
const SuperAdminContents = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/society/create" element={<CreateSociety />} />
      <Route path="/society/view" element={<SocietyList />} />
      <Route path="/society/createuser" element={<CreateSocietyModerator />} />
      <Route
        path="/society/societyModeratorList"
        element={<SocietyModeratorList />}
      />
      <Route
        path="/emergencycontact/ContactDetails"
        element={<CreateEmergencyDetails />}
      />
      <Route
        path="/emerencycontact/EmergencyList"
        element={<EmergencyListSuperAdmin />}
      />
      {/* <Route path="softwarehelpdesk/softwarehelpdesksetup/softwareapprovalmatrix" element={<ApprovalMatrixForm/>} /> */}
      <Route
        path="softwarehelpdesk/softwarehelpdesksetup/softwaredefinepurpose"
        element={<DefinePorpousForm />}
      />
      <Route
        path="/softwarehelpdesk/softwarehelpdeskcreateticket"
        element={<CreateTicketForm />}
      />
      <Route
        path="/softwarehelpdesk/softwarehelpdeskticketlist"
        element={<TicketListForm />}
      />
      <Route path="/subscription-plan/details" element={<PlanDetails />} />
      {/* <Route path="/subscription-plan/list" element={<SubscriptionList/>} /> */}
      <Route path="/product/create" element={<CreatePackage />} />
      <Route path="/product/list" element={<SubscriptionList />} />
      <Route path="/notice/create" element={<AddNewNoticeForm />} />
      <Route path="/notice/list" element={<NoticeList />} />
      <Route path="document/upload" element={<DocumentUploadFacilityForm />} />
      <Route path="document/view" element={<DocumentListTable />} />
    </Routes>
  );
};

export default SuperAdminContents;
