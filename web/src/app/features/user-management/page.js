"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const Page = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            User Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform featured to onboard Role based user management and define
            their access rights.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="User Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Users"
              description="Direct and Indirect user list maintained for Residents (Owners, Owner Family, Tenant, Tenant Family), Management Committee (Moderator, Committee Members), Facility Manager, Security (Supervisor, Guard)."
            />
            <FeatureCard
              title="Role Access Rights"
              description="Role-based activity access for view, add, update, edit/modify, and delete within the platform."
            />
            <FeatureCard
              title="Dashboard & Reports"
              description="Based on user roles and access rights, specific dashboards are provided to have a faster view and action."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
