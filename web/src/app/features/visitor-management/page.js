"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const VisitorManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Visitor Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform’s technology enhances security by ensuring a structured
            visitor approval process, allowing residents to control access to
            the premises.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Visitor Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Approved Guest"
              description="Pre-approved guests can share their code and enter without waiting for approval."
            />
            <FeatureCard
              title="Visitors"
              description="A digital automated approval system ensures residents grant permission before entry."
            />
            <FeatureCard
              title="Delivery Personnel"
              description="Pre-inform residents about deliveries at the entrance and keep a record of regular suppliers."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisitorManagement;
