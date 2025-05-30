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
            Invoice and Receipt
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Go Green! Use digital methods to generate and share invoices and
            payment receipts for any date.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Invoice and Receipt"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Rule Setup"
              description="Flexibility to set standard rules per category, define due dates, penalty applicability, and relaxations."
            />
            <FeatureCard
              title="Corpus & Monthly Maintenance"
              description="Generate, share, and publish maintenance invoices automatically and/or manually based on the needs."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
