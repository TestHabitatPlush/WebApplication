"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import documentImg from "../../../../assets/images/login-background.jpg";

const DocumentManagement = () => {
  return (
    <div>
      <Navbar />
      {/* Document Management Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Document Management
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Centralize storage of society documents and efficiently retrieve by
            resident. Keep track of AMC, leasing agreements for apartments and
            receive automatic notifications as the agreements approach
            expiration, streamlining the document management process.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={documentImg}
              alt="Document Management"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Add"
              description="Upload agreements, pictures, event snapshots, and any other documents onto for easy sharing."
            />
            <FeatureCard
              title="Share"
              description="Share documents within society residents, event photos to the other members."
            />
            <FeatureCard
              title="Notify"
              description="Set Notifications storage fill up for user for better management."
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DocumentManagement;
