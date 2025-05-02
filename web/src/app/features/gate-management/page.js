"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import gateManagementImg from "../../../../assets/images/login-background.jpg";

const GateManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Gate Management Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Gate Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Allows to enter and exit from different gates. Records the guard’s
            name who allowed to enter or exit. Hence society guard keep your
            society safe and secure.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={gateManagementImg}
              alt="Gate Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Add"
              description="Configure entry and exit gate, allocate security guard for Single Society Single Gate, Single Society Multi Gate."
            />
            <FeatureCard
              title="Attendance"
              description="Track security guard based on their shifts and mark for attendance."
            />
            <FeatureCard
              title="Night Patrolling"
              description="QR code-based location define and track route for night security guard patrolling within society premises."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GateManagement;
