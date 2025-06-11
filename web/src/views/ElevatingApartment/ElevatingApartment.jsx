// HeroSection.jsx
import React from 'react';

function ElevatingApartment() {
  return (
    <div className="flex items-center p-6 bg-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto space-x-6 mt-10">
      {/* Center - Text Content */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold">Elevating Apartment Living</h2>
        <p className="text-gray-600 mt-6 text-lg">
          As an innovative apartment management company, we strive to provide our clients
          with the most effective, efficient, and modern solutions. We believe that
          apartment living should be convenient, comfortable, and secure.
        </p>
        <button className="mt-6 bg-blue-500 text-white px-6 py-2">
          More Details
        </button>
      </div>

      {/* Right Side - Image with overlay text */}
      <div className="relative flex-1">
        {/* Image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1661775522763-451d7783b453?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with actual image URL or import
          alt="Apartment Living"
          className="rounded-lg shadow-lg w-full"
        />
        
        {/* Overlay - Vision Icon and Text */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" />
              </svg>
            </div>
            <div className="ml-2">
              <h3 className="text-lg font-semibold">Our Vision</h3>
              <p>1-Click Installation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElevatingApartment;

