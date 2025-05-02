// import React from "react";
// import DashboardLayout from "@/components/layouts/DashboardLayout";
// import DashboardHeader from "@/views/dashboard/DashboardHeader";
// import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";

// const Documents = () => {
//   return (
//     <main>
//       <DashboardLayout
//         header={<DashboardHeader />}
//         leftContent={<DashboardLeftContents />}
//         rightContent={<React.Fragment>
//         <FileUploadApp/>
//      Document
//         </React.Fragment>}
//       />
//     </main>
//   );
// };

// export default Documents;

import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
// import FileUploadApp from "./FileUploadApp";
import AddDocument from "../dashboard/components/document/AddDocument";
import DocumentsList from "../dashboard/components/document/DocumentsList";

const Documents = () => {
  return (
    <main>
      <DashboardLayout
        header={<DashboardHeader />}
        leftContent={<DashboardLeftContents />}
        rightContent={
          <React.Fragment>
            {/* <FileUploadApp /> */}
            <AddDocument/>
            <DocumentsList/>



          </React.Fragment>
        }
      />
    </main>
  );
};

export default Documents;
