import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Page = () => {
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

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Navbar />
      <div className="px-6 md:px-20 py-10 bg-blue-50">
        <h2 className="text-4xl text-center font-bold text-blue-600 tracking-wide mb-2">
          Choose the Perfect Plan
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Select the best plan that fits your needs.
        </p>

        {/* Pricing Grid */}
        <div className="max-w-7xl mx-auto py-12 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Silver Plan */}
            <div className="bg-[#b8ff70] p-6 rounded-lg shadow-lg text-center border-t-4 border-[#92D050]">
              <h3 className="text-3xl font-bold">Silver</h3>
              <div className="mt-4 space-y-2">
                {Silverplan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <FaCheckCircle className="text-[#92D050]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-[#92D050] text-white px-5 py-2 rounded-full hover:bg-[#78b53d]">
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
              <button className="mt-6 bg-[#078BA5] text-white px-5 py-2 rounded-full hover:bg-[#056a80]">
                Buy Now
              </button>
            </div>

            {/* Platinum Plan */}
            <div className="bg-[#73c8d9] p-6 rounded-lg shadow-lg text-center border-t-4 border-[#73c8d9]">
              <h3 className="text-3xl font-bold">Platinum</h3>
              <div className="mt-4 space-y-2">
                {Platinumplan.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <FaCheckCircle className="text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-white text-black px-5 py-2 rounded-full hover:bg-[#61b3c2]">
                Buy Now
              </button>
            </div>

            {/* Custom Plan */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-[#032F3C]">
              <h3 className="text-3xl font-bold text-[#032F3C]">Custom Plan</h3>
              <p className="text-gray-600 mt-2">Tailor-made just for you</p>
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

      <Footer />
    </main>
  );
};

export default Page;
