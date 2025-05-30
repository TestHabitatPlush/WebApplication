"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/views/navbar/Navbar";
import Footer from "@/views/footer/Footer";
import FeatureCard from "@/components/shared/FeatureCard";
import staffManagementImg from "../../../../assets/images/login-background.jpg";

const StaffManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Employee/Staff Management Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Employee/Staff Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Management committee and Facility Managers get updates on their
            staff, shifts, and allocations.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={staffManagementImg}
              alt="Staff Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Identify"
              description="Create digital identity for staff to make an easy entry and exit at the gate."
            />
            <FeatureCard
              title="Notify"
              description="Get notified when your staff marks an entry at the gate."
            />
            <FeatureCard
              title="Attendance"
              description="Track staff attendance based on their shifts and mark attendance accordingly."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StaffManagement;
