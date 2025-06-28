// ServicesSection.js
import React from 'react';
import { HiArrowRight } from 'react-icons/hi';


const ServicesSection = () => {
  return (
    <div className="max-w-7xl xl:mx-auto flex flex-col items-center justify-start px-1 text-center text-black bg-white mt-10">
      <h1 className="text-xl font-semibold md:text-xl">Services</h1>
      <h2 className="max-w-xl py-10 mb-10 font-semibold md:text-5xl">Our Services Include</h2>
      <div className="px-4 mx-auto max-w-7xl">
        {/* Card Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="overflow-hidden bg-white rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Card Image 1"
              className="object-cover w-full h-52 p-6"
            />
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Society Management</h3>
              <p className="mb-4 text-gray-600">
                At HabittatPlus we offer a comprehensive range of society management services, 
                including accounting, security, maintenance, and more. Our team of experts is dedicated to ensuring a smooth and hassle-free management experience for your apartment or society. 
                We use advanced technologies and innovative solutions to execute our services efficiently and effectively, 
                ensuring your complete satisfaction and peace of mind.
              </p>
              <div className="flex items-center justify-center text-blue-500 cursor-pointer hover:text-blue-800">
                <span className="mr-2">More Details</span>
                <HiArrowRight size={20} />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden bg-white rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Card Image 2"
              className="object-cover w-full h-52 p-6"
            />
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Society Management</h3>
              <p className="mb-4 text-gray-600">
                At HabittatPlus we offer a comprehensive range of society management services, 
                including accounting, security, maintenance, and more. Our team of experts is dedicated to ensuring a smooth and hassle-free management experience for your apartment or society. 
                We use advanced technologies and innovative solutions to execute our services efficiently and effectively, 
                ensuring your complete satisfaction and peace of mind.
              </p>
              <div className="flex items-center justify-center text-blue-500 cursor-pointer hover:text-blue-800">
                <span className="mr-2">More Details</span>
                <HiArrowRight size={20} />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden bg-white rounded-lg shadow-lg">
            <img
              src="https://images.pexels.com/photos/259950/pexels-photo-259950.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Card Image 3"
              className="object-cover w-full h-52 p-6"
            />
            <div className="p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">Society Management</h3>
              <p className="mb-4 text-gray-600">
                At HabittatPlus we offer a comprehensive range of society management services, 
                including accounting, security, maintenance, and more. Our team of experts is dedicated to ensuring a smooth and hassle-free management experience for your apartment or society. 
                We use advanced technologies and innovative solutions to execute our services efficiently and effectively, 
                ensuring your complete satisfaction and peace of mind.
              </p>
              <div className="flex items-center justify-center text-blue-500 cursor-pointer hover:text-blue-800">
                <span className="mr-2">More Details</span>
                <HiArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
     </div>
      <div className="flex justify-center mt-10 bg-blue-500 py-4 px-6 text-white">
      <button >All Services</button>
    </div>
    </div>
  );
};

export default ServicesSection;

