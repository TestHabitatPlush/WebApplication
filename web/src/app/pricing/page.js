"use client";

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/views/navbar/Navbar";
import Footer from "@/views/footer/Footer";
import Dialog from "../../components/ui/Dialog";
import CustomerForm from "@/views/PricingSection/customerForm";


const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // ✅ to store selected plan

  const Silverplan = [
    "Dashboard",
    "Floor Information",
    "Unit Information",
    "Owner Information",
    "Tenant Information",
    "Vendor Information",
    "Facility Management",
    "Owner Utility Details",
  ];
  const Goldplan = [
    "Silver Plan +",
    "Maintenance Cost Details",
    "Management Committee",
    "Apartment Fund",
  ];
  const Platinumplan = [
    "Gold Plan +",
    "Bill Deposit",
    "Complaints Management",
    "Visitor Tracking",
    "Parking Management",
    "Meeting Scheduler",
    "Notice Board",
    "Email & SMS Alerts",
    "Advanced Reports",
  ];

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan); // ✅ Save plan
    setIsOpen(true);
  };

  const handleFormSubmit = () => {
    // 🔔 You can handle submission here or in the CustomerForm
    setIsOpen(false);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="px-6 py-10 md:px-20 bg-blue-50">
        <h2 className="mb-2 text-4xl font-bold tracking-wide text-center text-blue-600">
          Choose the Perfect Plan
        </h2>
        <p className="mb-10 text-center text-gray-600">
          Select the best plan that fits your needs.
        </p>

        <div className="py-12 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Silver Plan */}
            <div className="bg-[#b8ff70] p-6 rounded-lg shadow-lg text-center border-t-4 border-[#92D050]">
              <h3 className="text-3xl font-bold">Silver</h3>
              <div className="mt-4 space-y-2">
                {Silverplan.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-[#92D050]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 bg-[#92D050] text-white px-5 py-2 rounded-full hover:bg-[#78b53d]"
                onClick={() => handleBuyNow("Silver")}
              >
                Buy Now
              </button>
            </div>

            {/* Gold Plan */}
            <div className="bg-[#8cecff] p-6 rounded-lg shadow-lg text-center border-t-4 border-[#078BA5]">
              <h3 className="text-3xl font-bold">Gold</h3>
              <div className="mt-4 space-y-2">
                {Goldplan.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#078BA5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 bg-[#078BA5] text-white px-5 py-2 rounded-full hover:bg-[#056a80]"
                onClick={() => handleBuyNow("Gold")}
              >
                Buy Now
              </button>
            </div>

            {/* Platinum Plan */}
            <div className="bg-[#73c8d9] p-6 rounded-lg shadow-lg text-center border-t-4 border-[#73c8d9]">
              <h3 className="text-3xl font-bold">Platinum</h3>
              <div className="mt-4 space-y-2">
                {Platinumplan.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <FaCheckCircle className="text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 bg-white text-black px-5 py-2 rounded-full hover:bg-[#61b3c2]"
                onClick={() => handleBuyNow("Platinum")}
              >
                Buy Now
              </button>
            </div>

            {/* Custom Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-[#032F3C]">
              <h3 className="text-3xl font-bold text-[#032F3C]">Custom Plan</h3>
              <p className="mt-2 text-gray-600">Tailor-made just for you</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">• Choose your own features</p>
                <p className="text-gray-600">• Personalized support</p>
                <p className="text-gray-600">• Scalable pricing</p>
              </div>
              <button className="mt-6 bg-[#032F3C] text-white px-5 py-2 rounded-full hover:bg-[#021f29]">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === Modal Dialog with Customer Form === */}
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Subscribe to ${selectedPlan} Plan`}>
        <CustomerForm onSubmit={handleFormSubmit} />
      </Dialog>

      <Footer />
    </main>
  );
};

export default Page;
