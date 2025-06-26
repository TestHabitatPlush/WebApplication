"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import alertImg from "../../../../assets/images/login-background.jpg";

const AlertNotification = () => {
  return (
    <div>
      <Navbar />
      {/* Alert and Notification Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Alert and Notification
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            No need to wait outside society for pick-up or drop. Society Guard
            provides an alerting system that sends alerts on the arrival of
            taxis, autos, and school buses.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={alertImg}
              alt="Alert and Notification"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Emergency"
              description="Update emergency numbers for SOS calls. Get notified to security in case of any urgency."
            />
            <FeatureCard
              title="Pick up & Drop"
              description="Schedule your travel updates to get notified when your vehicle arrives."
            />
            <FeatureCard
              title="Notify"
              description="Actively receive updates on society communications, financials, visitors, etc."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AlertNotification;
