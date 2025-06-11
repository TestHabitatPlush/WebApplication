// "use client";
// import Footer from "@/views/footer/Footer";
// import Navbar from "@/views/navbar/Navbar";
// import { useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaFacebook,
//   FaYoutube,
//   FaInstagram,
//   FaTwitter,
//   FaGooglePlay,
//   FaApple
// } from "react-icons/fa";

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       address: {
//         ...prevData.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here, like sending to a server or showing a success message
//     console.log(formData);
//   };

//   return (
//     <main>
//       <Navbar />
//       <div className="px-4 py-12 mx-auto max-w-7xl">
//         {/* Contact Us Header */}
//         <h1 className="mb-8 text-3xl font-semibold text-center">
//           Request for Demo / Contact Us
//         </h1>

//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//           {/* Contact Form */}
//           <div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="lookingFor"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Looking For
//                 </label>
//                 <div className="mt-2 space-x-4">
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="lookingFor"
//                       value="Sales"
//                       checked={formData.lookingFor === "Sales"}
//                       onChange={handleChange}
//                       className="text-blue-500 form-radio"
//                     />
//                     <span className="ml-2">Sales (New)</span>
//                   </label>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="radio"
//                       name="lookingFor"
//                       value="Support"
//                       checked={formData.lookingFor === "Support"}
//                       onChange={handleChange}
//                       className="text-blue-500 form-radio"
//                     />
//                     <span className="ml-2">Support (Existing)</span>
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="mobile"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Mobile Number (Country Code – Mobile Number)
//                 </label>
//                 <input
//                   type="text"
//                   name="mobile"
//                   id="mobile"
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   E-mail Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="company"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Representing Company
//                 </label>
//                 <input
//                   type="text"
//                   name="company"
//                   id="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="details"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Details (2000 Characters)
//                 </label>
//                 <textarea
//                   name="details"
//                   id="details"
//                   value={formData.details}
//                   onChange={handleChange}
//                   className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
//                   rows="4"
//                   maxLength="2000"
//                 />
//               </div>

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-3 mt-6 text-sm font-medium text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className="space-y-6">
//             <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-600">
//               Contact Information
//             </h2>

//             {/* Address */}
//             <p className="flex items-center gap-2 text-gray-600">
//               <FaMapMarkerAlt className="text-blue-600" />
//               Habitat Plush, Whitefield, Bangalore, 560066
//             </p>

//             {/* Contact Number */}
//             <p className="flex items-center gap-2 text-gray-600">
//               <FaPhoneAlt className="text-blue-600" />
//               +91-7019 605 700
//             </p>

//             {/* Social Media Links */}
//             <div className="flex gap-4">
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaFacebook />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaYoutube />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaInstagram />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaTwitter />
//               </a>
//             </div>

//             {/* Service Area */}
//             <p className="text-gray-600">Locations We Serve: PAN India</p>

//             {/* App Store Links */}
//             <div className="flex gap-4 mt-4">
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaGooglePlay />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-2 text-blue-600 hover:underline"
//               >
//                 <FaApple />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </main>
//   );
// };

// export default ContactUs;

"use client";
import Footer from "@/views/footer/Footer";
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

    emailjs
      .send(
        "service_9irunus",
        "template_gbquq9q",
        formData,
        "ta2fgL1nL7jyvSr4W"
      )
  .then((response) => {
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
      <div className="px-4 py-12 mx-auto max-w-7xl">
        {/* Contact Us Header */}
        <h1 className="mb-8 text-3xl font-semibold text-center">
          Request for Demo / Contact Us
        </h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
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
                      className="text-blue-500 form-radio"
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
                      className="text-blue-500 form-radio"
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
                  className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
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
                  className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
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
                  className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
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
                  className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
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
                  className="block w-full p-3 mt-2 border border-gray-300 rounded-md"
                  rows="4"
                  maxLength="2000"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 mt-6 text-sm font-medium text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-600">
              Contact Information
            </h2>

            {/* Address */}
            <p className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-blue-600" />
              Habitat Plush, Whitefield, Bangalore, 560066
            </p>

            {/* Contact Number */}
            <p className="flex items-center gap-2 text-gray-600">
              <FaPhoneAlt className="text-blue-600" />
              +91-7019 605 700
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:underline"
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
                className="flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FaGooglePlay />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-600 hover:underline"
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