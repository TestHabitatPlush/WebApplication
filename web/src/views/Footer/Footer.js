"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Footer = () => {
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold text-blue-500">Habitat Plush</h1>

        {/* Links Section */}
        <div className="flex justify-between mt-5 text-sm">
          {/* About Section */}
          <div className="w-1/3">
            <Link
              href="about"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              About Habitat Plush
            </Link>
            <Link
              href="/"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              href="about"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              About Us
            </Link>
            <Link
              href="blogs"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Blogs
            </Link>
            <Link
              href="testimonials"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Testimonials
            </Link>
            <Link
              href="siteMap"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Site Map
            </Link>
            <Link
              href="terms"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Terms and Conditions
            </Link>
            <Link
              href="privacy"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Privacy Statement
            </Link>
            <Link
              href="partners"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Partners
            </Link>
          </div>

          {/* Products Section */}
          <div className="w-1/3">
            <Link
              href="products"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Products
            </Link>
            <Link
              href="habitatPlushApp"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Habitat Plush App
            </Link>
            <Link
              href="habitatPlushERP"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Habitat Plush ERP
            </Link>
          </div>

          {/* Sales & Support Section */}
          <div className="w-1/3">
            <Link
              href="salesSupport"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Sales & Support
            </Link>
            <Link
              href="#contactUs"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Contact Us
            </Link>
            <Link
              href="#locateUs"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Locate Us
            </Link>
            <Link
              href="#feedback"
              className="block mb-2 cursor-pointer hover:text-blue-500"
            >
              Feedback
            </Link>
          </div>
        </div>

        {/* Social Media Links & App Links */}
        <div className="flex w-1/4 gap-10 mt-10">
          <div>
            <p className="font-semibold">Social Media Links</p>
            <div className="flex mt-2 space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-xl cursor-pointer hover:text-blue-500" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-xl cursor-pointer hover:text-blue-500" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl cursor-pointer hover:text-blue-500" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-xl cursor-pointer hover:text-blue-500" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold">App Links</p>
            <div className="flex mt-2 space-x-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.habitatplush"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FcGoogle className="text-2xl cursor-pointer hover:text-blue-500" />
              </a>
              <a
                href="https://apps.apple.com/in/app/habitat-plush/id123456789"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillApple className="text-2xl cursor-pointer hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Copy Right Section */}
        <div className="py-2 mt-5 text-xs text-center">
          <p className="font-semibold">Copy Right and Trademarks</p>
          <p className="cursor-pointer hover:text-blue-500">
            “Habitat Plush” is a self-owned company. All rights to this website,
            including copyright in content represented here, are reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
