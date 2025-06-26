// MainCardSection.js
import React from 'react';

const MainCardSection = () => {
  return (
    <div className="max-w-7xl xl:mx-auto p-8  mt-10  border-black border-2 overflow-hidden bg-white rounded-lg shadow-lg">
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 ">
      
      {/* Card 1 */}
      <div className="p-6 text-center transition transform duration-200">
        <div className="flex justify-center mb-4">
          <span className="text-4xl text-blue-500">
            <i className="fas fa-building"></i>
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Apartment Management</h2>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">1.3 M</h3>
        <p className="text-gray-600">Efficient and effective apartment management services.</p>
      </div>
  
      {/* Card 2 */}
      <div className="p-6 text-center transition transform duration-200">
        <div className="flex justify-center mb-4">
          <span className="text-4xl text-blue-500">
            <i className="fas fa-home"></i>
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Property Rentals</h2>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">2.0 M</h3>
        <p className="text-gray-600">Reliable and extensive property rental services.</p>
      </div>
  
      {/* Card 3 */}
      <div className="p-6 text-center transition transform duration-200">
        <div className="flex justify-center mb-4">
          <span className="text-4xl text-blue-500">
            <i className="fas fa-tools"></i>
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Maintenance</h2>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">1.5 M</h3>
        <p className="text-gray-600">Comprehensive property maintenance and repair.</p>
      </div>
  
      {/* Card 4 */}
      <div className="p-6 text-center transition transform duration-200">
        <div className="flex justify-center mb-4">
          <span className="text-4xl text-blue-500">
            <i className="fas fa-chart-line"></i>
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Investment Growth</h2>
        <h3 className="mb-2 text-2xl font-bold text-gray-900">3.2 M</h3>
        <p className="text-gray-600">Achieve growth through strategic property investments.</p>
      </div>
  
    </div>
  </div>
  
  
  );
};

export default MainCardSection;
