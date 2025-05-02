import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import { DashboardHeader, DashboardLeftContents } from "../dashboard";
import PaymentDueReminder from "./PaymentDueReminder";
import PaymentHistory from "./PaymentHistory";

const Payment = () => {
  return (
    <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <React.Fragment>
          <PaymentDueReminder />
          <PaymentHistory/>
        </React.Fragment>
      }
    />
  );
};

export default Payment;
