import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
// import AddVisitor from "./AddVisitor";
// import VisitorList from "./VisitorList";

const Visitor = () => {
  return (
    <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <React.Fragment>
        visitor
          {/* <AddVisitor /> */}
          {/* <VisitorList /> */}
        </React.Fragment>
      }
    />
  );
};
export default Visitor;
