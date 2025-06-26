"use client";
import React from "react";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";
import Image from "next/image";


const SecurityAlert = () => {
  return (
    <div>
      <Navbar />
      {/* Security Alert Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Security Alert
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            In case of an emergency, residents can alert their security
            personnel at a single click of a button on the app.
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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Emergency"
              description="Register your emergency numbers to get connected in case of any emergency."
            />
            <FeatureCard
              title="SOS"
              description="Get connected with security to inform on any security incidents."
            />
            <FeatureCard
              title="Services"
              description="Store and share hospital, ambulance, police station, fire brigade, and society emergency security numbers in a single place."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SecurityAlert;
