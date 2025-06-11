"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const VendorManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Vendor Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform helps connect residents with service providers who are
            willing to offer goods and services to the residents of the
            community.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Vendor Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Register"
              description="Create service vendors, register, and establish their digital identity."
            />
            <FeatureCard
              title="Service"
              description="Provide services through purchase orders, share invoices, and receive payments."
            />
            <FeatureCard
              title="Reports"
              description="Real-time reporting as per the service agreements and contracts."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorManagement;
