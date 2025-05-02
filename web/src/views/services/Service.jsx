import React from 'react'
import { FaArrowRight } from "react-icons/fa";

function Service() {
  return (
    <>
      <div className='text-center'>
        <p className='text-5xl'>Services</p>
        <div className='mx-auto w-[49rem] max-w-full text-center'>
          <p className='text-2xl'>Choose the pricing option that works best for your apartment rental needs. Experience exceptional quality and reliable service with our transparent pricing structure.</p>
        </div>
      </div>

      <div className='flex w-full mt-24 gap-20 justify-center'>
        {/* Card One */}
        <div className='w-60 text-center border border-black p-2'>
          <img className='w-full h-60 rounded-lg' src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400" alt="CardImg" />

          <p className='text-2xl'>Society Management</p>
          <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos voluptatibus nihil ut. Tenetur sapiente nisi eos mollitia consectetur sint incidunt quaerat, laudantium laboriosam nobis molestiae debitis magni dolore aliquam consequatur. Doloremque, quas eius nesciunt, nihil tenetur cum dignissimos a laudantium eveniet reiciendis quia beatae distinctio voluptatem quod cupiditate? Laboriosam!</p>

          <div className="flex justify-center mt-3">
            <button type="button">More Details</button>
            <div className='mt-1 ml-2'>
              <FaArrowRight />
            </div>
          </div>
        </div>
        {/* Card Two */}
        <div className='w-60 text-center border border-black p-2'>
          <img className='w-64 h-60 rounded-lg' src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400" alt="CardImg" />

          <p className='text-2xl'>Society Management</p>
          <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos voluptatibus nihil ut. Tenetur sapiente nisi eos mollitia consectetur sint incidunt quaerat, laudantium laboriosam nobis molestiae debitis magni dolore aliquam consequatur. Doloremque, quas eius nesciunt, nihil tenetur cum dignissimos a laudantium eveniet reiciendis quia beatae distinctio voluptatem quod cupiditate? Laboriosam!</p>

          <div className="flex justify-center mt-3">
            <button type="button">More Details</button>
            <div className='mt-1 ml-2'>
              <FaArrowRight />
            </div>
          </div>
        </div>

        {/* Card Three */}
        <div className='w-60 text-center border border-black p-2'>
          <img className='w-64 h-60 rounded-lg' src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=400" alt="CardImg" />

          <p className='text-2xl'>Society Management</p>
          <p className='text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos voluptatibus nihil ut. Tenetur sapiente nisi eos mollitia consectetur sint incidunt quaerat, laudantium laboriosam nobis molestiae debitis magni dolore aliquam consequatur. Doloremque, quas eius nesciunt, nihil tenetur cum dignissimos a laudantium eveniet reiciendis quia beatae distinctio voluptatem quod cupiditate? Laboriosam!</p>

          <div className="flex justify-center mt-3">
            <button type="button">More Details</button>
            <div className='mt-1 ml-2'>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-100 text-center py-10 rounded-3xl mt-10 max-w-7xl mx-auto shadow-lg mb-10">
        <h2 className="text-2xl font-semibold">Request a demo.</h2>
        <p className="text-4xl font-bold my-5">Sounds interesting? Let's get in touch!</p>
        <button className="bg-blue-500 text-white px-6 py-3  mt-4">
          Sign Up
        </button>
      </div>



    </>
  )
}

export default Service;