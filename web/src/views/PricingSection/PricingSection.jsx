// PricingSection.jsx
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const plans = [
  { title: "Silver", price: 39, description: "Small businesses" },
  { title: "Gold", price: 39, description: "Small businesses" },
  { title: "Platinum", price: 39, description: "Small businesses" },
];

function PricingSection() {
  return (
    <div className="text-center my-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">Pricing</h2>
      <div className="flex justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="border rounded-lg w-72 h-[400px] shadow-lg flex flex-col items-center"
          >
            <div className="h-32 w-full bg-black text-white flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="text-xl mt-2">{plan.description}</p>
            </div>
            <p className="text-3xl font-bold mt-6">${plan.price}</p>
            <p className="text-gray-500 mb-6">Monthly</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">
                  {" "}
                  <FaRegCircleCheck size={20} />
                </span>
                <span>Society Management</span>
              </li>
            </ul>
            <button className="bg-blue-500 text-white px-6 py-2">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingSection;
