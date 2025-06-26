"use client";
import React from "react";
import Image from "next/image";
import Footer from "@/views/footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import noticeImg from "../../../../assets/images/login-background.jpg";

const NoticeAndAnnouncement = () => {
  return (
    <div>
      <Navbar />
      {/* Notice and Announcement Section */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Notice and Announcement
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-center">
            Residents stay informed with timely notifications from Management
            Committee. Digitize your society notice board and stay updated with
            essential announcements.
          </p>

          {/* ✅ Added Image */}
          <div className="flex justify-center my-6">
            <Image
              src={noticeImg}
              alt="Notice and Announcement"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NoticeAndAnnouncement;
