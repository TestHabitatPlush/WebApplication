"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import FeatureCard from "@/components/shared/FeatureCard";
import img from "../../../../assets/images/login-background.jpg";

const HelpdeskCommunication = () => {
  return (
    <div>
      <Navbar />
      {/* Content Section */}
      <section className="py-10 bg-blue-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Helpdesk and Communication
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Users can use the Communication Management system as a channel to
            share their views and concerns with others as well as the management
            committee. Residents can have their complaints resolved by raising
            an issue to the concerned person/team, start a discussion, post an
            idea, or provide feedback.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={img}
              alt="Helpdesk and Communication"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Issues / Complaints"
              description="Management committee assigns a dedicated member to manage, respond, and get feedback from users. Residents can raise concerns, provide suggestions, and attach pictures."
            />
            <FeatureCard
              title="Service / Clarification Request"
              description="Residents raise maintenance requests for home appliances, electronics, and furniture. Requests go directly to society-authorized service providers."
            />
            <FeatureCard
              title="Track Progress"
              description="Update and view status and related actions directly. No need to ask anyone about progress, ensuring streamlined communication with feedback attached."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpdeskCommunication;
