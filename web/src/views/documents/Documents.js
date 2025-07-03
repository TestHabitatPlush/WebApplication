import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import AddDocument from "@/views/documents/AddDocument";
import DocumentList from "@/views/documents/DocumentList";

const Documents = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  }; // ✅ Missing closing brace fixed here

  return (
    <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={
        <>
          <AddDocument onUploadSuccess={handleRefresh} />
          <DocumentList refreshKey={refreshKey} />
        </>
      }
    />
  );
};

export default Documents;
