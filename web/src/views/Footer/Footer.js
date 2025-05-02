"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Habitat Plush</h1>

        {/* Links Section */}
        <div className="flex justify-between mt-5 text-sm">
          {/* About Section */}
          <div className="w-1/3">
            <Link
              href="about"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              About Habitat Plush
            </Link>
            <Link
              href="/"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Home
            </Link>
            <Link
              href="about"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              About Us
            </Link>
            <Link
              href="blogs"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Blogs
            </Link>
            <Link
              href="testimonials"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Testimonials
            </Link>
            <Link
              href="siteMap"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Site Map
            </Link>
            <Link
              href="terms"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Terms and Conditions
            </Link>
            <Link
              href="privacy"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Privacy Statement
            </Link>
            <Link
              href="partners"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Partners
            </Link>
          </div>

          {/* Products Section */}
          <div className="w-1/3">
            <Link
              href="products"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Products
            </Link>
            <Link
              href="habitatPlushApp"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Habitat Plush App
            </Link>
            <Link
              href="habitatPlushERP"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Habitat Plush ERP
            </Link>
          </div>

          {/* Sales & Support Section */}
          <div className="w-1/3">
            <Link
              href="salesSupport"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Sales & Support
            </Link>
            <Link
              href="#contactUs"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Contact Us
            </Link>
            <Link
              href="#locateUs"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Locate Us
            </Link>
            <Link
              href="#feedback"
              className="hover:text-blue-500 cursor-pointer block mb-2"
            >
              Feedback
            </Link>
          </div>
        </div>

        {/* Social Media Links & App Links */}
        <div className="w-1/4 mt-10 flex gap-10">
          <div>
            <p className="font-semibold">Social Media Links</p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-xl hover:text-blue-500 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl hover:text-blue-500 cursor-pointer" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-xl hover:text-blue-500 cursor-pointer" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">App Links</p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.habitatplush"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FcGoogle className="text-2xl hover:text-blue-500 cursor-pointer" />
              </a>
              <a
                href="https://apps.apple.com/in/app/habitat-plush/id123456789"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillApple className="text-2xl hover:text-blue-500 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>

        {/* Copy Right Section */}
        <div className="mt-5 text-center text-xs py-2">
          <p className="font-semibold">Copy Right and Trademarks</p>
          <p className="hover:text-blue-500 cursor-pointer">
            “Habitat Plush” is a self-owned company. All rights to this website,
            including copyright in content represented here, are reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
