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
            Expenses Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Feature to track community expenses and attach payment receipts,
            generate tax reports for the corresponding financial year in a
            single click.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Expenses Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Bills"
              description="Feature to store vendor bills and invoices."
            />
            <FeatureCard
              title="Payments"
              description="Initiate vendor bill payments digitally as well as provide an option to upload for all offline vendor payments."
            />
            <FeatureCard
              title="Reports"
              description="Record bills & expense payments categorically and generate reports in a single click."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
