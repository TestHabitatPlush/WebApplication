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
            Accounts & Payments Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Features an end-to-end accounting module to simplify management of
            finances for Society Management Associations. Residents can also pay
            their various bills like maintenance bills, and other utilities
            bills via this platform.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Accounts & Payments Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Digital Payments"
              description="Seamlessly make digital payments to your community maintenance fees from anywhere in the world with Habitat Plush's automated/manual billing system. Hassle-free payment reconciliation and notifications for Management as well as Residents."
            />
            <FeatureCard
              title="Penalty Charges"
              description="Habitat Plush software platform sends advance notifications for payments before due generations, notifies you on delays through instant notifications, and features a dynamic late fees calculation engine after due dates."
            />
            <FeatureCard
              title="Transaction Processing"
              description="Now, effortlessly view and download digital copies of your invoices, payment receipts, and complete payment transactions through our society billing software."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;
