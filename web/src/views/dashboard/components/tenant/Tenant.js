import TenantList from "./TenantList";
import AddTenant from "./AddTenant";
import SectionContainer from "@/components/shared/SectionContainer";

const Tenant = () => {
  return (
    <SectionContainer className="space-y-10">
      <TenantList />
      <AddTenant />
    </SectionContainer>
  );
};

export default Tenant;
