import React from "react";
import { Route, Routes } from "react-router-dom";
import AddUser from "./usermanagement/adduser/AddUser";
import UnapprovedUser from "./usermanagement/unapproveduser/UnapprovedUser";
import ApprovedUser from "./usermanagement/approveduser/ApprovedUser";
import DashboardUser from "./usermanagement/dashboard/DashboardUser";

import GeneralSetting from "./usermanagement/generalsetting/GeneralSetting";
import UnitList from "./unitdetails/unitlist/UnitList";
import DeactivateUser from "./usermanagement/deactivateuser/DeactivateUser";
import DefineUnit from "./unitdetails/defineunit/DefineUnit";
import DefineStructer from "./unitdetails/definestructer/DefineStructer";
import AddnewNotice from "./noticeannouncement/addnewnotice/AddnewNotice";
import NoticeList from "./noticeannouncement/noticelist/NoticeList";
// import DefineVisitorcatagories from "./visitormanagement/definevisitorcatagories/DefineVisitorcatagories";
import AddVisitor from "./visitormanagement/addvisitor/AddVisitor";
import VisitorList from "./visitormanagement/visitorlist/VisitorList";
import AddnewDiscussion from "./discussionforum/addnewdiscussion/AddnewDiscussion";
import DiscussionDetails from "./discussionforum/discussiondetails/DiscussionDetails";
import DefineGate from "./gatemanagement/definegate/DefineGate";
import GateAllocation from "./gatemanagement/gateallocation/GateAllocation";
import GateList from "./gatemanagement/gatelist/GateList";


import AddNewVendor from "./vendormanagement/addnewvendor/AddNewVendor";
import AddNewParkingSlot from "./parkingmanagement/addnewparkingslot/AddNewParkingSlot";
import AddNewBookingReqest from "./parkingmanagement/addnewbookingrequest/AddNewBookingReqest";
import AddNewFacility from "./facilitymanagement/addnewfacility/AddNewFacility";
import FacilityList from "./facilitymanagement/facility/FacilityList";
   

import AddNewBookingRequest from "./facilitymanagement/addnewbookingrequest/AddNewBookingRequest";
import VendorList from "./vendormanagement/vendorlist/VendorList";
import FacilityBookingDetails from "./facilitymanagement/bookingdetails/FacilityBookingDetails";
import ParkingBookingDetails from "./parkingmanagement/parkingbookingdetails/ParkingBookingDetails";
import DefineNewCharge from "./invoicemanagement/definenewcharge/DefineNewCharge";
import IncomeSummerReport from "./invoicemanagement/incomesummryreport/IncomeSummerReport";
import InvoiceAdjustment from "./invoicemanagement/invoiceadjustment/InvoiceAdjustment";
import DefaulterList from "./invoicemanagement/defaulterlist/DefaulterList";
import InvoiceScheduler from "./invoicemanagement/invoicescheduler/InvoiceScheduler";
import InvoiceSetup from "./invoicemanagement/invoicesetup/InvoiceSetup";
import ChargeList from "./invoicemanagement/chargelist/ChargeList";
import AddVechicleDetails from "./parkingmanagement/addvechicledetails/AddVechicleDetails";
import EmailConfugaration from "./socityadminconfugaration/emailconfugaration/EmailConfugaration";
import CalenderSetting from "./socityadminconfugaration/calendersetting/CalenderSetting";
import ApprovalMatrix from "./socityhelpdesk/setup/approvalmatrix/ApprovalMatrix";
import DefinePorpous from "./socityhelpdesk/setup/defineporpous/DefinePorpous";
import TicketList from "./socityhelpdesk/ticketlist/TicketList";
import ApprovalMatrixVisitor from "./visitormanagement/setup/approvalmatrix/ApprovalMatrixVisitor";
import DefineVisitorCatagories from "./visitormanagement/setup/definevisitorcatagories/DefineVisitorCatagories";
import CreateTicketForm from "./socityhelpdesk/createticket/CreateTicketForm";
import GuardUserCreation from "./gatemanagement/guardcreation/GuardUserCreation";
//import ViewGateUserDetails from "./gatemanagement/approvedgateusers/ViewGateUserDetails";
import ApprovedGateUser from "./gatemanagement/approvedgateusers/ApprovedGateUser";
import ParkingList from "./parkingmanagement/parkingDetails/ParkingList";
import VehicleList from "./parkingmanagement/vehicleDetails/VehicleList";
import ContactDetails from './emerencyContact/ContactDetails';
import EmergencyList from './emerencyContact/emergencyList/EmergencyList'; 
import DocumentUploadFacility from "./documentmanagement/documentuploadfacility/DocumentUploadFacility";
import DocumentList from "./documentmanagement/documentlist/DocumentList";

