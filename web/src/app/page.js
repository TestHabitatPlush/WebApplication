"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/views/dashboard/Dashboard";
import DashboardHeader from "@/views/dashboard/DashboardHeader";
import DashboardLeftContents from "@/views/dashboard/DashboardLeftContents";
import Home from "@/views/home";
import { useSelector } from "react-redux";

export default function Page() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <main className="h-full">
      {isAuthenticated ? (
        <DashboardLayout
          header={<DashboardHeader />}
          leftContent={<DashboardLeftContents />}
          rightContent={<Dashboard />}
        />
      ) : (
        <Home />
      )}
    </main>
  );
}
