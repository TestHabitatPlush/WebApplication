"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const FacilityManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Facility Management and Booking
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            The management committee can use this feature to ensure that the
            facilities are restricted to residents and their guests, understand
            usage trends, and implement a booking feature for certain
            facilities.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Facility Management and Booking"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Facilities"
              description="Define facilities usage (restricted/free), booking charges, get digital bookings on available slots, and collect charges online."
            />
            <FeatureCard
              title="Events & Meetings"
              description="Create events, define schedules, set contribution amounts, send digital invites, and allow participation."
            />
            <FeatureCard
              title="Bookings"
              description="Create schedule dates, provide an online booking service, auto-calculate fees, and pay booking charges online."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FacilityManagement;
