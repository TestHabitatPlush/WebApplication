import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center  text-center text-black bg-white mt-5">
      <h1 className="mb-4 text-xl font-bold md:text-xl">
        Welcome to HebitatPluse
      </h1>
      <h2 className='max-w-xl mb-4 text-4xl font-bolt md:text-6xl'>
        Enhancing Apartment Living
      </h2>
      <p className="max-w-3xl mb-4 text-lg md:text-xl">
      At HabitatPlus, we are dedicated to providing premium apartment and society management solutions that meet the unique needs of each client. 
      Our customized services cater to the diverse needs of apartment residents,
       ensuring that their living experience is convenient, comfortable, and secure.
     With a focus on innovation and quality, we offer a range of community- focused services and products that enhance apartment living.
       Welcome to the world of SpanTro, where we bring harmony to apartment living.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-2 text-lg text-black transition-all bg-yellow-500 rounded-lg hover:bg-yellow-600">
          Explore Now
        </button>
        <button className="px-6 py-2 text-lg text-black transition-all bg-transparent border-2 border-white rounded-lg hover:bg-gray-500 hover:text-white">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
