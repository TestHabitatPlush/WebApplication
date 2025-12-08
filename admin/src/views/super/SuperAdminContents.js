import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateSociety from "./society/create/CreateSociety";
import SocietyList from "./society/view_society/SocietyList";
import CreateSocietyModerator from "./society/society_user/CreateSocietyModerator";
import CreateEmergencyDetails from "./EmergencyContact/CreateEmergencyDetails";
import EmergencyListSuperAdmin from "../super/EmergencyContact/EmergencyListSuperAdmin/EmergencyListSuperAdmin";
import SocietyModeratorList from "./society/society_user/SocietyModeratorList";
import PlanDetails from "../super/subcriptionPlan/PlanDetails";
import Dashboard from "../super/Dashboard/dashboard";
import SubscriptionList from "./Product Subscription Management/SubscriptionList/SubscriptionList";
import CreateProduct from "./Product Subscription Management/CreateProduct";
import CustomerSubscriptionList from "./Product Subscription Management/CustomerSubscriptionList/CustomerSubscription";


const SuperAdminContents = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/society/create" element={<CreateSociety />} />
      <Route path="/society/view" element={<SocietyList />} />
      <Route path="/society/createuser" element={<CreateSocietyModerator />} />
      <Route path="/society/societyModeratorList" element={<SocietyModeratorList />} />
      <Route path="/emergencycontact/ContactDetails" element={<CreateEmergencyDetails />} />
      <Route path="/emerencycontact/EmergencyList" element={<EmergencyListSuperAdmin />} />
      <Route path="/subscription-plan/details" element={<PlanDetails />} />
      {/* <Route path="/subscription-plan/list" element={<SubscriptionList/>} /> */}
      <Route path="/product/create" element={<CreateProduct/>} />
      <Route path="/product/list" element={<SubscriptionList/>} />
      <Route path="/product/customerSubscription" element={<CustomerSubscriptionList/>} />
        
      
    </Routes>
  );
};

export default SuperAdminContents;
