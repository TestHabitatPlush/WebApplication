import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";
import AddVendor from "./AddVendor";
import VendorList from "./VendorList";

const Vendor = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={
          <React.Fragment>
           {/* <AddVendor /> */}
           {/* <VendorList /> */}
            {/* <div>Vendors List</div> */}
          </React.Fragment>
        }
      />
    </main>
  );
};

export default Vendor;
