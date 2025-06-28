import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    societyName: "",
    city: "",
    message: "",
    requestType: "Sales", // Default value for the radio button
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API request or form validation)
    console.log(formData);
  };

  return (
    <div className="font-sans min-h-screen flex justify-center items-center">
      <div className="w-full max-w-7xl p-8 rounded-lg fade-in opacity-0 transition-opacity duration-1000">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Request for Demo
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6">Contact Us</p>

        <form onSubmit={handleSubmit}>
          {/* Radio Buttons for Sales or Support */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="sales"
                name="requestType"
                value="Sales"
                checked={formData.requestType === "Sales"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="sales" className="text-gray-700">
                Sales
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="support"
                name="requestType"
                value="Support"
                checked={formData.requestType === "Support"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="support" className="text-gray-700">
                Support
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail Address"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              name="societyName"
              value={formData.societyName}
              onChange={handleChange}
              placeholder="Society Name"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-6 space-y-6">

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="4"
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
