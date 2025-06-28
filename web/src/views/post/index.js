
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Posts from './Posts';
import { DashboardHeader, DashboardLeftContents } from '../dashboard';

const Index = () => {
  return (
    <DashboardLayout
      header={<DashboardHeader />}
      leftContent={<DashboardLeftContents />}
      rightContent={<Posts />}
    />
  );
}

export default Index

