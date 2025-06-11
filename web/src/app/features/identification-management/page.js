"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import identificationImg from "../../../../assets/images/login-background.jpg";

const IdentificationManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Identification Management Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Identification Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform provides the option to identify each user (residents,
            guests, visitors, service vendors) digitally through QR codes.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={identificationImg}
              alt="Identification Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Digital Identity"
              description="Create digital identity for users and assets."
            />
            <FeatureCard
              title="Track Movement"
              description="Digitally track inventory management and get better supply chain management."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default IdentificationManagement;
