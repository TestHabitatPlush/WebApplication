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
            Home & Unit Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform connects landlords, owners, and residents desirous of
            renting or leasing their homes, houses, apartments, or villas, with
            interested users who are looking for such properties.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Home & Unit Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Move In/Out Management"
              description="Manage users, allocate flats/units, and provide necessary access rights as per role assigned."
            />
            <FeatureCard
              title="User Identification"
              description="Get notified with digital identity and track their activities."
            />
            <FeatureCard
              title="Access to Facility"
              description="Get access to society facilities and booking."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
