import React from 'react';

const Contacts = () => {
  return (
    <div className="max-w-7xl xl:mx-auto md:flex md:space-x-12">
      {/* Left Content */}
      <div className="md:w-1/2 mt-10 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6 font-semibold">
          We’d love to hear from you! Whether you have a question about our
          services, need assistance, or just want to say hi, feel free to
          contact us using the form on the right.
        </p>
        <p className="text-gray-600">
          You can also reach us at{' '}
          <span className="font-medium text-gray-800">support@example.com</span>{' '}
          or call us at{' '}
          <span className="font-medium text-gray-800">+1 234 567 890</span>.
        </p>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 bg-white shadow-md rounded-lg p-6">
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
