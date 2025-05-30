"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/views/navbar/Navbar";
import Footer from "@/views/footer/Footer";
import FeatureCard from "@/components/shared/FeatureCard";
import dashboardImg from "../../../../assets/images/login-background.jpg";

const DashboardReports = () => {
  return (
    <div>
      <Navbar />
      {/* Dashboard and Reports Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Dashboard and Reports
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Management committee and Facility Managers get real-time updates on
            the status of their society.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={dashboardImg}
              alt="Dashboard Reports"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="On-Screen Updates"
              description="Real-time updates on Visitors, Vehicles, Users, Building Units, Facilities, Financials, etc."
            />
            <FeatureCard
              title="E-mail Reports"
              description="Get daily or weekly updates on society status via email."
            />
            <FeatureCard
              title="Download Reports"
              description="Download Excel reports and customized graphical reports for easy tracking."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DashboardReports;
