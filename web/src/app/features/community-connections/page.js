"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import communityImg from "../../../../assets/images/login-background.jpg";

const CommunityConnect = () => {
  return (
    <div>
      <Navbar />
      {/* Community Connect Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Connects with Community
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Management Committee, Residents (Owners, Owner family, Tenant,
            Tenant Family), Facility Management, Security personnel, Daily
            helper, Visitors and Service Providers – through the App, with a
            view to improve the security and convenience.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={communityImg}
              alt="Community Connect"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Neighbour"
              description="Get connected with other residents, share your views and thoughts."
            />
            <FeatureCard
              title="Management Committee"
              description="Get connected with Management committee, share your concerns and get feedback for early resolution of issues."
            />
            <FeatureCard
              title="Service Vendors"
              description="Get connected with your service vendors to resolve your issues."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CommunityConnect;
