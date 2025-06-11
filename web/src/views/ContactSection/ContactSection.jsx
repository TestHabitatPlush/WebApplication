// ContactSection.jsx
import React from 'react';


function ContactSection() {
  return (
    <div className="bg-blue-100 text-center py-10 rounded-3xl mt-10 max-w-7xl mx-auto shadow-lg mb-10">
      <h2 className="text-2xl font-semibold">Request a demo.</h2>
      <p className="text-4xl font-bold my-5">Sounds interesting? Let's get in touch!</p>
      <button className="bg-blue-500 text-white px-6 py-3  mt-4">
        Contact us
      </button>
    </div>
  );
}

export default ContactSection;

