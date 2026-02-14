
import React from 'react';
import { FaYoutube, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
    return (
        <div className='bg-gray-200 py-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12'>
                
                    <div className='text-center md:text-left'>
                        <p className='text-3xl md:text-4xl font-semibold'>HabitatPlus</p>
                        <div className="flex justify-center md:justify-start gap-4 mt-4">
                            <FaFacebook className='text-2xl md:text-3xl text-gray-500 hover:text-blue-600 cursor-pointer' />
                            <FaSquareXTwitter className='text-2xl md:text-3xl text-gray-500 hover:text-blue-400 cursor-pointer' />
                            <FaYoutube className='text-2xl md:text-3xl text-gray-500 hover:text-red-600 cursor-pointer' />
                        </div>
                    </div>

                    <div className="flex flex-col text-center md:text-left">
                        <p className='pb-2 text-2xl md:text-3xl font-semibold'>Services</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>How it works</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Web Development</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Work Portfolio</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Collaboration</p>
                    </div>

                
                    <div className="flex flex-col text-center md:text-left">
                        <p className='pb-2 text-2xl md:text-3xl font-semibold'>Contact</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Plan and Pricing</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Our Mission</p>
                        <p className='mt-1 text-lg md:text-xl text-gray-600 hover:text-gray-800 cursor-pointer'>Get in Touch</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

