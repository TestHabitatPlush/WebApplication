"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const VehicleParkingManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Vehicle & Parking Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Platform helps residents save vehicle details while the management
            committee effectively allocates and manages parking slots for
            Residents, Service Providers, Vendors, and Guests. Security
            personnel can track vehicle movements.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Vehicle & Parking Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Bookings"
              description="Create schedule dates, provide online booking service, auto calculate fees, and pay booking charges online."
            />
            <FeatureCard
              title="Service Vendor"
              description="Record vehicle details, allocate parking slots, and track vehicle movements."
            />
            <FeatureCard
              title="Report"
              description="Real-time reporting of available parking slots for better management."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VehicleParkingManagement;
