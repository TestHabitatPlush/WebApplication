"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import dailyHelpImg from "../../../../assets/images/login-background.jpg";

const DailyHelpManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Daily Help Management Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Daily Help Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            All residents receive notifications on the entry of their daily help
            (maids, cooks, child care), and can also check their monthly
            attendance.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={dailyHelpImg}
              alt="Daily Help Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Identify"
              description="Create digital identity for daily helpers to make an easy entry and exit at gate."
            />
            <FeatureCard
              title="Notify"
              description="Get notified when your daily helpers are marking an entry at gate."
            />
            <FeatureCard
              title="Attendance"
              description="Track based on their shifts and mark for attendance by you."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DailyHelpManagement;
