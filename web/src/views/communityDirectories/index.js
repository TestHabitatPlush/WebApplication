import DashboardLayout from '@/components/layouts/DashboardLayout';
import CommunityDirectories from './CommunityDirectories';
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardLeftContents from "../dashboard/DashboardLeftContents";

const Index = () => {
  return (
    <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={<CommunityDirectories />}
    />
  );
}

export default Index;