// import CreateResident from "./resident/create/CreateResident";
// import CreateFloorInformation from "./floorinformation/create/CreateFloorInformation";
// import CreateVendor from "./vendorinformation/create/CreateVendor";
 //import CreateEmployee from "./employeeinformation/create/CreateEmployee";
//import CreateFacilityManagement from "./facilitylmanagement/create/CreateFacilityManagement";
// import CreateUnitcatagory from "./unitcatagories/create/CreateUnitcatagory";
// import CreateTenants from "./tenantinformation/create/CreateTenants";
// import Createunit from "./unitdetails/create/Createunit";
// import CreateOwnerUtility from "./ownerutilitydetails/create/CreateOwnerUtility";
// import CreateOwnerInformation from "./ownerinformation/create/CreateOwnerInformation";

const Admincontent = () => {
  return (
    <Routes>
      {/* <Route path="/admin" element={<div> Dashboard Page</div>} />
      <Route path="/resident/create" element={<CreateResident />} />
      <Route path="/resident/view" element={<div> View resident</div>} />
      <Route path="/tenant/create" element={<CreateTenants />} />
      <Route path="/tenant/view" element={<div> View resident</div>} />
      <Route path="/unitcatagories/create" element={<CreateUnitcatagory />} />
      <Route path="/unitcatagories/view" element={<div> View resident</div>} />
      <Route path="/unit/create" element={<Createunit />} />
      <Route path="/unit/view" element={<div> View resident</div>} />
      <Route path="/vendor/create" element={<CreateVendor />} />
      <Route path="/vendor/view" element={<div> View resident</div>} />
      <Route
        path="/ownerutilitydetails/create"
        element={<CreateOwnerUtility />}
      />
      <Route
        path="/ownerutilitydetails/view"
        element={<div> View resident</div>}
      />
      <Route path="/owner/create" element={<CreateOwnerInformation />} />
      <Route path="/owner/view" element={<div> View resident</div>} />
      <Route path="/floor/create" element={<CreateFloorInformation />} />
      <Route path="/floor/view" element={<div> View resident</div>} />
      <Route
        path="/facilitymanagement/create"
        element={<CreateFacilityManagement />}
      />
      <Route
        path="/facilitymanagement/view"
        element={<div> View resident</div>}
      />*/}
      {/* <Route path="/employee/create" element={<CreateEmployee />} />
      <Route path="/employee/view" element={<div> View employee</div>} />  */}
      <Route path="/" element={<DashboardUser />} />
      <Route path="/user" element={<DashboardUser />} /> 
      <Route path="/user/unapproved" element={<UnapprovedUser />} />
      <Route path="/user/adduser" element={<AddUser />} />
      <Route path="/user/approved" element={<ApprovedUser />} />
      <Route path="/user/deactivated" element={<DeactivateUser />} />
      <Route path="/user/setting" element={<GeneralSetting />} />
      <Route path="/user/setting" element={<GeneralSetting />} />
      <Route path="/unit/structer" element={<DefineStructer />} />
      <Route path="/unit/create" element={<DefineUnit />} />
      <Route path="/unit/view" element={<UnitList />} />
      <Route path="/notice/create" element={<AddnewNotice />} />
      <Route path="/notice/list" element={<NoticeList />} />
      {/* visitor management */}
      <Route
        path="/visitor/setup/visitorapprovalmatrix"
        element={<ApprovalMatrixVisitor />}
      />
      <Route
        path="/visitor/setup/visitordefinevisitor"
        element={<DefineVisitorCatagories />}
      />
      <Route path="/visitor/newvisitorentry" element={<AddVisitor />} />
      <Route path="/visitor/visitorlist" element={<VisitorList />} />

      <Route path="/discussion/create" element={<AddnewDiscussion />} />
      <Route path="/discussion/list" element={<DiscussionDetails />} />
      <Route path="/gate/definegate" element={<DefineGate />} />
      <Route path="/gate/allocation" element={<GateAllocation />} />
      <Route path="/gate/guardCreation" element={<GuardUserCreation />} />
      <Route path="/gate/view" element={<GateList />} />
      <Route path="/gate/approvedusers" element={<ApprovedGateUser/>} />
      <Route path="/document/upload" element={<DocumentUploadFacility />} />
      <Route path="/document/view" element={<DocumentList/>} />

      {/* Invoice */}
      <Route path="/invoice/newcharge" element={<DefineNewCharge />} />
      <Route path="/invoice/summury" element={<IncomeSummerReport />} />
      <Route path="/invoice/adjustment" element={<InvoiceAdjustment />} />
      <Route path="/invoice/defaulterlist" element={<DefaulterList />} />
      <Route path="/invoice/scheduler" element={<InvoiceScheduler />} />
      <Route path="/invoice/setup" element={<InvoiceSetup />} />
      <Route path="/invoice/chargelist" element={<ChargeList />} />

      {/* vendor */}
      <Route path="/vendor/newvendor" element={<AddNewVendor />} />
      <Route path="/vendor/view" element={<VendorList />} />
      {/* parking management */}
      <Route path="/parking/newslot" element={<AddNewParkingSlot />} />
      <Route path="/parking/list" element={<ParkingList/>}/>
      <Route
        path="/parking/bookingdetails"
        element={<ParkingBookingDetails />}
      />
      <Route path="/parking/bookingrequest" element={<AddNewBookingReqest />} />
      <Route path="/parking/vechicledetails" element={<AddVechicleDetails />} />
      <Route path="/vehicle/list" element={<VehicleList/>}/>

      {/* facility management */}
      <Route path="/facility/new" element={<AddNewFacility />} />
      <Route path="/facility/list" element={<FacilityList />} />
      <Route path="/facility/booking" element={<FacilityBookingDetails />} />
      <Route path="/facility/request" element={<AddNewBookingRequest />} />
      {/* Socity Admin Confugaration */}
      <Route
        path="/socityconfugartion/emailconfugaration"
        element={<EmailConfugaration />}
      />
      <Route
        path="/socityconfugartion/calender"
        element={<CalenderSetting />}
      />
      {/* socity helpdesk */}
      <Route
        path="/socityhelpdesk/socityhelpdesksetup/socityapprovalmatrix"
        element={<ApprovalMatrix />}
      />
      <Route
        path="/socityhelpdesk/socityhelpdesksetup/socitydefinepurpose"
        element={<DefinePorpous />}
      />
      <Route
        path="/socityhelpdesk/socityhelpdeskcreateticket"
        element={<CreateTicketForm />}
      />
      <Route
        path="/socityhelpdesk/socityhelpdeskticketlist"
        element={<TicketList />}
     />
     <Route path="/emergencycontact/ContactDetails" 
     element={<ContactDetails />} /> 
     
    <Route path="/emerencycontact/EmergencyList" 
     element={<EmergencyList />} /> 
    </Routes>
  );
};

export default Admincontent;
