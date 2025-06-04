"use client";
import Footer from "@/views/Footer/Footer";
import Navbar from "@/views/navbar/Navbar";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     lookingFor: "",
//     name: "",
//     mobile: "",
//     email: "",
//     company: "",
//     address: {
//       line1: "",
//       line2: "",
//       locality: "",
//       state: "",
//       pinCode: "",
//     },
//     details: "",
//   });

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// const handleAddressChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     address: {
//       ...prevData.address,
//       [name]: value,
//     },
//   }));
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // Handle form submission logic here, like sending to a server or showing a success message
//   console.log(formData);
// };

const ContactUs = () => {
  const [formData, setFormData] = useState({
    lookingFor: "",
    name: "",
    mobile: "",
    email: "",
    company: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // emailjs
    //   .send(
    //     "service_9irunus",
    //     "template_gbquq9q",
    //     formData,
    //     "ta2fgL1nL7jyvSr4W"
    //   )
    emailjs.send(
      "service_9irunus",
      "template_gbquq9q",
      {
        looking_for: formData.lookingFor,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        company: formData.company,
        details: formData.details,
      },
      "ta2fgL1nL7jyvSr4W"
    ).then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          company: "",
          details: "",
        });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Failed to send message, please try again later.");
      });
  };

  return (
    <main>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Us Header */}
        <h1 className="text-3xl font-semibold text-center mb-8">
          Request for Demo / Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="lookingFor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Looking For
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="Sales"
                      checked={formData.lookingFor === "Sales"}
                      onChange={handleChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Sales (New)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="lookingFor"
                      value="Support"
                      checked={formData.lookingFor === "Support"}
                      onChange={handleChange}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Support (Existing)</span>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number (Country Code – Mobile Number)
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Representing Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700"
                >
                  Details (2000 Characters)
                </label>
                <textarea
                  name="details"
                  id="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                  maxLength="2000"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3 mt-6"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
              Contact Information
            </h2>

            {/* Address */}
            <p className="text-gray-600 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Habitat Plush, Whitefield, Bangalore, 560066
            </p>

            {/* Contact Number */}
            <p className="text-gray-600 flex items-center gap-2">
              <FaPhoneAlt className="text-blue-600" />
              +91-7019 605 700
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaTwitter />
              </a>
            </div>

            {/* Service Area */}
            <p className="text-gray-600">Locations We Serve: PAN India</p>

            {/* App Store Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaGooglePlay />
              </a>
              <a
                href="#"
                className="text-blue-600 flex items-center gap-2 hover:underline"
              >
                <FaApple />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactUs;
