import React, { useState } from "react";

const faqs = [
  {
    question: "What are the key features?",
    answer:
      "Habitat Plush is a comprehensive digital platform simplifying society management. Our solution streamlines operations, tracks requests, and ensures transparent communication and financial management. With Habitat Plush, everything you need is in one place.",
  },
  {
    question: "How Habitat Plush can simplify management committee activities?",
    answer:
      "Habitat Plush simplifies management committee activities through automated task management, digital meeting tools, transparent financial management, centralized communication, and data-driven insights. This streamlines operations, ensuring compliance and informed decision-making, freeing up time to focus on community well-being.",
  },
  {
    question:
      "How Habitat Plush can make your life awesome through Digitalization?",
    answer:
      "Habitat Plush digitalizes community living, making life easier! Simplify tasks, connect with neighbours, and stay updated. Enjoy convenient amenities, facilities, and security. Experience a hassle-free, seamless living experience that saves you time and enhances your community life!",
  },
  {
    question: "How Habitat Plush can make societies secure?",
    answer:
      "Habitat Plush secures societies with digital gate passes, visitor tracking, incident reporting, and emergency alerts. Our platform protects resident data and provides a safe living environment, offering peace of mind and enhanced community safety.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 bg-gray-100 px-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              className="w-full text-left flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
